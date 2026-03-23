import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/lib/mdx";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts().filter((p) => p.published);
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post || !post.published) {
    notFound();
  }

  // Dynamic import of the MDX file
  let MDXContent;
  try {
    MDXContent = (await import(`@/content/posts/${slug}.mdx`)).default;
  } catch {
    notFound();
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-16">
      <Link
        href="/blog"
        className="text-sm text-neutral-400 hover:text-neutral-600 transition-colors"
      >
        Back to blog
      </Link>

      <header className="mt-8 mb-10">
        <h1 className="text-4xl font-bold text-neutral-900">{post.title}</h1>

        <div className="flex items-center gap-3 mt-3 text-sm text-neutral-400">
          <time>{post.date}</time>
          {post.readTime && (
            <>
              <span>-</span>
              <span>{post.readTime}</span>
            </>
          )}
        </div>

        {post.hook && (
          <p className="mt-4 text-lg italic text-neutral-600">{post.hook}</p>
        )}

        {post.description && !post.hook && (
          <p className="mt-4 text-lg text-neutral-600">{post.description}</p>
        )}

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-500"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Song section */}
      {post.song && (
        <div className="mb-8 p-4 border border-neutral-100 rounded-lg">
          <div className="text-xs uppercase tracking-wider text-neutral-400 mb-1">
            Song
          </div>
          <div className="text-sm font-medium text-neutral-900">
            {post.song.title}
          </div>
          <div className="text-sm text-neutral-500">{post.song.artist}</div>
          {post.song.url && (
            <a
              href={post.song.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-neutral-400 hover:text-neutral-600 transition-colors mt-1 inline-block"
            >
              Listen
            </a>
          )}
        </div>
      )}

      <article className="prose prose-lg prose-neutral">
        <MDXContent />
      </article>

      {/* Video section */}
      {post.video && (
        <div className="mt-12 p-4 border border-neutral-100 rounded-lg">
          <div className="text-xs uppercase tracking-wider text-neutral-400 mb-1">
            Video
          </div>
          <div className="text-sm font-medium text-neutral-900">
            {post.video.title}
          </div>
          {post.video.url && (
            <a
              href={post.video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-neutral-400 hover:text-neutral-600 transition-colors mt-1 inline-block"
            >
              Watch
            </a>
          )}
        </div>
      )}

      {/* Narration section */}
      {post.narration && (
        <div className="mt-4 p-4 border border-neutral-100 rounded-lg">
          <div className="text-xs uppercase tracking-wider text-neutral-400 mb-1">
            Audio Version
          </div>
          <div className="text-sm font-medium text-neutral-900">
            {post.narration.title}
          </div>
          {post.narration.url && (
            <a
              href={post.narration.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-neutral-400 hover:text-neutral-600 transition-colors mt-1 inline-block"
            >
              Listen
            </a>
          )}
        </div>
      )}

      {/* References section */}
      {post.references && post.references.length > 0 && (
        <div className="mt-12 pt-8 border-t border-neutral-100">
          <h2 className="text-sm uppercase tracking-wider text-neutral-400 mb-4">
            References
          </h2>
          <ul className="space-y-3">
            {post.references.map((ref) => (
              <li key={ref.url}>
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-neutral-900 hover:text-neutral-600 transition-colors"
                >
                  {ref.title}
                </a>
                {ref.description && (
                  <p className="text-sm text-neutral-500 mt-0.5">
                    {ref.description}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CTA section */}
      {post.cta && (
        <div className="mt-12 text-center">
          <a
            href={post.cta.url}
            className="inline-block px-6 py-3 text-sm font-medium text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors"
          >
            {post.cta.text}
          </a>
        </div>
      )}
    </main>
  );
}
