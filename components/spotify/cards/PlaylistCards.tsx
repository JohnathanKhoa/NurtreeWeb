import { Playlist } from "@/types/types";
import CardItem from "./CardItem";
import CardItemGrid from "./CardItemGrid";
import Image from "next/image";
import SpotifyPrimaryImage from "@/public/images/Spotify_Primary_Logo_RGB_White.png";

interface Props {
  playlists: Playlist[];
}

export default function PlaylistCards({ playlists }: Props) {
  return (
    <CardItemGrid>
      {playlists?.map((playlist) => {
        if (!playlist) {
          return null;
        }
        return (
          <CardItem
            key={playlist.id}
            id={playlist.id}
            heading={playlist.name}
            subheading={playlist.description}
            altTitle={playlist.name}
            images={playlist.images}
            type="playlists"
          />
        );
      })}
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
