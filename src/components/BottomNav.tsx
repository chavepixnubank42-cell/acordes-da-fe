"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Início" },
  { href: "/musicas", label: "Músicas" },
  { href: "/acordes", label: "Acordes" },
  { href: "/treino", label: "Treino" },
  { href: "/progresso", label: "Progresso" },
];

export default function BottomNav() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <nav className="fixed inset-x-0 bottom-0 flex justify-center">
      <div className="flex w-full max-w-[460px] justify-around border-t border-border-soft bg-white px-2 py-2.5 dark:bg-[#1F2E3B]">
        {items.map((item) => {
          const active =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 text-[11px] font-semibold ${
                active ? "text-blue-deep" : "text-ink-soft"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
