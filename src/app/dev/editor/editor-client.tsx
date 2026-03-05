"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { run } from "@mdx-js/mdx";
import * as prodRuntime from "react/jsx-runtime";
import * as devRuntime from "react/jsx-dev-runtime";

const runtime =
  process.env.NODE_ENV === "development" ? devRuntime : prodRuntime;

interface PostListItem {
  slug: string;
  title: string;
  date: string;
  published: boolean;
}

interface Frontmatter {
  title?: string;
  date?: string;
  description?: string;
  [key: string]: unknown;
}

export function EditorClient() {
  const [posts, setPosts] = useState<PostListItem[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [content, setContent] = useState("");
  const [lastModified, setLastModified] = useState(0);
  const [frontmatter, setFrontmatter] = useState<Frontmatter>({});
  const [MdxComponent, setMdxComponent] = useState<React.ComponentType | null>(
    null
  );
  const [compileError, setCompileError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [status, setStatus] = useState<string>("Ready");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const compileTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastModifiedRef = useRef(0);
  const dirtyRef = useRef(false);

  // Keep refs in sync with state
  useEffect(() => {
    lastModifiedRef.current = lastModified;
  }, [lastModified]);
  useEffect(() => {
    dirtyRef.current = dirty;
  }, [dirty]);

  // Word count + read time
  const wordCount = content
    .replace(/^---[\s\S]*?---/, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  const readTime = Math.max(1, Math.round(wordCount / 238));

  // Load post list on mount
  useEffect(() => {
    fetch("/api/dev/posts")
      .then((r) => r.json())
      .then(setPosts)
      .catch(() => setStatus("Failed to load posts"));
  }, []);

  // Compile MDX for preview (debounced)
  const compilePreview = useCallback(async (mdxContent: string) => {
    try {
      const res = await fetch("/api/dev/compile-mdx", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: mdxContent }),
      });
      const data = await res.json();

      if (!res.ok) {
        setCompileError(data.error || "Compilation failed");
        setMdxComponent(null);
        return;
      }

      setFrontmatter(data.frontmatter || {});
      setCompileError(null);

      // Evaluate compiled MDX to React component
      const { default: Component } = await run(data.code, {
        ...runtime,
        baseUrl: window.location.href,
      });
      setMdxComponent(() => Component);
    } catch (err) {
      setCompileError(
        err instanceof Error ? err.message : "Preview compilation failed"
      );
      setMdxComponent(null);
    }
  }, []);

  // Debounced compile on content change
  useEffect(() => {
    if (!content) return;

    if (compileTimeoutRef.current) {
      clearTimeout(compileTimeoutRef.current);
    }

    compileTimeoutRef.current = setTimeout(() => {
      compilePreview(content);
    }, 400);

    return () => {
      if (compileTimeoutRef.current) {
        clearTimeout(compileTimeoutRef.current);
      }
    };
  }, [content, compilePreview]);

  // Load a post
  const loadPost = useCallback(
    async (slug: string) => {
      if (dirty && !confirm("Discard unsaved changes?")) {
        return;
      }

      try {
        const res = await fetch(`/api/dev/posts?slug=${slug}`);
        const data = await res.json();
        setContent(data.content);
        setLastModified(data.lastModified);
        setSelectedSlug(slug);
        setDirty(false);
        setStatus("Loaded");
      } catch {
        setStatus("Failed to load post");
      }
    },
    [dirty]
  );

  // Save
  const save = useCallback(async () => {
    if (!selectedSlug || saving) return;

    setSaving(true);
    setStatus("Saving...");

    try {
      const res = await fetch(`/api/dev/posts/${selectedSlug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      const data = await res.json();

      if (data.ok) {
        setLastModified(data.lastModified);
        setDirty(false);
        setStatus("Saved");
      } else {
        setStatus("Save failed");
      }
    } catch {
      setStatus("Save failed");
    } finally {
      setSaving(false);
    }
  }, [selectedSlug, content, saving]);

  // Cmd+S keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        save();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [save]);

  // Tab key inserts spaces
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newContent =
        content.substring(0, start) + "  " + content.substring(end);
      setContent(newContent);
      setDirty(true);

      // Restore cursor position after React re-render
      requestAnimationFrame(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      });
    }
  };

  // Poll for external changes (every 2 seconds)
  useEffect(() => {
    if (!selectedSlug) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/dev/posts?slug=${selectedSlug}`);
        const data = await res.json();

        if (data.lastModified > lastModifiedRef.current) {
          if (dirtyRef.current) {
            // Conflict - show in status, don't auto-replace
            setStatus("External change detected - you have unsaved edits");
          } else {
            // Clean editor - auto-reload
            setContent(data.content);
            setLastModified(data.lastModified);
            setStatus("Reloaded (external edit)");
            setTimeout(() => setStatus("Ready"), 2000);
          }
        }
      } catch {
        // Silently ignore poll failures
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [selectedSlug]);

  // Warn before closing with unsaved changes
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (dirtyRef.current) {
        e.preventDefault();
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, []);

  // Accept external changes (conflict resolution)
  const acceptExternal = useCallback(async () => {
    if (!selectedSlug) return;
    const res = await fetch(`/api/dev/posts?slug=${selectedSlug}`);
    const data = await res.json();
    setContent(data.content);
    setLastModified(data.lastModified);
    setDirty(false);
    setStatus("Loaded external changes");
  }, [selectedSlug]);

  // Create new post
  const createPost = useCallback(async () => {
    if (dirty && !confirm("Discard unsaved changes?")) return;

    const slug = prompt("Post slug (lowercase, hyphens):", "");
    if (!slug) return;

    try {
      const res = await fetch("/api/dev/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: slug.toLowerCase().replace(/\s+/g, "-") }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus(data.error || "Create failed");
        return;
      }

      // Refresh post list and load the new post
      const listRes = await fetch("/api/dev/posts");
      const newPosts = await listRes.json();
      setPosts(newPosts);

      // Load the new post
      const postRes = await fetch(`/api/dev/posts?slug=${data.slug}`);
      const postData = await postRes.json();
      setContent(postData.content);
      setLastModified(postData.lastModified);
      setSelectedSlug(data.slug);
      setDirty(false);
      setStatus("Created");
    } catch {
      setStatus("Create failed");
    }
  }, [dirty]);

  const hasConflict = status.includes("External change detected");

  return (
    <div className="flex flex-col h-screen bg-neutral-950 text-neutral-200">
      {/* Toolbar */}
      <div className="flex items-center gap-4 px-4 h-12 border-b border-neutral-800 shrink-0">
        <select
          className="bg-neutral-800 text-neutral-200 px-3 py-1.5 rounded text-sm border border-neutral-700"
          value={selectedSlug || ""}
          onChange={(e) => e.target.value && loadPost(e.target.value)}
        >
          <option value="">Select a post...</option>
          {posts.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.title} {p.published ? "" : "(draft)"}
            </option>
          ))}
        </select>

        <button
          onClick={createPost}
          className="px-3 py-1.5 bg-neutral-700 hover:bg-neutral-600 rounded text-sm transition-colors"
        >
          + New
        </button>

        <button
          onClick={save}
          disabled={!selectedSlug || saving || !dirty}
          className="px-3 py-1.5 bg-neutral-700 hover:bg-neutral-600 disabled:opacity-40 disabled:cursor-not-allowed rounded text-sm transition-colors"
        >
          {saving ? "Saving..." : "Save"}
        </button>

        <span
          className={`text-xs ${dirty ? "text-amber-400" : "text-neutral-500"}`}
        >
          {dirty ? "Unsaved changes" : status}
        </span>

        {selectedSlug && (
          <span className="text-xs text-neutral-600 ml-auto">
            {wordCount} words / {readTime} min read
          </span>
        )}
      </div>

      {/* Conflict bar */}
      {hasConflict && (
        <div className="flex items-center gap-3 px-4 py-2 bg-amber-900/50 border-b border-amber-700 text-amber-200 text-sm">
          <span>File changed externally. You have unsaved edits.</span>
          <button
            onClick={acceptExternal}
            className="px-2 py-1 bg-amber-700 hover:bg-amber-600 rounded text-xs"
          >
            Load external
          </button>
          <button
            onClick={() => setStatus("Keeping local edits")}
            className="px-2 py-1 bg-neutral-700 hover:bg-neutral-600 rounded text-xs"
          >
            Keep mine
          </button>
        </div>
      )}

      {/* Split pane */}
      <div className="flex flex-1 min-h-0">
        {/* Editor pane */}
        <div className="w-1/2 flex flex-col border-r border-neutral-800">
          {selectedSlug ? (
            <textarea
              ref={textareaRef}
              className="flex-1 p-4 bg-neutral-900 text-neutral-200 resize-none outline-none leading-relaxed"
              style={{
                fontFamily: "var(--font-mono), ui-monospace, monospace",
                fontSize: "14px",
                tabSize: 2,
              }}
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                setDirty(true);
              }}
              onKeyDown={handleKeyDown}
              spellCheck={false}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center text-neutral-600">
              {posts.length === 0
                ? "No posts found. Create one in src/content/posts/"
                : "Select a post to edit"}
            </div>
          )}
        </div>

        {/* Preview pane */}
        <div
          className="w-1/2 overflow-y-auto"
          style={{ backgroundColor: "var(--background, #fff)" }}
        >
          {compileError ? (
            <div className="p-8">
              <pre
                className="text-red-500 text-sm whitespace-pre-wrap"
                style={{
                  fontFamily: "var(--font-mono), ui-monospace, monospace",
                }}
              >
                {compileError}
              </pre>
            </div>
          ) : selectedSlug ? (
            <main className="mx-auto max-w-2xl px-4 py-16">
              <header className="mb-8">
                <h1
                  className="text-4xl font-bold"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {frontmatter.title || "Untitled"}
                </h1>
                {frontmatter.date && (
                  <p className="text-gray-500 mt-2">{String(frontmatter.date)}</p>
                )}
                {frontmatter.description && (
                  <p className="text-gray-600 mt-4 text-lg">
                    {String(frontmatter.description)}
                  </p>
                )}
              </header>
              <article className="prose prose-lg">
                {MdxComponent && <MdxComponent />}
              </article>
            </main>
          ) : (
            <div className="flex-1 flex items-center justify-center h-full text-neutral-400">
              Preview
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
