'use client';

import { useState } from "react";
import { LinkEditor } from "@/components/dashboard/LinkEditor";
import { MobilePreview } from "@/components/dashboard/MobilePreview";

const initialLinks = [
    { id: "1", title: "Follow me on Instagram", url: "https://instagram.com", isActive: true },
    { id: "2", title: "My GitHub Projects", url: "https://github.com", isActive: true },
];

export default function LinksPage() {
    const [links, setLinks] = useState(initialLinks);

    // Profile mock for preview
    const profile = {
        displayName: "John Doe",
        bio: "Digital creator and developer building the future of the web.",
        avatarUrl: null
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 max-w-6xl items-start">
            <div className="max-w-3xl w-full">
                <h1 className="text-3xl font-bold mb-8">Manage Links</h1>
                <LinkEditor initialLinks={links} onChange={setLinks} />
            </div>

            <div className="hidden lg:flex sticky top-8 justify-center pb-8">
                <MobilePreview profile={profile} links={links.filter(l => l.isActive)} themeId="minimalist" />
            </div>
        </div>
    );
}
