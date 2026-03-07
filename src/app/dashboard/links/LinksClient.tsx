'use client';

import { useState } from "react";
import { LinkEditor } from "@/components/dashboard/LinkEditor";
import { MobilePreview } from "@/components/dashboard/MobilePreview";

export default function LinksClient({ initialPage, initialLinks }: { initialPage: { id: string, slug: string, themeId: string | null, displayName: string | null, bio: string | null, avatarUrl: string | null }, initialLinks: { id: string, title: string, url: string, isActive: boolean }[] }) {
    const [links, setLinks] = useState(initialLinks);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 max-w-6xl items-start">
            <div className="max-w-3xl w-full">
                <h1 className="text-3xl font-bold mb-8">Manage Links</h1>
                <LinkEditor pageId={initialPage.id} initialLinks={links} onChange={setLinks} />
            </div>

            <div className="hidden lg:flex sticky top-8 justify-center pb-8">
                <MobilePreview 
                    profile={{
                        displayName: initialPage.displayName || "",
                        bio: initialPage.bio || "",
                        avatarUrl: initialPage.avatarUrl || null
                    }} 
                    links={links.filter(l => l.isActive)} 
                    themeId={initialPage.themeId || "minimalist"} 
                />
            </div>
        </div>
    );
}
