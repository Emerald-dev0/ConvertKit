/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure that sharp and other local packages are handled correctly
  transpilePackages: [
    "@convertkit/core",
    "@convertkit/converter-image",
    "@convertkit/converter-pdf-text",
    "@convertkit/converter-csv-json",
    "@convertkit/converter-markdown-html",
    "@convertkit/converter-office-pdf",
    "@convertkit/converter-ffmpeg",
    "@convertkit/converter-ocr"
  ],
};

export default nextConfig;
