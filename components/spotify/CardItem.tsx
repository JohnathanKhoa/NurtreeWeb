"use client";
import { Play, CirclePlay, Music, Disc3 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SpotifyPrimaryImage from "@/public/images/Spotify_Primary_Logo_RGB_White.png";
import { useState } from "react";
import PlayButton from "./PlayButton";
import LoadingOverlay from "./LoadingOverlay";

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
  imageRounded = false,
  type,
}: Props) {
  let keycount = 0;
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  return (
    <>
      <div className="h-full p-4">
        <Link
          key={keycount++}
          href={type === "playlists" ? `/${type}/${id}/0` : `/${type}/${id}`}
        >
          <div
            className=" rounded-lg bg-paper-500 "
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => setClicked(true)}
          >
            {images.length > 0 ? (
              <Image
                src={images[0].url}
                alt={altTitle}
                height={2000}
                width={2000}
                className={`aspect-square object-cover w-full rounded-md`}
              />
            ) : (
              <div className="w-full h-40">
                <Music className="w-full h-full bg-paper " />
              </div>
            )}
            <div className="flex-row">
              <h3 className="mt-5 font-bold text-center truncate">{heading}</h3>
              {subheading && (
                <>
                  <h6 className="mt-1 text-xs text-center font-semibold truncate text-gray">
                    {subheading}
                    {/* {hovered === true ? <CirclePlay className="absolute" /> : null} */}
                  </h6>
                </>
              )}
              {/* <div className="flex w-full absolute -translate-y-16 items-end justify-end"><CirclePlay className="w-1/2" /></div> */}

              {/* {hovered === true ? <CirclePlay className=" absolute -translate-y-16 " /> : null} */}
              {/* {clicked === true ? <div className=""><LoadingOverlay  /></div> : null} */}
            </div>
            {/* {hovered === true ? <CirclePlay className="" /> : null} */}
          </div>
        </Link>
        {type === "playlists" ? (
          <>
            <a
              href={`/playlists/${id}/0`}
              onClick={() => setClicked(true)}
              className="flex flex-row gap-2 items-center justify-center mt-2 text-black font-semibold bg-white rounded-2xl py-1 hover:invert duration-200"
            >
              {/* <p className="">Play</p> */}

              {clicked === false ? (
                <div className="">
                  <Play className="w-6 h-6" />
                </div>
              ) : null}
              {clicked === true ? (
                <div className="">
                  <Disc3 className="animate-spin w-6" />
                </div>
              ) : null}
            </a>
            <a
              href={`https://open.spotify.com/playlist/${id}`}
              target="_blank"
              className="flex flex-row gap-2 items-center justify-center mt-2 text-black font-semibold bg-white rounded-2xl py-1 hover:invert duration-200"
            >
              {/* <p className="">Open Spotify</p> */}
              <Image
                className="object-contain w-6 h-6 rounded invert"
                src={SpotifyPrimaryImage}
                alt={altTitle}
              />
            </a>
          </>
        ) : null}
        {type === "artists" ? (
          <>
            <a
              href={`https://open.spotify.com/artist/${id}`}
              target="_blank"
              className="flex flex-row gap-2 items-center justify-center mt-2 text-black font-semibold bg-white rounded-2xl py-1 hover:invert duration-200"
            >
              {/* <p className="">Open Spotify</p> */}
              <Image
                className="object-contain w-6 h-6 rounded invert"
                src={SpotifyPrimaryImage}
                alt={altTitle}
              />
            </a>
          </>
        ) : null}
        {type === "albums" ? (
          <>
            <a
              href={`https://open.spotify.com/album/${id}`}
              target="_blank"
              className="flex flex-row gap-2 items-center justify-center mt-2 text-black font-semibold bg-white rounded-2xl py-1 hover:invert duration-200"
            >
              {/* <p className="">Open Spotify</p> */}
              <Image
                className="object-contain w-6 h-6 rounded invert"
                src={SpotifyPrimaryImage}
                alt={altTitle}
              />
            </a>
          </>
        ) : null}
      </div>
    </>
  );
}
