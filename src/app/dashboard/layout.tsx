import { UserButton } from "@stackframe/stack";
import Link from "next/link";
import { Zap, UserCircle, Link as LinkIcon, Palette } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-border/50 bg-card p-4 flex flex-col gap-2 relative">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight mb-8 mt-2 px-2">
			<Zap className="h-6 w-6 fill-primary text-primary" />
			<span>Wify.my</span>
		</div>

        <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary transition-colors text-sm font-medium">
            <Zap className="w-5 h-5 text-muted-foreground" />
            Overview
          </Link>
          <Link href="/dashboard/links" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary transition-colors text-sm font-medium">
            <LinkIcon className="w-5 h-5 text-muted-foreground" />
            Links
          </Link>
          <Link href="/dashboard/appearance" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary transition-colors text-sm font-medium">
            <Palette className="w-5 h-5 text-muted-foreground" />
            Appearance
          </Link>
          <Link href="/dashboard/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary transition-colors text-sm font-medium">
            <UserCircle className="w-5 h-5 text-muted-foreground" />
            Profile Settings
          </Link>
        </nav>

        <div className="mt-auto hidden md:flex items-center gap-3 px-4 py-3">
            <UserButton />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        {/* Mobile Header Auth */}
        <div className="md:hidden flex justify-end mb-4">
            <UserButton />
        </div>
        {children}
      </main>
    </div>
  );
}
