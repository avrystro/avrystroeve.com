import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="swiss text-xs tracking-[0.25em] text-gray-400 mb-6">
        404
      </p>
      <h1 className="swiss text-4xl sm:text-5xl font-800 mb-4">
        Page Not Found
      </h1>
      <p className="text-gray-500 font-light mb-8">
        This page doesn't exist yet.
      </p>
      <Link
        href="/"
        className="btn-klein inline-block rounded-lg"
      >
        Back Home
      </Link>
    </main>
  );
}
