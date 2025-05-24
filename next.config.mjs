/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => [
    {
      source: '/es/:path*',
      destination: `${process.env.ES_ENDPOINT ?? 'http://localhost:9200'}/:path*`,
    },
  ],
  env: {
    ES_ENDPOINT: process.env.ES_ENDPOINT,
    ES_USERNAME: process.env.ES_USERNAME,
    ES_PASSWORD: process.env.ES_PASSWORD,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
