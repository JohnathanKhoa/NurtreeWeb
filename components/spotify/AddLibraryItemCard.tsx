"use client";

import { Album, Artist, Playlist } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingDots from "./LoadingDots";
import { useRouter } from "next/navigation";

interface Props {
  playlistId: string;
  trackId: string;
  entity: Playlist
}

async function handleClick(playlistId:string, trackId:string) {
  const response = await fetch(`/api/playlists/${playlistId}/tracks/${trackId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    
  });
  
  
  console.log(response);
}
export default function LibraryItemCard({ playlistId, trackId, entity }: Props) {
    const router = useRouter();
  return (
    
    <div 
      onClick={() => { handleClick(playlistId, trackId)}}
      className="flex items-center p-2 gap-3 rounded-md text-white cursor-pointer  hover:bg-zinc-500"
    >
      <Image
        src={entity.images[0].url}
        alt={entity.name}
        height={50}
        width={50}
        className="rounded-md aspect-square object-cover"
      />

      <div className="truncate">
        <h6 className="w-full text-sm font-semibold truncate hover:text-white">
          {entity.name}
        </h6>
      </div>
      
    </div>
    
  );
}
