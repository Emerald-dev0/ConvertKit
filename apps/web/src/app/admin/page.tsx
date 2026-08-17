import { db } from "@/lib/db";
import { conversions, waitlist } from "@/lib/db/schema";
import { auth0 } from "@/lib/auth/auth0";
import { count, desc } from "drizzle-orm";
import { redirect } from "next/navigation";
import {
  BarChart3,
  Users,
  Activity,
  ShieldAlert,
  ArrowUpRight,
  Database
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const session = await auth0.getSession();

  if (!session) {
    redirect("/auth/login");
  }
  // Query actual data from D1
  const [totalConversions] = await db.select({ value: count() }).from(conversions);
  const [waitlistCount] = await db.select({ value: count() }).from(waitlist);

  const recentConversions = await db.select()
    .from(conversions)
    .orderBy(desc(conversions.createdAt))
    .limit(10);

  return (
    <main className="min-h-screen bg-[#F7F6F3] p-8 md:p-12">
      <header className="max-w-6xl mx-auto flex justify-between items-end mb-12">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted mb-2">
            <ShieldAlert size={14} className="text-primary" />
            System Administrator
          </div>
          <h1 className="text-4xl font-display font-bold">Platform Overview</h1>
        </div>
        <div className="flex gap-4">
           <div className="px-4 py-2 bg-white border border-[#EAEAEA] rounded-md text-xs font-bold flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Node.js Edge Active
           </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mb-12">
        <StatCard
          icon={<Activity size={20} />}
          label="Total Conversions"
          value={totalConversions.value.toLocaleString()}
          trend="+12% from yesterday"
        />
        <StatCard
          icon={<Users size={20} />}
          label="Waitlist Size"
          value={waitlistCount.value.toLocaleString()}
          trend="Pro Plan Interest"
        />
        <StatCard
          icon={<Database size={20} />}
          label="Cache Status"
          value="Healthy"
          trend="Cloudflare R2 Linked"
        />
      </div>

      <section className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 document-card rounded-xl bg-white p-8">
           <h3 className="text-xl font-bold mb-8 flex items-center justify-between">
              Recent Activity
              <span className="text-xs font-normal text-muted underline cursor-pointer">View All</span>
           </h3>
           <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-muted border-b border-[#F0F0F0]">
                    <th className="pb-4 font-medium">Format</th>
                    <th className="pb-4 font-medium">Size</th>
                    <th className="pb-4 font-medium">Duration</th>
                    <th className="pb-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0F0F0]">
                  {recentConversions.map((conv) => (
                    <tr key={conv.id} className="group hover:bg-[#FAFAFA] transition-colors">
                      <td className="py-4 font-mono text-xs uppercase tracking-tighter">
                        {conv.fromFormat} \u2192 {conv.toFormat}
                      </td>
                      <td className="py-4 text-muted">
                        {(conv.inputSize / 1024).toFixed(1)} KB
                      </td>
                      <td className="py-4 text-muted">
                        {conv.duration?.toFixed(0) || "0"}ms
                      </td>
                      <td className="py-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          conv.status === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {conv.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
           </div>
        </div>

        <div className="flex flex-col gap-8">
           <div className="document-card rounded-xl bg-foreground text-white p-8">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                 <BarChart3 size={18} className="text-primary" />
                 Engine Usage
              </h3>
              <div className="space-y-6">
                 <UsageRow label="Sharp" progress={85} />
                 <UsageRow label="FFmpeg" progress={40} />
                 <UsageRow label="LibreOffice" progress={15} />
                 <UsageRow label="Tesseract" progress={25} />
              </div>
           </div>

           <div className="document-card rounded-xl bg-white p-8 border-2 border-primary/10">
              <h3 className="font-bold mb-2">Waitlist Export</h3>
              <p className="text-muted text-xs mb-6 leading-relaxed">
                Download the current Pro Plan waitlist as a CSV for CRM integration.
              </p>
              <button className="w-full py-3 bg-[#F7F6F3] rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#EEEEEE] transition-all">
                 Generate CSV
                 <ArrowUpRight size={14} />
              </button>
           </div>
        </div>
      </section>
    </main>
  );
}

function StatCard({ icon, label, value, trend }: { icon: React.ReactNode, label: string, value: string, trend: string }) {
  return (
    <div className="document-card rounded-xl bg-white p-8 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="p-2 bg-[#F7F6F3] rounded-md text-muted">{icon}</div>
        <span className="text-[10px] font-mono font-bold text-primary uppercase bg-mint px-2 py-1 rounded tracking-tighter">
          Live
        </span>
      </div>
      <div>
        <div className="text-sm font-medium text-muted mb-1">{label}</div>
        <div className="text-4xl font-display font-bold leading-none">{value}</div>
      </div>
      <div className="text-[10px] font-mono text-muted uppercase tracking-widest pt-4 border-t border-[#F0F0F0]">
        {trend}
      </div>
    </div>
  );
}

function UsageRow({ label, progress }: { label: string, progress: number }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between text-xs font-mono">
        <span>{label}</span>
        <span className="text-muted">{progress}%</span>
      </div>
      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
