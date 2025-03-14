/** @type {import('next').NextConfig} */
const nextConfig = {
  // Other configurations
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'developer.marvel.com',
        port: '',
      },
      {
        protocol: 'http', // or 'https' based on your needs
        hostname: 'i.annihil.us', // Add the correct Marvel image hostname
        port: '',
      },
    ],
  },
  // Other configurations
};

export default nextConfig;
