/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['okkhpmkkovtpfylmjjip.supabase.co'],
  },
    reactStrictMode: true, 
    eslint: { 
      ignoreDuringBuilds: true, 
    }, 
};

export default nextConfig;
