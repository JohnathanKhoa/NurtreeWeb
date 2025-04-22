"use client";
import { Music, Disc3 } from "lucide-react";
import { PlayFill } from "geist-icons";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SpotifyIcon from "../SpotifyIcon";

interface Props {
  images: any;
  id: string;
  altTitle: string;
  heading: string;
  subheading?: string;
  imageRounded?: boolean;
  type: string;
}

export default function CardItem({
  images,
  id,
  altTitle,
  heading,
  subheading,
  type,
}: Props) {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  return (
    <div className="p-4 h-full">
      <Link
        href={type === "playlists" ? `/${type}/${id}/0` : `/${type}/${id}`}
        className="block rounded bg-paper-500"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setClicked(true)}
      >
        {images.length > 0 ? (
          <div className="relative w-full aspect-square">
            <Image
              src={images[0].url}
              alt={altTitle}
              fill
              sizes="100%"
              priority={hovered}
              className="object-cover rounded-xs md:rounded"
            />
          </div>
        ) : (
          <div className="w-full h-full">
            <Music className="h-full w-full bg-paper" />
          </div>
        )}
        <div className="flex-col items-center">
          <h3 className="mt-5 text-center font-bold truncate">{heading}</h3>
          {subheading && (
            <h6 className="mt-1 text-center text-xs font-semibold text-gray truncate">
              {subheading}
            </h6>
          )}
        </div>
      </Link>

      {/* Playlists Buttons */}
      {type === "playlists" && (
        <>
          <a
            href={`/playlists/${id}/0`}
            onClick={() => setClicked(true)}
            className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-zinc-800 py-1 hover:invert duration-200"
          >
            {clicked ? (
              <Disc3 className="w-6 animate-spin" />
            ) : (
              <PlayFill className="w-6 h-6" />
            )}
          </a>
          <a
            href={`https://open.spotify.com/playlist/${id}`}
            target="_blank"
            className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-zinc-800 py-1 font-medium hover:invert duration-200"
          >
            <SpotifyIcon />
            <p>Open in Spotify</p>
          </a>
        </>
      )}

      {/* Artists Button */}
      {type === "artists" && (
        <a
          href={`https://open.spotify.com/artist/${id}`}
          target="_blank"
          className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-zinc-800 py-1 text-black font-semibold hover:invert duration-200"
        >
          <SpotifyIcon />
        </a>
      )}

      {/* Albums Button */}
      {type === "albums" && (
        <a
          href={`https://open.spotify.com/album/${id}`}
          target="_blank"
          className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-zinc-800 py-1 text-black font-semibold hover:invert duration-200"
        >
          <SpotifyIcon />
        </a>
      )}
    </div>
  );
}
