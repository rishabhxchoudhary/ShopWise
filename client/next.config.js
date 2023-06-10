/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['images.unsplash.com', "store.storeimages.cdn-apple.com", "cdn.shopify.com", "m.media-amazon.com", "d2j6dbq0eux0bg.cloudfront.net", "d2j6dbq0eux0bg.cloudfront.net", "images-cdn.ubuy.co.in"],
    },
}

module.exports = nextConfig
