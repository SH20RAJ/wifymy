import { stackServerApp } from "@/stack/server";
import { getUserPages } from "@/app/actions/pages";
import Link from "next/link";
import CreatePageForm from "@/components/dashboard/CreatePageForm";
import { ExternalLink, Settings2, Layout } from "lucide-react";

export default async function DashboardPage() {
    const user = await stackServerApp.getUser({ or: "redirect" });
    const pages = await getUserPages();

    return (
        <div className="max-w-5xl">
            <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8 items-start">
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold">Your Pages</h2>
                    
                    {pages.length === 0 ? (
                        <div className="bg-card rounded-2xl border border-dashed border-border p-10 flex flex-col items-center justify-center text-center space-y-3">
                            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-2">
                                <Layout className="w-6 h-6 text-muted-foreground" />
                            </div>
                            <h3 className="font-semibold text-lg">No pages yet</h3>
                            <p className="text-muted-foreground text-sm max-w-xs">
                                Create your first smart page to start building your Linktree alternative.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {pages.map((p) => (
                                <div key={p.id} className="bg-card rounded-2xl border border-border p-5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all group flex flex-col">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-secondary text-lg font-bold flex items-center justify-center text-muted-foreground border border-border shrink-0 overflow-hidden">
                                                {p.avatarUrl ? (
                                                    /* eslint-disable-next-line @next/next/no-img-element */
                                                    <img src={p.avatarUrl} alt={p.displayName || p.slug} className="w-full h-full object-cover" />
                                                ) : (
                                                    (p.displayName?.[0] || p.slug[0]).toUpperCase()
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold">{p.displayName || 'Untitled'}</h3>
                                                <a href={`/${p.slug}`} target="_blank" className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group/link">
                                                    wify.my/{p.slug}
                                                    <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex gap-2 mt-auto pt-4">
                                        <Link 
                                            href={`/dashboard/links?page=${p.id}`}
                                            className="flex-1 h-9 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground text-sm font-medium flex items-center justify-center transition-colors"
                                        >
                                            Manage Links
                                        </Link>
                                        <Link 
                                            href={`/dashboard/appearance?page=${p.id}`}
                                            className="w-9 h-9 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground flex items-center justify-center transition-colors"
                                        >
                                            <Settings2 className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="sticky top-8">
                    <CreatePageForm />
                </div>
            </div>
        </div>
    );
}
