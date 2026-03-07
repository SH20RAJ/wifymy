'use client';

import { useState } from "react";
import { createPage } from "@/app/actions/pages";
import { Plus, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CreatePageForm({ onSuccess }: { onSuccess?: () => void }) {
    const [slug, setSlug] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!slug || !displayName) return;
        
        setIsLoading(true);
        setError("");

        const result = await createPage(slug, displayName);
        
        if (result.success) {
            setSlug("");
            setDisplayName("");
            // Refresh dashboard
            router.refresh();
            if (onSuccess) onSuccess();
        } else {
            setError(result.error || "Failed to create page");
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-semibold">Create New Page</h3>
            
            {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-600 rounded-lg text-sm">
                    {error}
                </div>
            )}

            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">Page Title / Display Name</label>
                <input 
                    type="text" 
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="e.g. My Startup, My Portfolio" 
                    className="h-10 px-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm" 
                    required
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">URL Slug</label>
                <div className="flex items-center">
                    <span className="h-10 px-3 bg-secondary border border-r-0 border-border rounded-l-lg flex items-center text-muted-foreground text-sm whitespace-nowrap">
                        wify.my/
                    </span>
                    <input 
                        type="text" 
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        placeholder="your-unique-handle" 
                        className="flex-1 h-10 px-3 rounded-r-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-mono text-sm" 
                        required
                    />
                </div>
            </div>

            <button 
                type="submit" 
                disabled={isLoading || !slug || !displayName}
                className="w-full h-10 mt-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                {isLoading ? "Creating..." : "Create Page"}
            </button>
        </form>
    );
}
