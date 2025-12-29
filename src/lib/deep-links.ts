
export type Platform = 'instagram' | 'youtube' | 'tiktok' | 'twitter' | 'telegram' | 'unknown';

export interface LinkData {
    platform: Platform;
    deepLink: string;
    webLink: string;
    originalUrl: string;
}

export function parseUrlAndGenerateLinks(path: string[]): LinkData {
    // Path is an array, e.g. ['instagram.com', 'p', 'xyz']
    const fullPath = path.join('/');
    const normalizedPath = fullPath.toLowerCase();

    // Instagram
    // https://instagram.com/p/{shortcode} -> instagram://media?id={shortcode}
    // Note: Shortcode isn't directly the Media ID, but purely for this reliable opener we might rely on web fallback or try a different scheme if needed. 
    // Actually, instagram://media?id={MEDIA_ID} requires a numeric ID. 
    // However, instagram://library?AssetPath=... is different.
    // Common trick: intent://instagram.com/p/{code}#Intent;package=com.instagram.android;scheme=https;end 
    // Or simply instagram.com/p/{code} usually triggers app if installed via Universal Links / App Links.
    // But USER asked for: "instagram://media?id={shortcode}"
    // Wait, standard IG deep link for post usually needs Media ID (numeric).
    // Let's stick to what allows opening. 
    // For Instagram, often `instagram://media?id=` expects numeric. 
    // Let's try to map best effort. If User specified: "instagram://media?id={shortcode}", I will follow that, 
    // but usually shortcode != id. 
    // Let's also support: instagram://user?username={username}

    if (normalizedPath.includes('instagram.com')) {
        // Check for Post
        if (path.includes('p') || path.includes('reel') || path.includes('tv')) {
            const shortcodeIndex = path.findIndex(p => p === 'p' || p === 'reel' || p === 'tv') + 1;
            if (shortcodeIndex < path.length) {
                const shortcode = path[shortcodeIndex];
                // User requested: instagram://media?id={shortcode} - adhering to request even if ID usually numeric.
                // Some docs suggest /p/ works with http scheme but let's try custom scheme if requested.
                // Actually, for "p", sending https link to client might be safer for Universal Links.
                // But prompt says: "instagram://media?id={shortcode}"
                return {
                    platform: 'instagram',
                    deepLink: `instagram://media?id=${shortcode}`,
                    webLink: `https://instagram.com/p/${shortcode}`,
                    originalUrl: fullPath
                };
            }
        }
    }

    // YouTube
    // youtube://watch?v={id}
    if (normalizedPath.includes('youtube.com') || normalizedPath.includes('youtu.be')) {
        // Logic for path segment extraction if needed
    }

    // Re-evaluating: The `path` array from Next.js is just segments.
    // Query parameters are separate in `searchParams`.
    // The strategy: Reconstruct the target URL from path + searchParams.

    return {
        platform: 'unknown',
        deepLink: '',
        webLink: `https://${fullPath}`,
        originalUrl: fullPath
    };
}

export function generateLinks(urlStr: string): LinkData {
    let url: URL;
    try {
        // Ensure protocol
        if (!urlStr.startsWith('http')) {
            urlStr = 'https://' + urlStr;
        }
        url = new URL(urlStr);
    } catch {
        return { platform: 'unknown', deepLink: '', webLink: urlStr, originalUrl: urlStr };
    }

    const hostname = url.hostname.replace('www.', '');
    const pathname = url.pathname;

    // Instagram
    if (hostname === 'instagram.com') {
        // /p/SHORTCODE
        // /reel/SHORTCODE
        const match = pathname.match(/\/(p|reel|tv)\/([^/]+)/);
        if (match) {
            const shortcode = match[2];
            return {
                platform: 'instagram',
                deepLink: `instagram://media?id=${shortcode}`, // Per instructions
                webLink: `https://instagram.com/p/${shortcode}`,
                originalUrl: urlStr
            };
        }
    }

    // YouTube
    if (hostname === 'youtube.com' || hostname === 'm.youtube.com') {
        const videoId = url.searchParams.get('v');
        if (videoId) {
            return {
                platform: 'youtube',
                deepLink: `youtube://watch?v=${videoId}`,
                webLink: `https://youtube.com/watch?v=${videoId}`,
                originalUrl: urlStr
            };
        }
        // Support /shorts/ID
        const shortsMatch = pathname.match(/\/shorts\/([^/]+)/);
        if (shortsMatch) {
            const id = shortsMatch[1];
            return {
                platform: 'youtube',
                deepLink: `youtube://watch?v=${id}`,
                webLink: `https://youtube.com/watch?v=${id}`,
                originalUrl: urlStr
            }
        }
    }
    if (hostname === 'youtu.be') {
        const videoId = pathname.slice(1);
        if (videoId) {
            return {
                platform: 'youtube',
                deepLink: `youtube://watch?v=${videoId}`,
                webLink: `https://youtube.com/watch?v=${videoId}`,
                originalUrl: urlStr
            };
        }
    }

    // TikTok
    if (hostname === 'tiktok.com') {
        // /@user/video/ID
        const match = pathname.match(/\/@([^/]+)\/video\/([^/]+)/);
        if (match) {
            const id = match[2];
            const user = match[1];
            return {
                platform: 'tiktok',
                deepLink: `tiktok://video/${id}`, // Instructions: tiktok://video/{id}
                webLink: `https://www.tiktok.com/@${user}/video/${id}`,
                originalUrl: urlStr
            };
        }
    }

    // Twitter / X
    if (hostname === 'twitter.com' || hostname === 'x.com') {
        // /user/status/ID
        const match = pathname.match(/\/([^/]+)\/status\/([^/]+)/);
        if (match) {
            const id = match[2];
            const user = match[1];
            return {
                platform: 'twitter',
                deepLink: `twitter://status?id=${id}`,
                webLink: `https://x.com/${user}/status/${id}`, // Force x.com for web fallback as it's the current canon
                originalUrl: urlStr
            };
        }
    }

    // Telegram
    // t.me/channel/POST_ID
    if (hostname === 't.me') {
        // pathname might be /channel/ID or /c/ID ? Usually t.me/username/postid
        const parts = pathname.split('/').filter(Boolean);
        // t.me/durov/123
        if (parts.length >= 2) {
            const domain = parts[0];
            const post = parts[1];
            return {
                platform: 'telegram',
                deepLink: `tg://resolve?domain=${domain}&post=${post}`,
                webLink: `https://t.me/${domain}/${post}`,
                originalUrl: urlStr
            };
        }
    }

    return {
        platform: 'unknown',
        deepLink: '',
        webLink: url.toString(),
        originalUrl: url.toString()
    };
}
