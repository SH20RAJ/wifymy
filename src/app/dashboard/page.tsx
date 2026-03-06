import { stackServerApp } from "@/stack/server";

export default async function DashboardPage() {
    const user = await stackServerApp.getUser({ or: "redirect" });

    return (
        <div className="max-w-4xl">
            <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
            
            <div className="bg-card rounded-2xl border border-border p-6 md:p-10 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                
                <h2 className="text-xl font-medium mb-4 text-card-foreground">Welcome back, {user.displayName || user.primaryEmail || 'User'}!</h2>
                <p className="text-muted-foreground text-balance">
                    Your Linktree clone setup begins here. Navigate using the sidebar to manage your links, select a premium aesthetic theme, and customize your public profile.
                </p>
                <div className="mt-8 flex gap-4">
                    <a href={`/${user.id}`} target="_blank" className="inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-6">
                        View Public Profile
                    </a>
                </div>
            </div>
        </div>
    );
}
