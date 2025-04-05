import { Music } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SpotifyPrimaryImage from "@/public/images/Spotify_Primary_Logo_RGB_White.png";

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

  return (
    <>
    <div className="h-full p-4">
    <Link
      key={keycount++}
      href={type === "playlists" ? `/${type}/${id}/0` : `/${type}/${id}`}
    >
      <div className="  transition duration-300 rounded-lg bg-paper-500 hover:opacity-80">
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
        <h3 className="mt-5 font-bold text-center truncate">{heading}</h3>
        {subheading && (
          <h6 className="mt-1 text-xs text-center font-semibold truncate text-gray">
            {subheading}
          </h6>
        )}
        
      </div>
    </Link>
    {type === "playlists" ? (
      <>
      <a href={`https://open.spotify.com/playlist/${id}`} target="_blank" className="flex flex-row gap-2 items-center justify-center mt-2 text-black font-semibold bg-white rounded-2xl py-1">
        <p className="">Open Spotify</p>
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
      <a href={`https://open.spotify.com/artist/${id}`} target="_blank" className="flex flex-row gap-2 items-center justify-center mt-2 text-black font-semibold bg-white rounded-2xl py-1">
        <p className="">Open Spotify</p>
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
      <a href={`https://open.spotify.com/album/${id}`} target="_blank" className="flex flex-row gap-2 items-center justify-center mt-2 text-black font-semibold bg-white rounded-2xl py-1">
        <p className="">Open Spotify</p>
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
