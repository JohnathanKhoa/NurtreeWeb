import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css";
import Head from "next/head";
import SpotifyImage from "@/public/images/spotify_logo.png";
import YoutubeImage from "@/public/images/yt_logo_mono_dark.png";
import NurtreeImage from "@/public/images/nurtree.png";
import { Geist } from "next/font/google";
const fontFamily = Geist({
  subsets: ["latin"],
  preload: true,
  variable: "--Geist",
});
export const metadata: Metadata = {
  title: "Nurtree",
  description:
    "Play all the top music videos using your own curated Spotify playlists",
  authors: [{ name: "Johnathan Khoa Nguyen", url: "https://jkn95.dev" }],
  keywords: "Spotify, YouTube, Music, Videos, Playlists, Nurtree",
  openGraph: {
    images: [
      { url: NurtreeImage.src, alt: "Nurtree Logo" },
      { url: SpotifyImage.src, alt: "Spotify Logo" },
      { url: YoutubeImage.src, alt: "YouTube Logo" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html
        lang="en"
        className={` ${fontFamily.variable} "overflow-auto scrollbar scrollbar-w-1 scrollbar-track-rounded-full scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-thumb-zinc-300 "`}
      >
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          
        </Head>

        <body className="bg-black`">
          <div>{children}</div>
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </>
  );
}
