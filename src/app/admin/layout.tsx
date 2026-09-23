import AdminNav from "@/components/AdminNav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-blue-light dark:bg-[#17222D]">
      <AdminNav />
      <div className="mx-auto max-w-4xl px-6 py-8">{children}</div>
    </div>
  );
}
