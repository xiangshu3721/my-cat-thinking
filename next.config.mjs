/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://your-backend-service.com/:path*', // 替换成你的后端服务地址
      },
    ]
  },
};

export default nextConfig;



