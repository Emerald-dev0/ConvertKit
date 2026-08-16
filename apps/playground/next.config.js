/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure that sharp and other local packages are handled correctly
  transpilePackages: ["@convertkit/core", "@convertkit/converter-image"],
};

export default nextConfig;
