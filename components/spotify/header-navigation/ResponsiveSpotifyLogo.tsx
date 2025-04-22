"use client";
import Image from "next/image";
import SpotifyImage from "@/public/images/spotify_logo.png";

export default function ResponsiveSpotifyLogo() {
  return (
    <div className="flex">
      <a
        href="https://open.spotify.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image className="w-20" src={SpotifyImage} alt="Spotify Logo" />
      </a>
    </div>
  );
}
