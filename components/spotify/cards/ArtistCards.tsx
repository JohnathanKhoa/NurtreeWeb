import { Artist } from "@/types/types";
import CardItem from "./CardItem";
import CardItemGrid from "./CardItemGrid";
import Image from "next/image";
import SpotifyPrimaryImage from "@/public/images/Spotify_Primary_Logo_RGB_White.png";

interface Props {
  artists: Artist[];
}

export default function ArtistCards({ artists }: Props) {
  let keycount = 0;
  return (
    <CardItemGrid>
      {artists?.map((artist) => (
        <div key={keycount++}>
          <CardItem
            key={artist.id}
            id={artist.id}
            heading={artist.name}
            images={artist.images}
            altTitle={artist.name}
            subheading="Artist"
            type="artists"
          />
        </div>
      ))}
      <div className="h-full p-4">
        <a
          href={`https://open.spotify.com/`}
          target="_blank"
          className="flex flex-row w-full h-full col-span-12 items-center justify-center py-4 gap-2 font-medium bg-zinc-800 rounded hover:invert duration-200 "
        >
          <Image
            className="object-contain w-6 h-6 rounded"
            width={20}
            
            src={SpotifyPrimaryImage}
            alt={"Open Spotify"}
          />
          <p>Open Spotify</p>
        </a>
      </div>
    </CardItemGrid>
  );
}
