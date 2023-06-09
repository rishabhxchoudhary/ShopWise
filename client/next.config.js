/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['images.unsplash.com', "store.storeimages.cdn-apple.com", "m.media-amazon.com"],
    },
}

module.exports = nextConfig
