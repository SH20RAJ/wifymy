
export type Platform = 'instagram' | 'youtube' | 'tiktok' | 'twitter' | 'telegram' | 'unknown';

export interface LinkData {
    platform: Platform;
    deepLink: string;
    webLink: string;
    originalUrl: string;
}

export function parseUrlAndGenerateLinks(path: string[]): LinkData {
    // Reconstruct path for server-side logic if needed
    const fullPath = path.join('/');
    return generateLinks(fullPath);
}

export function generateLinks(input: string): LinkData {
    let urlStr = input.trim();

    // Handle @username logic -> Default to Instagram
    if (urlStr.startsWith('@')) {
        const username = urlStr.substring(1);
        // Instagram Profile
        return {
            platform: 'instagram',
            deepLink: `instagram://user?username=${username}`,
            webLink: `https://instagram.com/${username}`,
            originalUrl: `instagram.com/${username}`
        };
    }

    // Heuristic: If it looks like "instagram.com/foo", prepend https
    // But if it's just "shaswat", it's ambiguous. We'll assume input has some domain indicator OR is a direct paste.
    // If no protocol, try to fix.
    if (!urlStr.startsWith('http://') && !urlStr.startsWith('https://')) {
        urlStr = 'https://' + urlStr;
    }

    let url: URL;
    try {
        url = new URL(urlStr);
    } catch {
        // Fallback: if URL construction fails, it might be a raw username without @?
        // For now, return unknown.
        return { platform: 'unknown', deepLink: '', webLink: input, originalUrl: input };
    }

    const hostname = url.hostname.replace('www.', '');
    const pathname = url.pathname;

    // Instagram
    if (hostname === 'instagram.com') {
        // Stories: /stories/username/storyId or /stories/username
        const storiesMatch = pathname.match(/\/stories\/([^/]+)/);
        if (storiesMatch) {
            const username = storiesMatch[1];
            return {
                platform: 'instagram',
                deepLink: `instagram://stories?username=${username}`,
                webLink: `https://instagram.com/stories/${username}`,
                originalUrl: urlStr
            };
        }

        // Media: /p, /reel, /tv
        const mediaMatch = pathname.match(/\/(p|reel|tv)\/([^/]+)/);
        if (mediaMatch) {
            const shortcode = mediaMatch[2];
            return {
                platform: 'instagram',
                deepLink: `instagram://media?id=${shortcode}`,
                webLink: `https://instagram.com/p/${shortcode}`,
                originalUrl: urlStr
            };
        }

        // Profile: /username
        const firstSegment = pathname.split('/')[1];
        const reservedPaths = ['p', 'reel', 'tv', 'stories', 'explore', 'direct', 'accounts', 'developer', 'about', 'legal', 'create', 'reels', 'api'];
        if (firstSegment && !reservedPaths.includes(firstSegment)) {
            return {
                platform: 'instagram',
                deepLink: `instagram://user?username=${firstSegment}`,
                webLink: `https://instagram.com/${firstSegment}`,
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

        // Shorts: /shorts/ID
        const shortsMatch = pathname.match(/\/shorts\/([^/]+)/);
        if (shortsMatch) {
            const id = shortsMatch[1];
            return {
                platform: 'youtube',
                deepLink: `youtube://watch?v=${id}`,
                webLink: `https://youtube.com/watch?v=${id}`,
                originalUrl: urlStr
            };
        }

        // Channel: /@handle
        if (pathname.startsWith('/@')) {
            // Deep linking to channel isn't perfect on all OS, usually web fallback is fine, 
            // or youtube://www.youtube.com/@handle (some versions support http scheme intent)
            // We'll stick to webLink fallback mostly, but `youtube://` scheme usually opens app home.
            // Let's try `youtube://www.youtube.com/@handle` for parity.
            return {
                platform: 'youtube',
                deepLink: `youtube://${hostname}${pathname}`, // Experimental
                webLink: `https://${hostname}${pathname}`,
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
    if (hostname === 'tiktok.com' || hostname === 'vm.tiktok.com' || hostname === 'vt.tiktok.com') {
        // Logic for vm.tiktok.com (short links)
        // Usually these redirects need to be resolved to get the Video ID.
        // But we are client-side only for generation.
        // Strategy: Just map it to `wify.my/vm.tiktok.com/ABC`.
        // The server component `[...path]` handles the redirect.
        // DOES the server component resolve redirects? No, it just passes through.
        // If we pass `vm.tiktok.com/ABC` to the mobile device:
        // Mobile app might open `https://vm.tiktok.com/ABC` via Universal Links.
        // So we just preserve it.

        // Standard: /@user/video/ID
        const match = pathname.match(/\/@([^/]+)\/video\/([^/]+)/);
        if (match) {
            const id = match[2];
            const user = match[1];
            return {
                platform: 'tiktok',
                deepLink: `tiktok://video/${id}`,
                webLink: `https://www.tiktok.com/@${user}/video/${id}`,
                originalUrl: urlStr
            };
        }

        // If it's a short link (vm.tiktok.com), we can't extract ID without fetch.
        // Return it as-is for web fallback / universal link triggering.
        return {
            platform: 'tiktok',
            deepLink: '', // No specific scheme for short link, rely on Universal Link or Fallback
            webLink: urlStr,
            originalUrl: urlStr
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
                webLink: `https://x.com/${user}/status/${id}`, // Canonical X
                originalUrl: urlStr
            };
        }
        // Profile
        const firstSegment = pathname.split('/')[1];
        if (firstSegment && !['home', 'explore', 'notifications'].includes(firstSegment)) {
            return {
                platform: 'twitter',
                deepLink: `twitter://user?screen_name=${firstSegment}`,
                webLink: `https://x.com/${firstSegment}`,
                originalUrl: urlStr
            }
        }
    }

    // Telegram
    // t.me/channel/POST_ID
    if (hostname === 't.me') {
        const parts = pathname.split('/').filter(Boolean);
        if (parts.length >= 1) {
            const domain = parts[0];
            const post = parts[1]; // Optional

            if (post) {
                return {
                    platform: 'telegram',
                    deepLink: `tg://resolve?domain=${domain}&post=${post}`,
                    webLink: `https://t.me/${domain}/${post}`,
                    originalUrl: urlStr
                };
            } else {
                // Just channel
                return {
                    platform: 'telegram',
                    deepLink: `tg://resolve?domain=${domain}`,
                    webLink: `https://t.me/${domain}`,
                    originalUrl: urlStr
                }
            }
        }
    }

    return {
        platform: 'unknown',
        deepLink: '',
        webLink: url.toString(),
        originalUrl: url.toString()
    };
}
