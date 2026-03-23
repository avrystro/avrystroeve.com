"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-5">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="swiss text-xs tracking-[0.2em] text-gray-900 hover:text-klein transition-colors"
        >
          Avry Stroeve
        </Link>

        {!isHome && (
          <Link
            href="/"
            className="text-xs text-gray-400 hover:text-gray-900 transition-colors font-light"
          >
            Home
          </Link>
        )}
      </div>
    </nav>
  );
}
