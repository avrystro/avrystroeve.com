import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "src/content/posts");

export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available" }, { status: 404 });
  }

  const slug = request.nextUrl.searchParams.get("slug");

  if (slug) {
    // Validate slug
    if (/[/\\]|\.\./.test(slug)) {
      return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
    }

    const filePath = path.join(postsDir, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const content = fs.readFileSync(filePath, "utf8");
    const stats = fs.statSync(filePath);
    return NextResponse.json({
      content,
      lastModified: stats.mtimeMs,
    });
  }

  // List all posts
  if (!fs.existsSync(postsDir)) {
    return NextResponse.json([]);
  }

  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".mdx"));
  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(postsDir, file), "utf8");
    const { data } = matter(raw);
    return {
      slug: file.replace(/\.mdx$/, ""),
      title: data.title || file,
      date: data.date || "",
      published: data.published ?? false,
    };
  });

  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available" }, { status: 404 });
  }

  const { slug } = await request.json();

  if (!slug || typeof slug !== "string") {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  if (/[/\\]|\.\./.test(slug) || !/^[a-z0-9-]+$/.test(slug)) {
    return NextResponse.json(
      { error: "Slug must be lowercase letters, numbers, and hyphens only" },
      { status: 400 }
    );
  }

  const filePath = path.join(postsDir, `${slug}.mdx`);
  if (fs.existsSync(filePath)) {
    return NextResponse.json({ error: "Post already exists" }, { status: 409 });
  }

  const today = new Date().toISOString().split("T")[0];
  const title = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const template = `---
title: "${title}"
date: "${today}"
description: ""
published: false
hook: ""
readTime: ""
song:
  title: ""
  artist: "Avry Stroeve"
tags: []
---

`;

  if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true });
  }

  fs.writeFileSync(filePath, template, "utf8");
  const stats = fs.statSync(filePath);

  return NextResponse.json({
    ok: true,
    slug,
    lastModified: stats.mtimeMs,
  });
}
