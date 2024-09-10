/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    trailingSlash: true,
    distDir: 'dist',  // This is the important line
    images: {
        unoptimized: true,
    },
}

module.exports = nextConfig