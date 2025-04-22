"use client";
import Image from "next/image";
import SpotifyPrimaryImage from "@/public/images/Spotify_Primary_Logo_RGB_White.png";

interface Props {
  width?: number;
}

export default function SpotifyIcon({ width }: Props) {
  return (
    <Image
      className="w-6 h-6 rounded object-contain"
      width={width || 20}
      src={SpotifyPrimaryImage}
      alt={"SpotifyIcon"}
    />
  );
}
