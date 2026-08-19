import type { Metadata } from "next";
import { Sidebar } from "@/components/app/sidebar";

export const metadata: Metadata = {
  title: "ConvertKit",
};

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-canvas">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-6 md:p-8">{children}</div>
      </main>
    </div>
  );
}
