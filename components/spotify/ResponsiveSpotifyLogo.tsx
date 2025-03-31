"use client";
import Image from "next/image";
import SpotifyImage from "@/public/images/spotify_logo.png";
import SpotifyPrimaryImage from "@/public/images/Spotify_Primary_Logo_RGB_White.png";
import { useEffect } from "react";

export default function ResponsiveSpotifyLogo() {
  return (
    <div className="flex">
      <a href="https://open.spotify.com" target="_blank">
        <Image className="w-20" src={SpotifyImage} alt={""} />
      </a>
    </div>
  );
}
