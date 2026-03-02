import Link from "next/link";

export default function BlogPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Blog</h1>
      <p className="text-gray-500 mt-2">Posts coming soon.</p>
      <Link href="/blog/test" className="text-blue-500 underline mt-4">
        Test Post (dev only)
      </Link>
    </main>
  );
}
