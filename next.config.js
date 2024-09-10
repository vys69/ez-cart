/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    trailingSlash: true,
    distDir: 'dist',
    images: {
        unoptimized: true,
    },
    exportPathMap: async function (
        defaultPathMap,
        { dev, dir, outDir, distDir, buildId }
    ) {
        return {
            '/': { page: '/' },
            '/step/1': { page: '/step/[id]', query: { id: '1' } },
            '/step/2': { page: '/step/[id]', query: { id: '2' } },
            '/cart': { page: '/cart' },
        }
    },
}

module.exports = nextConfig