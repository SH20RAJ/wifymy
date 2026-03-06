import { UserButton } from "@stackframe/stack";
import { Zap } from "lucide-react";
import DashboardNav from "@/components/dashboard/DashboardNav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-border/50 bg-card p-4 flex flex-col gap-2 relative">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight mb-8 mt-2 px-2">
			<Zap className="h-6 w-6 fill-primary text-primary" />
			<span>Wify.my</span>
		</div>

        <DashboardNav />

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
