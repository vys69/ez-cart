/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    trailingSlash: true,
    distDir: 'dist',
    images: {
        unoptimized: true,
        path: "/",
    },
    compiler: {
        removeConsole: {
          exclude: ['error'],
        },
    },
}

module.exports = nextConfig;