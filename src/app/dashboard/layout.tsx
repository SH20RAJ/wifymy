import { UserButton } from "@stackframe/stack";
import { Zap } from "lucide-react";
import DashboardNav from "@/components/dashboard/DashboardNav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 flex flex-col md:flex-row relative selection:bg-primary/30">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-0 w-full h-[500px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2"></div>
      </div>

      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/10 bg-black/40 backdrop-blur-xl p-4 flex flex-col gap-2 relative z-10 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-3 font-bold text-xl tracking-tight mb-8 mt-4 px-4">
			<div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg shadow-primary/20">
                <Zap className="h-5 w-5 fill-white text-white" />
            </div>
			<span className="bg-clip-text text-transparent bg-linear-to-r from-white to-neutral-400">Wifymy</span>
		</div>

        <DashboardNav />

        <div className="mt-auto hidden md:flex items-center justify-between gap-3 px-4 py-4 rounded-xl border border-white/5 bg-white/5 backdrop-blur-md">
            <span className="text-sm font-medium text-neutral-300">Account</span>
            <UserButton />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto relative z-10">
        {/* Mobile Header Auth */}
        <div className="md:hidden flex justify-end mb-6">
            <UserButton />
        </div>
        {children}
      </main>
    </div>
  );
}
