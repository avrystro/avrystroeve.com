import { notFound } from "next/navigation";
import { getPostBySlug, getPostSlugs } from "@/lib/mdx";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
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
      <header className="mb-8">
        <h1 className="text-4xl font-bold">{post.title}</h1>
        <p className="text-gray-500 mt-2">{post.date}</p>
        {post.description && (
          <p className="text-gray-600 mt-4 text-lg">{post.description}</p>
        )}
      </header>
      <article className="prose prose-lg">
        <MDXContent />
      </article>
    </main>
  );
}
