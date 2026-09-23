"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TopSearchButton() {
  const pathname = usePathname();
  if (pathname === "/buscar" || pathname.startsWith("/admin")) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-10 flex justify-center">
      <div className="w-full max-w-[460px]">
        <Link
          href="/buscar"
          aria-label="Buscar"
          className="pointer-events-auto absolute right-4 flex h-10 w-10 items-center justify-center rounded-full border border-border-soft bg-white text-base shadow-sm dark:bg-[#1F2E3B]"
          style={{ top: "calc(env(safe-area-inset-top, 0px) + 16px)" }}
        >
          🔍
        </Link>
      </div>
    </div>
  );
}
