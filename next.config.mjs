/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Product photos served by monis.rent (see data/furniture.js).
    remotePatterns: [
      {
        protocol: "https",
        hostname: "strapi.monis.rent",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
