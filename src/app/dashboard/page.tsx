import { stackServerApp } from "@/stack/server";
import { getUserPages } from "@/app/actions/pages";
import Link from "next/link";
import CreatePageForm from "@/components/dashboard/CreatePageForm";
import { ExternalLink, Settings2, Layout } from "lucide-react";

export default async function DashboardPage() {
    await stackServerApp.getUser({ or: "redirect" });
    const pages = await getUserPages();

    return (
        <div className="max-w-6xl mx-auto space-y-12 pb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 relative">
                <div className="space-y-2">
                    <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-white to-neutral-400">Dashboard Overview</h1>
                    <p className="text-neutral-400 text-lg">Manage your pages, links, and appearance configurations.</p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8 items-start">
                <div className="space-y-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold tracking-tight text-white">Your Pages</h2>
                        <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-semibold text-neutral-300">{pages.length} Active</span>
                    </div>
                    
                    {pages.length === 0 ? (
                        <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-12 flex flex-col items-center justify-center text-center space-y-4 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-linear-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-2 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                                <Layout className="w-8 h-8 text-neutral-400" />
                            </div>
                            <h3 className="font-bold text-2xl text-white tracking-tight">No pages yet</h3>
                            <p className="text-neutral-400 text-base max-w-sm">
                                Create your first smart page to start building your professional Linktree alternative.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {pages.map((p) => (
                                <div key={p.id} className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-6 shadow-xl hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.1)] hover:border-white/20 hover:-translate-y-1 transition-all duration-300 group flex flex-col relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-colors" />

                                    <div className="flex justify-between items-start mb-6 relative z-10">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-neutral-800 text-lg font-bold flex items-center justify-center text-neutral-400 border border-white/10 shrink-0 overflow-hidden shadow-inner">
                                                {p.avatarUrl ? (
                                                    /* eslint-disable-next-line @next/next/no-img-element */
                                                    <img src={p.avatarUrl} alt={p.displayName || p.slug} className="w-full h-full object-cover" />
                                                ) : (
                                                    (p.displayName?.[0] || p.slug[0]).toUpperCase()
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg text-white group-hover:text-primary transition-colors">{p.displayName || 'Untitled'}</h3>
                                                <a href={`/${p.slug}`} target="_blank" className="text-sm text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5 group/link mt-0.5">
                                                    wify.my/{p.slug}
                                                    <ExternalLink className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex gap-3 mt-auto pt-4 relative z-10">
                                        <Link 
                                            href={`/dashboard/links?page=${p.id}`}
                                            className="flex-1 h-10 rounded-xl bg-white/10 hover:bg-white text-white hover:text-black text-sm font-semibold flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                                        >
                                            Manage Links
                                        </Link>
                                        <Link 
                                            href={`/dashboard/appearance?page=${p.id}`}
                                            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-300 group/settings"
                                        >
                                            <Settings2 className="w-4 h-4 group-hover/settings:rotate-90 transition-transform duration-500" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="sticky top-8 lg:top-12">
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-full h-1 bg-linear-to-r from-transparent via-primary to-transparent opacity-50" />
                        <CreatePageForm />
                    </div>
                </div>
            </div>
        </div>
    );
}
