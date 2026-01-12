# Wify.my ⚡️

**Open social links directly in apps. Zero setup. Instant open.**

Wify is a smart deep link generator that helps content creators, marketers, and developers bypass in-app web browsers. By ensuring users land directly in the native mobile app (Instagram, YouTube, TikTok, etc.), Wify significantly improves engagement and conversion rates.

![Wify Preview](https://wify.my/opengraph-image.png)

## 🚀 Why Wify?

When you share a link on social media (like in an Instagram bio), clicking it usually opens a limited "in-app browser." Users are often not logged in there, meaning they can't like, subscribe, or follow you.

**Wify fixes this.** We detect the user's device and automatically redirect them to the native app where they are already logged in.

## ✨ Features

- **Multi-Platform Support**: Works seamlessly with Instagram, YouTube, TikTok, LinkedIn, Spotify, and more.
- **Privacy First**: No cookies, no tracking, no data storage. Links are generated on the fly.
- **Blazing Fast**: Built on Cloudflare Workers (Edge Runtime) for sub-millisecond redirects worldwide.
- **Zero Friction**: No account required. Just paste your link and go.
- **Static Asset Handling**: Smart routing ensures favicons and other assets aren't accidentally redirected.

## 📱 Supported Platforms

Wify supports deep linking for the following major platforms:

- <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" width="16" /> **Instagram** (Profiles, Posts, Reels, Stories)
- <img src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg" width="16" /> **YouTube** (Videos, Shorts, Channels)
- <img src="https://abs.twimg.com/icons/apple-touch-icon-192x192.png" width="16" /> **TikTok** (Videos, Profiles)
- <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" width="16" /> **LinkedIn** (Profiles, Companies)
- <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png" width="16" /> **Facebook** (Universal Links)
- <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Twitch_Glitch_Logo_Purple.svg/878px-Twitch_Glitch_Logo_Purple.svg.png" width="16" /> **Twitch** (Streams, Channels)
- <img src="https://upload.wikimedia.org/wikipedia/en/thumb/5/58/Reddit_logo_new.svg/2560px-Reddit_logo_new.svg.png" width="16" /> **Reddit** (Posts, Subreddits)
- <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Snapchat_logo.svg/200px-Snapchat_logo.svg.png" width="16" /> **Snapchat** (Add Friends)
- <img src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg" width="16" /> **Spotify** (Tracks, Albums, Playlists)

## 🛠 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Runtime**: [Cloudflare Workers](https://workers.cloudflare.com/) (via OpenNext)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: TypeScript

## ⚡️ Quick Start

1.  **Clone the repository**

    ```bash
    git clone https://github.com/Startups-shaswat/wifymy.git
    cd wifymy
    ```

2.  **Install dependencies**

    ```bash
    npm install
    # or
    bun install
    ```

3.  **Run locally**
    ```bash
    npm run dev
    # or
    bun dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view the app.

## 🚢 Deployment

This project is configured for deployment on **Cloudflare Workers** using OpenNext.

1.  **Login to Cloudflare**

    ```bash
    npx wrangler login
    ```

2.  **Deploy**
    ```bash
    npm run deploy
    # or
    bun run deploy
    ```

## 📄 License

This project is proprietary and all rights are reserved by Wify.
