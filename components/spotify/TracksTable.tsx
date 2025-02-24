"use client"

import { Track } from "@/types/types";
import { fmtMSS } from "@/util/clientUtils";
import { Clock3, Music } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { MdPlayArrow } from "react-icons/md";

interface Props {
  tracks: Track[];
  showHeader?: boolean;
  showCover?: boolean;
  showAlbum?: boolean;
  showSubtitle?: boolean;
  i: number;
  //color: Promise<string>;
  trackIndex: number;
  currentIndex: Dispatch<SetStateAction<number>>;
}

export default function TracksTable({
  tracks,
  showSubtitle = false,
  showCover = false,
  showHeader = false,
  showAlbum = false,
  i,
}: Props) {

  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  let keyCount = 0;

  return (
    <div>
      {showHeader && (
        <>
          <div className="md:contents hidden sticky w-full z-10">
          <header className="grid grid-cols-12 gap-2 p-4 pb-1 text-gray">
            <div className="col-span-1 font-semibold tracking-wider text-left uppercase">
              #
            </div>
            <div
              className={`${
                showAlbum ? "col-span-6" : "col-span-10"
              } text-sm font-semibold text-left`}
            >
              Title
            </div>
            {showAlbum && (
              <div className="col-span-4 text-sm font-semibold text-left">
                Album
              </div>
            )}
            <div className="col-span-1 font-semibold text-left">
              <Clock3 size={16} />
            </div>
          </header>
          <div className="col-span-12 border-b border-paper-600"></div>
          </div>
        </>
      )}

      {/* Table Rows */}
      <div className="w-full col-span-12 mt-2">
        {tracks?.map((track, index) => (
          <>
          <div onClick={() => (redirect(`${index}`))}
            className={`grid py-2 px-4 grid-cols-12 cursor-pointer hover:bg-zinc-700 truncate ${
              index === i ? "bg-zinc-400 bg-opacity-50" : "bg-transparent"
              
            }`}
            key={track.id + index + keyCount++}
            
            onMouseEnter={() => setHoveredRow(index)}
            onMouseLeave={() => setHoveredRow(null)}
          >
            {hoveredRow === index ? (
              <span className="flex items-center col-span-1 text-sm text-gray">
                <MdPlayArrow/>
              </span>
            ) : (
              <span className="flex items-center col-span-1 text-sm text-gray">
                {index + 1}
              </span>
            )}
            <div
              className={`${
                showAlbum ? "col-span-6" : "col-span-10"
              } flex items-center w-full`}
            >
              <div className="flex items-center w-screen gap-4">
                {showCover && 
                  (track.album.images && track.album.images.length > 0 ? (
                    
                    <div className="flex-shrink-0 w-10 h-10">
                      <Image
                        src={track.album.images?.[0].url as string}
                        alt={track.name}
                        height={40}
                        width={40}
                        className="object-contain w-10 h-10 rounded"
                      />
                    </div>
                  ) : (
                    <Music
                      size={16}
                      className="w-10 h-10 p-2 rounded bg-paper-secondary"
                    />
                  ))}

                <div className="w-full pr-3 truncate">
                <a
                   
                    className="w-10/12 text-sm font-medium text-ellipsis pr-4"
                  >
                    {track.name}
                  </a>
                
                

                  {showSubtitle && (
                    <div className="flex items-center w-full gap-1 pr-4 text-sm text-gray">
                      <span className="truncate">
                        {track.artists.map((artist, index) => (
                          <a
                            key={artist.id + track.id}
                            className="hover:text-white hover:underline"
                          >
                            {index !== 0 ? `, ${artist.name}` : artist.name}
                          </a>
                        ))}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {showAlbum && (
              <div className="md:flex hidden items-center w-10/12 col-span-4 text-sm text-gray">
                {track.album.name}
                
              </div>
            )}

            <small className="md:flex hidden items-center col-span-1 text-sm font-medium text-gray ">
              {fmtMSS(track.duration_ms)}
            </small>
          </div>
          </>
        ))}
      </div>
      
    </div>

  );
}
