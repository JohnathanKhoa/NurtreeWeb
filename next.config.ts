import type { NextConfig } from "next";
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    domains: [
      "i.scdn.co",
      "t.scdn.co",
      "newjams-images.scdn.co",
      "dailymix-images.scdn.co",
      "seed-mix-image.spotifycdn.com",
      "wrapped-images.spotifycdn.com",
      "charts-images.scdn.co",
      "daily-mix.scdn.co",
      "blend-playlist-covers.spotifycdn.com",
      "mosaic.scdn.co",
      "mixed-media-images.spotifycdn.com",
      "lineup-images.scdn.co",
      "thisis-images.scdn.co",
      "image-cdn-ak.spotifycdn.com",
      "image-cdn-fa.spotifycdn.com"
    ],
  },
  
};



const withMDX = createMDX({
  // Add markdown plugins here, as desired
})

export default withMDX(nextConfig);
