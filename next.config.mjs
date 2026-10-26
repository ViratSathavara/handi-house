/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Homepage = scroll-scrubbed biryani video site (public/dum-co).
  // The previous React homepage is still in app/page.tsx; remove this rewrite to bring it back.
  async rewrites() {
    return {
      beforeFiles: [{ source: "/", destination: "/dum-co/index.html" }],
    };
  },
};
export default nextConfig;
