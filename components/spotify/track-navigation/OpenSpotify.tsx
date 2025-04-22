"use client";
import { Track } from "@/types/types";
import SpotifyIcon from "../SpotifyIcon";

interface Props {
  track: Track;
}

export default function OpenSpotify({ track }: Props) {
  return (
    <a
      href={`https://open.spotify.com/track/${track.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex w-full rounded-sm pl-2 py-3 hover:bg-indigo-100/50 text-start cursor-pointer"
      aria-label={`Open ${track.name || "this track"} on Spotify`} // Accessibility improvement
    >
      <div className="flex w-full justify-between items-center">
        <p className="flex flex-row items-center justify-center gap-2">
          <SpotifyIcon />
          Open in Spotify
        </p>
      </div>
    </a>
  );
}
