import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	serverExternalPackages: ["@libsql/client", "@libsql/isomorphic-ws"],
};

export default nextConfig;

// Enable calling `getCloudflareContext()` in `next dev`.
// See https://opennext.js.org/cloudflare/bindings#local-access-to-bindings.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
