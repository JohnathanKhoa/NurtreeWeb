"use client";

import { Album, Track } from "@/types/types";
import { fmtMSS } from "@/util/clientUtils";
import { Music } from "lucide-react";
import Image from "next/image";
import { redirect, usePathname, useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { MdPlayArrow } from "react-icons/md";
import LoadingOverlay from "./LoadingOverlay";
import ActiveTrackOverlay from "./ActiveTrackOverlay";
import OpenSpotifyLink from "./OpenSpotifyLink";
import SpotifyPrimaryImage from "@/public/images/Spotify_Primary_Logo_RGB_White.png";
import TripleDotsAlbum from "../track-navigation/TripleDotsAlbum";
import SpotifyIcon from "../SpotifyIcon";

interface Props {
  album: Album;
  tracks: Track[];
  showHeader?: boolean;
  showCover?: boolean;
  showAlbum?: boolean;
  showSubtitle?: boolean;
  i?: number;
  trackIndex?: number;
  currentIndex?: Dispatch<SetStateAction<number>>;
}

export default function AlbumTracksTable({
  album,
  tracks,
  showSubtitle = false,
  showCover = false,
  showHeader = false,
  showAlbum = false,
  i,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [clicked, setClicked] = useState(false);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

  useEffect(() => {
    setClicked(false);
  }, [pathname]);

  function handleClick(track: Track, index: number) {
    setClickedIndex(index);
    setClicked(true);
    pathname.includes("/playlists")
      ? redirect(`${index}`)
      : (window.history.pushState(null, "", `/tracks/${track.id}/0`),
        router.replace(`/tracks/${track.id}/0`));
  }

  return (
    <>
      {showHeader && (
        <div className="sticky w-full drop-shadow-2xl text-zinc-400">
          <header className="grid grid-cols-12 gap-2 p-4 pb-1 text-gray font-thin tracking-tight text-left"></header>
          <div className="col-span-12 border-b border-zinc-500"></div>
        </div>
      )}

      {/* Table Rows */}
      <div className="w-full col-span-12 mt-2">
        {tracks
          ?.slice(0, 20) // Limit to 20 tracks
          .map((track, index) => (
            <div key={track.id}>
              <div
                onClick={() => handleClick(track, index)}
                className={`z-49 grid py-2 px-4 grid-cols-12 cursor-pointer hover:bg-zinc-700 truncate ${
                  index === i ? "bg-zinc-700 bg-opacity-50" : "bg-transparent"
                }`}
                onMouseEnter={() => setHoveredRow(index)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <span className="flex items-center text-zinc-400">
                  {hoveredRow === index ? <MdPlayArrow /> : index + 1}
                </span>
                <div
                  className={`${
                    showAlbum
                      ? "md:col-span-6 col-span-10 truncate"
                      : "col-span-10 truncate"
                  } flex items-center`}
                >
                  <div className="flex items-center gap-4">
                    {showCover && (
                      <div className="flex-shrink-0 w-10 h-10">
                        {album.images?.length ? (
                          <Image
                            src={album.images[0].url}
                            alt={album.name}
                            height={40}
                            width={40}
                            className="object-contain w-10 h-10 rounded"
                          />
                        ) : (
                          <Music
                            size={16}
                            className="w-10 h-10 p-2 rounded bg-paper-secondary"
                          />
                        )}
                      </div>
                    )}
                    <div className="truncate">
                      <a className="font-medium text-ellipsis pr-4">
                        {track.name}
                      </a>
                      {showSubtitle && (
                        <div className="flex items-center w-full gap-1 pr-4 text-zinc-400">
                          <span className="truncate">
                            {track.artists
                              .map((artist) => artist.name)
                              .join(", ")}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {showAlbum && (
                  <div className="md:flex hidden items-center w-10/12 md:col-span-3 text-zinc-400 truncate">
                    <a>{album.name}</a>
                  </div>
                )}
                <small className="md:flex hidden items-center md:col-span-1 font-medium text-zinc-400 truncate">
                  {fmtMSS(track.duration_ms)}
                </small>
                <small className="md:flex hidden items-center md:col-span-1 font-medium text-zinc-400 truncate">
                  <OpenSpotifyLink track={track} />
                </small>
              </div>
              <div className="absolute right-10 -translate-y-11">
                {index === i && <ActiveTrackOverlay />}
                {clicked && index === clickedIndex && <LoadingOverlay />}
              </div>
              <div className="absolute right-0 -translate-y-11">
                <TripleDotsAlbum track={track} />
              </div>
            </div>
          ))}
        <a
          href={`https://open.spotify.com/album/${album.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-row w-full col-span-12 items-center justify-center gap-2 font-medium bg-zinc-800 hover:invert duration-200 py-4"
        >
          <SpotifyIcon />
          <p>Open Spotify</p>
        </a>
      </div>
    </>
  );
}
