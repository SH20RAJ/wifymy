'use client';

import { useState } from 'react';
import { createDeeplink, deleteDeeplink, MongoDeeplink } from '@/app/actions/deeplinks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Copy, Check, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function DeeplinksClient({ initialDeeplinks }: { initialDeeplinks: MongoDeeplink[] }) {
    const [deeplinks, setDeeplinks] = useState<MongoDeeplink[]>(initialDeeplinks);
    const [slug, setSlug] = useState('');
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!slug || !url) return;
        setLoading(true);
        try {
            const newLink = await createDeeplink(slug, url);
            setDeeplinks([newLink, ...deeplinks]);
            setSlug('');
            setUrl('');
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Failed to create deeplink";
            alert(message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        await deleteDeeplink(id);
        setDeeplinks(deeplinks.filter(d => d.id !== id));
    };

    const copyToClipboard = (slug: string, id: string) => {
        const origin = window.location.origin;
        navigator.clipboard.writeText(`${origin}/l/${slug}`);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="grid gap-8">
            {/* Create form */}
            <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-6 shadow-xl">
                <h2 className="text-xl font-bold text-white mb-6">Create New Deeplink</h2>
                <form onSubmit={handleCreate} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider ml-1">Custom Slug</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 font-medium">/l/</span>
                                <Input 
                                    placeholder="my-link" 
                                    value={slug} 
                                    onChange={e => setSlug(e.target.value)}
                                    className="pl-8 bg-white/5 border-white/10 h-12 rounded-xl focus:ring-primary/20 text-white"
                                />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider ml-1">Destination URL</label>
                            <Input 
                                placeholder="https://instagram.com/p/..." 
                                value={url} 
                                onChange={e => setUrl(e.target.value)}
                                className="bg-white/5 border-white/10 h-12 rounded-xl focus:ring-primary/20 text-white"
                            />
                        </div>
                    </div>
                    <Button 
                        type="submit" 
                        disabled={loading}
                        className="w-full h-12 rounded-xl bg-white text-black hover:bg-neutral-200 font-bold transition-all"
                    >
                        {loading ? "Creating..." : <><Zap className="w-4 h-4 mr-2 fill-current" /> Create Deeplink</>}
                    </Button>
                </form>
            </div>

            {/* List */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-white pl-1">Your Deeplinks</h2>
                {deeplinks.length === 0 ? (
                    <p className="text-neutral-500 text-sm pl-1">No managed deeplinks yet. Created links will appear here.</p>
                ) : (
                    <div className="grid gap-3">
                        {deeplinks.map((link) => (
                            <div key={link.id} className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-4 flex items-center justify-between group transition-all hover:border-white/20">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-white">/l/{link.slug}</span>
                                        <ArrowRightIcon className="w-3.5 h-3.5 text-neutral-600" />
                                        <span className="text-sm text-neutral-400 truncate max-w-[200px]">{link.destinationUrl}</span>
                                    </div>
                                    <p className="text-[10px] text-neutral-600 font-medium flex items-center gap-1">
                                        Created on {new Date(link.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button 
                                        size="sm" 
                                        variant="ghost" 
                                        onClick={() => copyToClipboard(link.slug, link.id)}
                                        className={cn(
                                            "h-9 rounded-lg px-3 transition-colors",
                                            copiedId === link.id ? "bg-green-500/10 text-green-500 hover:bg-green-500/20" : "text-neutral-400 hover:text-white hover:bg-white/5"
                                        )}
                                    >
                                        {copiedId === link.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    </Button>
                                    <Button 
                                        size="sm" 
                                        variant="ghost" 
                                        onClick={() => handleDelete(link.id)}
                                        className="h-9 rounded-lg px-3 text-neutral-500 hover:text-red-500 hover:bg-red-500/10"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    );
}
