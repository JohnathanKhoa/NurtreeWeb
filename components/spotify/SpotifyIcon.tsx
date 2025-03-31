"use client";
import Image from "next/image";
import SpotifyPrimaryImage from "@/public/images/Spotify_Primary_Logo_RGB_White.png";

export default function SpotifyIcon() {
  return (
    <Image
      className="w-6 subpixel-antialiased"
      src={SpotifyPrimaryImage}
      alt={"SpotifyIcon"}
    />
  );
}
