import { Album } from "@/types/types";
import CardItem from "./CardItem";
import CardItemGrid from "./CardItemGrid";
import SpotifyIcon from "../SpotifyIcon";

interface Props {
  albums: Album[];
}

export default function AlbumCards({ albums }: Props) {
  return (
    <>
      <CardItemGrid>
        {albums?.map((album) => (
          <CardItem
            key={album.id}
            id={album.id}
            heading={album.name}
            subheading={album.artists[0].name}
            altTitle={album.name}
            images={album.images}
            type="albums"
          />
        ))}
        <div className="p-4 h-full">
          <a
            href="https://open.spotify.com/"
            target="_blank"
            className="flex h-full w-full items-center justify-center gap-2 rounded bg-zinc-800 py-4 font-medium hover:invert duration-200"
          >
            <SpotifyIcon />
            <p>Open Spotify</p>
          </a>
        </div>
      </CardItemGrid>
    </>
  );
}
