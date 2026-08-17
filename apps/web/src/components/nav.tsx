import Link from "next/link";
import { auth0 } from "@/lib/auth/auth0";

export async function Nav() {
  const session = await auth0.getSession();
  const user = session?.user;

  return (
    <nav className="fixed top-0 w-full border-b border-[#EAEAEA] bg-white/80 backdrop-blur-md z-50 px-6 py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold text-foreground">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white font-mono text-lg">C</div>
          ConvertKit
        </Link>
        <div className="hidden md:flex gap-8 text-sm font-medium text-muted">
          <Link href="/#features" className="hover:text-foreground transition-colors">Features</Link>
          <Link href="/#conversions" className="hover:text-foreground transition-colors">Tools</Link>
          <Link href="/#pricing" className="hover:text-foreground transition-colors">Pricing</Link>
          <Link href="https://github.com/Emerald-dev0/ConvertKit" className="hover:text-foreground transition-colors">GitHub</Link>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
               <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full border border-[#EAEAEA]" />
               <a href="/auth/logout" className="text-xs font-bold uppercase tracking-widest text-muted hover:text-foreground">Logout</a>
            </div>
          ) : (
            <a href="/auth/login" className="bg-foreground text-white px-5 py-2 rounded-md text-sm font-bold hover:bg-[#333333] transition-all active:scale-95">
              Sign In
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}
