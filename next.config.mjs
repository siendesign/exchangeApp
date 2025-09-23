/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: '/api/files/:path*', // You'll need to create this API route
      },
    ]
  },
    reactStrictMode: true, 
    eslint: { 
      ignoreDuringBuilds: true, 
    }, 
};

export default nextConfig;
