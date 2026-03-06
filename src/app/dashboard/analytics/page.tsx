import { stackServerApp } from "@/stack/server";
import { getUserPages } from "@/app/actions/pages";
import { getAnalyticsSummary } from "@/app/actions/analytics";
import { BarChart3, TrendingUp, MousePointerClick, Smartphone, Monitor } from "lucide-react";

export default async function AnalyticsPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    await stackServerApp.getUser({ or: "redirect" });
    const pages = await getUserPages();
    
    // Resolve search params
    const resolvedParams = await searchParams;
    let activePageId = resolvedParams.page as string | undefined;

    if (!activePageId && pages.length > 0) {
        activePageId = pages[0].id;
    }

    if (!activePageId) {
        return (
            <div className="max-w-4xl mx-auto flex flex-col items-center justify-center py-20 text-center">
                <BarChart3 className="w-12 h-12 text-neutral-500 mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">No pages found</h2>
                <p className="text-neutral-400">Create a page first to view its analytics.</p>
            </div>
        );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const activePage = pages.find((p: any) => p.id === activePageId);
    if (!activePage) return <div>Page not found</div>;

    const stats = await getAnalyticsSummary(activePageId);

    return (
        <div className="max-w-6xl mx-auto space-y-12 pb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 relative">
                <div className="space-y-2">
                    <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-white to-neutral-400">Analytics</h1>
                    <p className="text-neutral-400 text-lg">Detailed insights for <span className="text-white font-medium">{activePage.displayName || activePage.slug}</span></p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-8 shadow-xl flex flex-col relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-500/20 transition-colors" />
                    <div className="flex items-center gap-4 mb-4 relative z-10">
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-emerald-500" />
                        </div>
                        <h3 className="text-lg font-medium text-neutral-300">Total Views</h3>
                    </div>
                    <div className="text-5xl font-extrabold text-white tracking-tight relative z-10">{stats.totalViews}</div>
                </div>

                <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-8 shadow-xl flex flex-col relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/20 transition-colors" />
                    <div className="flex items-center gap-4 mb-4 relative z-10">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                            <MousePointerClick className="w-6 h-6 text-blue-500" />
                        </div>
                        <h3 className="text-lg font-medium text-neutral-300">Total Clicks</h3>
                    </div>
                    <div className="text-5xl font-extrabold text-white tracking-tight relative z-10">{stats.totalClicks}</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-8 shadow-xl">
                    <h3 className="text-xl font-bold text-white mb-6">Top Performing Links</h3>
                    {stats.topLinks.length === 0 ? (
                        <div className="text-neutral-500 py-8 text-center bg-white/5 rounded-2xl border border-white/5">No clicks recorded yet.</div>
                    ) : (
                        <div className="space-y-4">
                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                            {stats.topLinks.map((link: any, i: number) => (
                                <div key={link.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-neutral-400">
                                            {i + 1}
                                        </div>
                                        <span className="font-medium text-white">{link.title}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-emerald-400 font-semibold bg-emerald-400/10 px-3 py-1 rounded-full">
                                        {link.clicks} clicks
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-8 shadow-xl">
                    <h3 className="text-xl font-bold text-white mb-6">Device Breakdown</h3>
                    {stats.deviceBreakdown.length === 0 ? (
                        <div className="text-neutral-500 py-8 text-center bg-white/5 rounded-2xl border border-white/5">No device data yet.</div>
                    ) : (
                        <div className="space-y-4">
                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                            {stats.deviceBreakdown.map((device: any, i: number) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                                    <div className="flex items-center gap-3">
                                        {device.deviceType === 'Mobile' ? <Smartphone className="w-5 h-5 text-neutral-400" /> : <Monitor className="w-5 h-5 text-neutral-400" />}
                                        <span className="font-medium text-white">{device.deviceType || 'Unknown'}</span>
                                    </div>
                                    <span className="font-semibold text-neutral-300">{device.count} views</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
