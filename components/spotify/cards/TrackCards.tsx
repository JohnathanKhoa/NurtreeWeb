"use client";
import { Track } from "@/types/types";
import { Music } from "lucide-react";
import Image from "next/image";
import CardItemGrid from "./CardItemGrid";

import Link from "next/link";

interface Props {
  tracks: Track[];
}

export default function TrackCards({ tracks }: Props) {
  return (
    <CardItemGrid>
      {tracks?.map(
        (track) =>
          track && (
            <Link
              key={track.id}
              href={`/tracks/${track.id}/0`}
              className="cursor-pointer"
            >
              <div className="h-full w-full p-4 transition duration-300 bg-paper-500 hover:opacity-80">
                <div className="relative">
                  {track.album.images.length > 0 ? (
                    <div className="relative w-full aspect-square">
                      <Image
                        src={track.album.images[0].url}
                        alt={track.name}
                        fill
                        className="object-cover rounded-xs md:rounded"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-40">
                      <Music className="w-full h-full bg-paper " />
                    </div>
                  )}
                </div>
                <h3 className="mt-5 font-bold truncate">{track.name}</h3>
                <h6 className="mt-1 text-xs font-semibold truncate text-gray">
                  {track.artists[0].name}
                </h6>
              </div>
            </Link>
          )
      )}
    </CardItemGrid>
  );
}
