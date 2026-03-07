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
      <aside className="w-full md:w-72 border-b md:border-b-0 md:border-r border-white/10 bg-black/40 backdrop-blur-3xl p-4 flex flex-col gap-2 relative z-50 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.5)] md:sticky md:top-0 md:h-screen">
        <div className="flex items-center justify-between md:justify-start gap-3 font-bold text-xl tracking-tight mb-6 mt-2 md:mb-8 md:mt-4 px-4">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg shadow-primary/20">
                    <Zap className="h-5 w-5 fill-white text-white" />
                </div>
                <span className="bg-clip-text text-transparent bg-linear-to-r from-white to-neutral-400">Wifymy</span>
            </div>
            
            <div className="md:hidden">
                <UserButton />
            </div>
		</div>

        <div className="overflow-y-auto no-scrollbar flex-1 -mx-2 px-2">
            <DashboardNav />
        </div>

        <div className="mt-auto hidden md:flex items-center justify-between gap-3 px-4 py-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-colors">
            <div className="flex flex-col">
                <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Account</span>
                <span className="text-sm font-medium text-neutral-300">Settings</span>
            </div>
            <UserButton />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto relative z-10">
        <div className="max-w-7xl mx-auto">
            {children}
        </div>
      </main>
    </div>
  );
}
