import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Enabling static export
  output: 'export',

  // Setting the output directory for the static export
  // distDir: '../server/wwwroot',

  // ensures /blog/post results in /blog/post.html 
  // rather than /blog/post/index.html
  trailingSlash: false,

  // Disabling image optimization for static export
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
