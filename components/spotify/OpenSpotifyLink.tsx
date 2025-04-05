"use client";
import Image from "next/image";
import SpotifyImage from "@/public/images/spotify_logo.png";
import SpotifyPrimaryImage from "@/public/images/Spotify_Primary_Logo_RGB_White.png";
import { useEffect } from "react";
import { Track } from "@/types/types";

interface Props {
  track: Track;
}

export default function OpenSpotifyLink({ track }: Props) {
  return (
    <div className="">
      <a href={`https://open.spotify.com/track/${track.id}`} target="_blank">
        <Image
          height={20}
          width={20}
          // className="object-contain w-6 h-6 rounded"
          src={SpotifyPrimaryImage}
          alt={track.name}
        />
      </a>
    </div>
  );
}
