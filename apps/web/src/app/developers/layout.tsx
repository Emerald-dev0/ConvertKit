import type { Metadata } from "next";
import { DeveloperSidebar } from "@/components/developers/sidebar";

export const metadata: Metadata = {
  title: "Developers | ConvertKit",
};

export default function DevelopersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-canvas">
      <DeveloperSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-6 md:p-8">{children}</div>
      </main>
    </div>
  );
}
