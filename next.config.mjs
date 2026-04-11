/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable HTTP keep-alive to prevent ECONNRESET on Windows when Node.js
  // attempts to reuse an idle TLS connection that the remote server has closed.
  httpAgentOptions: {
    keepAlive: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
