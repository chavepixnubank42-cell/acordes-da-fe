"use client";

import { usePathname } from "next/navigation";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <div className="min-h-screen">{children}</div>;
  }

  return <div className="mx-auto min-h-screen max-w-[460px] pb-24">{children}</div>;
}
