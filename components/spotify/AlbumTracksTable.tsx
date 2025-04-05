"use client";

import { Album, Playlist, Track } from "@/types/types";
import { fmtMSS } from "@/util/clientUtils";
import { Clock3, Music } from "lucide-react";
import Image from "next/image";
import { redirect, usePathname, useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { MdPlayArrow } from "react-icons/md";
import LoadingOverlay from "./LoadingOverlay";
import ActiveTrackOverlay from "./ActiveTrackOverlay";
import TripleDots from "./track-navigation/TripleDots";
import SpotifyPrimaryImage from "@/public/images/Spotify_Primary_Logo_RGB_White.png";
import OpenSpotifyLink from "./OpenSpotifyLink";
interface Props {
  album: Album;
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

export default function AlbumTracksTable({
  album,
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
  const [clicked, setClicked] = useState(false);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [tableIsOpen, setTableIsOpen] = useState<boolean | null>(false);
  useEffect(() => {
    setClicked(false);
  }, [pathname]);
  let keyCount = 0;

  function handleClick(track: Track, index: number) {
    setClickedIndex(index);
    setClicked(true);
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
            <div className="sticky w-full drop-shadow-2xl text-zinc-400">
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
                <div className="md:visible invisible col-span-1 font-thin text-left">
                  {/* <Image
                    src={SpotifyPrimaryImage}
                    alt="Spotify"
                    height={20}
                    width={20}
                    // className="object-contain w-6 h-6 rounded"
                    /> */}
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
                  index === i ? `bg-zinc-700 bg-opacity-50` : "bg-transparent"
                } `}
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
                  } flex items-center `}
                >
                  <div className="flex items-center  gap-4">
                    {showCover &&
                      (album.images && album.images.length > 0 ? (
                        <div className="flex-shrink-0 w-10 h-10">
                          <Image
                            src={album.images?.[0].url as string}
                            alt={album.name}
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

                    <div className=" truncate">
                      <a className=" font-medium text-ellipsis pr-4">
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
                  <div className="md:flex hidden items-center w-10/12 md:col-span-3  text-zinc-400 truncate">
                    <a
                    // href={`/albums/${track.album.id}`}
                    // className="truncate hover:text-white hover:underline z-50"
                    >
                      {album.name}
                    </a>
                  </div>
                )}

                <small className="md:flex hidden items-center md:col-span-1  font-medium text-zinc-400 truncate">
                  {fmtMSS(track.duration_ms)}
                </small>

                <small className="md:flex hidden items-center md:col-span-1  font-medium text-zinc-400 truncate">
                  <OpenSpotifyLink track={track} />
                </small>

                <div className="flex col-span-1 col-end-13 items-center font-medium text-gray "></div>
              </div>
              <div className="absolute right-10 -translate-y-11">
                {index === i && <ActiveTrackOverlay />}
                {clicked && index === clickedIndex && <LoadingOverlay />}
              </div>
              <div className="absolute right-0 -translate-y-11">
                <TripleDots user={user} track={track} playlists={playlists} />
              </div>
            </div>
          ))}
        </div>
      </>
      {/* </div> */}
    </>
  );
}
