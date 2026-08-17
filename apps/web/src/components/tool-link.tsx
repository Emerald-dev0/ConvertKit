import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ToolLink({ from, to }: { from: string; to: string }) {
  return (
    <Link
      href={`/convert/${from}-to-${to}`}
      className="document-card rounded-lg p-4 hover:border-primary/50 transition-all flex items-center justify-between group bg-white"
    >
      <span className="font-mono uppercase tracking-tighter text-xs">{from} \u2192 {to}</span>
      <ArrowRight size={12} className="text-muted group-hover:text-primary transition-colors" />
    </Link>
  );
}
