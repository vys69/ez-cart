/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    trailingSlash: true,
    distDir: 'dist',
    images: {
        unoptimized: true,
        path: "/",
    },
}

module.exports = {
    nextConfig,
    compiler: {
      removeConsole: {
        exclude: ['error'],
      },
    },
  }