'use server';

import { db } from "@/db";
import { analytics, pages, links } from "@/db/schema";
import { stackServerApp } from "@/stack/server";
import { eq, sql, count, desc } from "drizzle-orm";

export async function getAnalyticsSummary(pageId: string) {
    const user = await stackServerApp.getUser();
    if (!user) throw new Error("Unauthorized");

    const page = await db.query.pages.findFirst({
        where: eq(pages.id, pageId)
    });

    if (!page || page.userId !== user.id) {
        throw new Error("Unauthorized page access");
    }

    // Get total views
    const viewsResult = await db.select({ value: count() })
        .from(analytics)
        .where(sql`${analytics.pageId} = ${pageId} AND ${analytics.type} = 'VIEW'`);
    const totalViews = viewsResult[0].value;
    
    // Get total clicks
    const clicksResult = await db.select({ value: count() })
        .from(analytics)
        .where(sql`${analytics.pageId} = ${pageId} AND ${analytics.type} = 'CLICK'`);
    const totalClicks = clicksResult[0].value;

    // Get top links (equivalent to MongoDB aggregate)
    const topLinksStats = await db.select({
            linkId: analytics.linkId,
            clicks: count(analytics.id)
        })
        .from(analytics)
        .where(sql`${analytics.pageId} = ${pageId} AND ${analytics.type} = 'CLICK' AND ${analytics.linkId} IS NOT NULL`)
        .groupBy(analytics.linkId)
        .orderBy(desc(count(analytics.id)))
        .limit(5);

    const topLinksData = [];
    if (topLinksStats.length > 0) {
        for (const stat of topLinksStats) {
            if (!stat.linkId) continue;
            const linkDetail = await db.query.links.findFirst({
                where: eq(links.id, stat.linkId)
            });
            if (linkDetail) {
                topLinksData.push({
                    id: linkDetail.id,
                    title: linkDetail.title,
                    clicks: Number(stat.clicks)
                });
            }
        }
    }

    // Device breakdown
    const devicesQuery = await db.select({
            deviceType: analytics.deviceType,
            count: count(analytics.id)
        })
        .from(analytics)
        .where(eq(analytics.pageId, pageId))
        .groupBy(analytics.deviceType);

    const deviceBreakdown = devicesQuery.map(d => ({
        deviceType: d.deviceType || 'Unknown',
        count: Number(d.count)
    }));

    return {
        totalViews,
        totalClicks,
        topLinks: topLinksData,
        deviceBreakdown
    };
}

export async function trackEvent(data: { pageId: string, linkId?: string, type: 'VIEW' | 'CLICK', userAgent?: string, referrer?: string, deviceType?: string }) {
    await db.insert(analytics).values({
        id: crypto.randomUUID(),
        pageId: data.pageId,
        linkId: data.linkId || null,
        type: data.type,
        userAgent: data.userAgent || null,
        referrer: data.referrer || null,
        deviceType: data.deviceType || null,
        createdAt: new Date()
    });
}
