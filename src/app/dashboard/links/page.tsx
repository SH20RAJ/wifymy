import { redirect } from "next/navigation";
import { getPageByIdForUser } from "@/app/actions/pages";
import { getLinksForPage } from "@/app/actions/links";
import LinksClient from "./LinksClient";

export default async function LinksPage(props: { searchParams: Promise<{ page?: string }> }) {
    const searchParams = await props.searchParams;
    const pageId = searchParams.page;
    if (!pageId) return redirect("/dashboard");

    try {
        const page = await getPageByIdForUser(pageId);
        if (!page) return redirect("/dashboard");

        const pageLinks = await getLinksForPage(pageId);

    const sanitizedPage = {
        id: page.id,
        slug: page.slug,
        displayName: page.displayName,
        bio: page.bio,
        avatarUrl: page.avatarUrl,
        themeId: page.themeId || "minimalist",
    };

    const sanitizedLinks = pageLinks.map((link) => {
        return {
            id: link.id,
            title: link.title,
            url: link.url,
            isActive: link.isActive ?? true
        };
    });

    return <LinksClient initialPage={sanitizedPage} initialLinks={sanitizedLinks} />;
    } catch {
        return redirect("/dashboard");
    }
}
