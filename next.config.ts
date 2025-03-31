import type { NextConfig } from "next";
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.scdn.co" },
      { protocol: "https", hostname: "t.scdn.co" },
      { protocol: "https", hostname: "newjams-images.scdn.co" },
      { protocol: "https", hostname: "dailymix-images.scdn.co" },
      { protocol: "https", hostname: "seed-mix-image.spotifycdn.com" },
      { protocol: "https", hostname: "wrapped-images.spotifycdn.com" },
      { protocol: "https", hostname: "charts-images.scdn.co" },
      { protocol: "https", hostname: "daily-mix.scdn.co" },
      { protocol: "https", hostname: "blend-playlist-covers.spotifycdn.com" },
      { protocol: "https", hostname: "mosaic.scdn.co" },
      { protocol: "https", hostname: "mixed-media-images.spotifycdn.com" },
      { protocol: "https", hostname: "lineup-images.scdn.co" },
      { protocol: "https", hostname: "thisis-images.scdn.co" },
      { protocol: "https", hostname: "image-cdn-ak.spotifycdn.com" },
      { protocol: "https", hostname: "image-cdn-fa.spotifycdn.com" }
    ]
  }
  // images: {
  //   domains: [
  //     "i.scdn.co",
  //     "t.scdn.co",
  //     "newjams-images.scdn.co",
  //     "dailymix-images.scdn.co",
  //     "seed-mix-image.spotifycdn.com",
  //     "wrapped-images.spotifycdn.com",
  //     "charts-images.scdn.co",
  //     "daily-mix.scdn.co",
  //     "blend-playlist-covers.spotifycdn.com",
  //     "mosaic.scdn.co",
  //     "mixed-media-images.spotifycdn.com",
  //     "lineup-images.scdn.co",
  //     "thisis-images.scdn.co",
  //     "image-cdn-ak.spotifycdn.com",
  //     "image-cdn-fa.spotifycdn.com"
  //   ],
  // },
  
};



const withMDX = createMDX({
  // Add markdown plugins here, as desired
})

export default withMDX(nextConfig);
