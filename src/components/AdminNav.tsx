"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/admin", label: "Painel" },
  { href: "/admin/musicas", label: "Músicas" },
  { href: "/admin/direitos", label: "Direitos autorais" },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <header className="border-b border-border-soft bg-white dark:bg-[#1F2E3B]">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">🎸</span>
          <span className="font-display text-lg font-semibold text-blue-deep">
            Acordes da Fé <span className="text-ink-soft">· Admin</span>
          </span>
        </div>
        <nav className="flex gap-5">
          {items.map((item) => {
            const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-bold ${active ? "text-blue-deep" : "text-ink-soft"}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
