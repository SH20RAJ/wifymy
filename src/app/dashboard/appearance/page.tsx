import { stackServerApp } from "@/stack/server";

export default async function AppearancePage() {
    await stackServerApp.getUser({ or: "redirect" });

    return (
        <div className="max-w-3xl">
            <h1 className="text-3xl font-bold mb-8">Appearance</h1>
            
            <div className="space-y-8">
                {/* Profile Section */}
                <section className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                    <h2 className="text-lg font-semibold mb-6">Profile Details</h2>
                    <div className="flex flex-col sm:flex-row gap-6 items-start">
                        <div className="w-24 h-24 bg-secondary rounded-full border border-border flex-shrink-0" />
                        <div className="space-y-4 flex-1 w-full">
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium">Display Name</label>
                                <input type="text" placeholder="Your Name" className="w-full h-10 px-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium">Bio</label>
                                <textarea rows={3} placeholder="A short bio about yourself..." className="w-full p-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Themes Section */}
                <section className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                    <h2 className="text-lg font-semibold mb-6">Themes</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="aspect-[9/16] rounded-xl border-2 border-primary bg-background shadow-md overflow-hidden relative group cursor-pointer">
                            <div className="absolute inset-0 bg-primary/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">Active</span>
                            </div>
                            <div className="h-1/3 bg-background border-b border-border p-4 flex flex-col items-center justify-center gap-2">
                                <div className="w-10 h-10 bg-secondary rounded-full" />
                                <div className="h-2 w-16 bg-foreground rounded-full" />
                            </div>
                            <div className="p-4 space-y-3">
                                <div className="h-8 w-full bg-secondary rounded-full" />
                                <div className="h-8 w-full bg-secondary rounded-full" />
                            </div>
                            <div className="absolute bottom-2 left-0 w-full text-center text-xs font-medium">Minimalist</div>
                        </div>

                        <div className="aspect-[9/16] rounded-xl border border-border bg-black shadow-sm overflow-hidden relative group cursor-pointer hover:border-border">
                            <div className="h-1/3 bg-zinc-900 border-b border-zinc-800 p-4 flex flex-col items-center justify-center gap-2">
                                <div className="w-10 h-10 bg-zinc-800 rounded-full" />
                                <div className="h-2 w-16 bg-white rounded-full" />
                            </div>
                            <div className="p-4 space-y-3">
                                <div className="h-8 w-full border border-green-500 rounded-lg" />
                                <div className="h-8 w-full border border-green-500 rounded-lg" />
                            </div>
                            <div className="absolute bottom-2 left-0 w-full text-center text-xs font-medium font-mono text-green-500">Developer</div>
                        </div>

                        <div className="aspect-[9/16] rounded-xl border border-border bg-linear-to-tr from-pink-100 to-indigo-100 shadow-sm overflow-hidden relative group cursor-pointer hover:border-pink-300">
                            <div className="h-1/3 bg-white/50 backdrop-blur-md p-4 flex flex-col items-center justify-center gap-2">
                                <div className="w-10 h-10 bg-white rounded-full shadow-sm" />
                                <div className="h-2 w-16 bg-indigo-900 rounded-full" />
                            </div>
                            <div className="p-4 space-y-3">
                                <div className="h-10 w-full bg-white rounded-2xl shadow-sm" />
                                <div className="h-10 w-full bg-white rounded-2xl shadow-sm" />
                            </div>
                            <div className="absolute bottom-2 left-0 w-full text-center text-xs font-medium text-indigo-900">Creator</div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
