import { redirect } from "next/navigation";
import { stackServerApp } from "@/stack/server";
import { getCollection } from "@/lib/mongodb";
import LinksClient from "./LinksClient";

export default async function LinksPage(props: { searchParams: Promise<{ page?: string }> }) {
    const searchParams = await props.searchParams;
    const pageId = searchParams.page;
    if (!pageId) return redirect("/dashboard");

    const user = await stackServerApp.getUser();
    if (!user) return redirect("/dashboard");

    const pages = await getCollection("pages");
    const page = await pages.findOne({ id: pageId, userId: user.id });
    if (!page) return redirect("/dashboard");

    const linksCollection = await getCollection("links");
    const pageLinks = await linksCollection.find({ pageId: pageId }).sort({ order: 1 }).toArray();

    const sanitizedPage = {
        id: page.id as string,
        slug: page.slug as string,
        displayName: (page.displayName || null) as string | null,
        bio: (page.bio || null) as string | null,
        avatarUrl: (page.avatarUrl || null) as string | null,
        themeId: (page.themeId || "minimalist") as string | null,
    };

    const sanitizedLinks = pageLinks.map((l) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const link = l as any;
        return {
            id: link.id as string,
            title: link.title as string,
            url: link.url as string,
            isActive: (link.isActive ?? true) as boolean
        };
    });

    return <LinksClient initialPage={sanitizedPage} initialLinks={sanitizedLinks} />;
}
