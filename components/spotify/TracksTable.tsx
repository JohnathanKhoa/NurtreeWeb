"use client";

import { Playlist, Track } from "@/types/types";
import { fmtMSS } from "@/util/clientUtils";
import { Clock3, Music } from "lucide-react";
import Image from "next/image";
import { redirect, usePathname, useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { MdPlayArrow } from "react-icons/md";
import AddButton from "./AddButton";

interface Props {
  tracks: Track[];
  showHeader?: boolean;
  showCover?: boolean;
  showAlbum?: boolean;
  showSubtitle?: boolean;
  i?: number;
  //color: Promise<string>;
  trackIndex?: number;
  currentIndex?: Dispatch<SetStateAction<number>>;
  playlists: Playlist[];
  user: string;
}

export default function TracksTable({
  tracks,
  showSubtitle = false,
  showCover = false,
  showHeader = false,
  showAlbum = false,
  i,
  playlists,
  user,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [tableIsOpen, setTableIsOpen] = useState<boolean | null>(false);

  let keyCount = 0;

  function handleClick(track: Track, index: number) {
    if (pathname.includes("/playlists")) {
      redirect(`${index}`);
    } else {
      window.history.pushState(null, "", `/tracks/${track.id}/0`);

      router.replace(`/tracks/${track.id}/0`);
    }
  }

  // function handleTableVisibility() {
  //   setTableIsOpen(!tableIsOpen);
  // }

  return (
    <>
      {/* <div className={`${tableIsOpen ? "" : "bottom-0"} flex justify-center`}>
        <div className="">
          <button className="flex" onClick={() => setTableIsOpen(!tableIsOpen)}>
            {tableIsOpen ? <ArrowBigDownDash /> : <ArrowBigUpDash />}
          </button>
        </div>
      </div>
      <div className={`${tableIsOpen ? "visible" : "hidden"}`}> */}
      <>
        {showHeader && (
          <>
            <div className="h-full w-full drop-shadow-2xl">
              <header className="grid grid-cols-12 gap-2 p-4 pb-1 text-gray font-thin tracking-tight text-left ">
                <div className="col-span-1 font-thin tracking-wider text-left uppercase ">
                  #
                </div>
                <div
                  className={`${
                    showAlbum ? "col-span-6" : "col-span-10"
                  }  font-thin text-left`}
                >
                  Title
                </div>
                {showAlbum && (
                  <div className="md:visible invisible col-span-3  font-thin text-left">
                    Album
                  </div>
                )}
                <div className="md:visible invisible col-span-1 font-thin text-left">
                  <Clock3 size={16} />
                </div>
              </header>
              <div className="col-span-12 border-b border-zinc-500 "></div>
            </div>
          </>
        )}

        {/* Table Rows */}
        <div className="w-full col-span-12 mt-2 ">
          {tracks?.map((track, index) => (
            <div key={keyCount++}>
              <div
                onClick={() => {
                  handleClick(track, index);
                }}
                className={`z-49 grid py-2 px-4 grid-cols-12 cursor-pointer hover:bg-zinc-700 truncate ${
                  index === i ? "bg-zinc-700 bg-opacity-50" : "bg-transparent"
                }`}
                key={track.id + index + keyCount++}
                onMouseEnter={() => setHoveredRow(index)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                {hoveredRow === index ? (
                  <span className="flex items-center col-span-1  text-zinc-400">
                    <MdPlayArrow />
                  </span>
                ) : (
                  <span className="flex items-center col-span-1  text-zinc-400">
                    {index + 1}
                  </span>
                )}
                <div
                  className={`${
                    showAlbum
                      ? "md:col-span-6 col-span-10 truncate"
                      : "col-span-10 truncate"
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
                      <a className="w-10/12  font-medium text-ellipsis pr-4">
                        {track.name}
                      </a>

                      {showSubtitle && (
                        <div className="flex items-center w-full gap-1 pr-4  text-zinc-400">
                          <span className="truncate">
                            {track.artists.map((artist, index) => (
                              <a
                                key={artist.id + track.id + keyCount++}
                                // className="hover:text-white hover:underline z-50"
                                // href={`/artists/${artist.id}`}
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
                  <div className="md:flex hidden items-center w-10/12 md:col-span-3  text-zinc-400">
                    <a
                    // href={`/albums/${track.album.id}`}
                    // className="truncate hover:text-white hover:underline z-50"
                    >
                      {track.album.name}
                    </a>
                  </div>
                )}

                <small className="md:flex hidden items-center md:col-span-1  font-medium text-zinc-400 ">
                  {fmtMSS(track.duration_ms)}
                </small>
                <div className="flex col-span-1 col-end-13 items-center   font-medium text-gray "></div>
              </div>
              <div className="absolute right-0 -translate-y-11">
                <AddButton
                  user={user}
                  trackId={track.id}
                  playlists={playlists}
                />
              </div>
            </div>
          ))}
        </div>
      </>
      {/* </div> */}
    </>
  );
}
