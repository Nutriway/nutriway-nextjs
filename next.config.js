/** @type {import("next").NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
                port: ""
            },
            {
                protocol: "https",
                hostname: "c5.patreon.com",
                port: ""
            }
        ]
    }
};

module.exports = nextConfig;
