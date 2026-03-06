'use server';

import { getCollection } from "@/lib/mongodb";
import { stackServerApp } from "@/stack/server";

export interface MongoAnalytics {
    id: string;
    pageId: string;
    linkId?: string;
    type: 'VIEW' | 'CLICK';
    userAgent?: string;
    referrer?: string;
    deviceType?: string;
    createdAt: Date;
}

export async function getAnalyticsSummary(pageId: string) {
    const user = await stackServerApp.getUser();
    if (!user) throw new Error("Unauthorized");

    const pages = await getCollection("pages");
    const page = await pages.findOne({ id: pageId });

    if (!page || page.userId !== user.id) {
        throw new Error("Unauthorized page access");
    }

    const analytics = await getCollection<MongoAnalytics>("analytics");

    // Get total views
    const totalViews = await analytics.countDocuments({ pageId: pageId, type: 'VIEW' });
    
    // Get total clicks
    const totalClicks = await analytics.countDocuments({ pageId: pageId, type: 'CLICK' });

    // Get top links
    const topLinksStats = await analytics.aggregate([
        { $match: { pageId: pageId, type: 'CLICK', linkId: { $ne: null } } },
        { $group: { _id: "$linkId", clicks: { $sum: 1 } } },
        { $sort: { clicks: -1 } },
        { $limit: 5 }
    ]).toArray();

    const topLinksData = [];
    if (topLinksStats.length > 0) {
        const linksCollection = await getCollection("links");
        for (const stat of topLinksStats) {
            const linkDetail = await linksCollection.findOne({ id: stat._id });
            if (linkDetail) {
                topLinksData.push({
                    id: linkDetail.id,
                    title: linkDetail.title,
                    clicks: stat.clicks
                });
            }
        }
    }

    // Device breakdown
    const devicesQuery = await analytics.aggregate([
        { $match: { pageId: pageId } },
        { $group: { _id: "$deviceType", count: { $sum: 1 } } }
    ]).toArray();

    const deviceBreakdown = devicesQuery.map(d => ({
        deviceType: d._id,
        count: d.count
    }));

    return {
        totalViews,
        totalClicks,
        topLinks: topLinksData,
        deviceBreakdown
    };
}

export async function trackEvent(data: { pageId: string, linkId?: string, type: 'VIEW' | 'CLICK', userAgent?: string, referrer?: string, deviceType?: string }) {
    const analytics = await getCollection<MongoAnalytics>("analytics");
    await analytics.insertOne({
        id: crypto.randomUUID(),
        ...data,
        createdAt: new Date()
    });
}
