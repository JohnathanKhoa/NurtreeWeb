import { Playlist } from "@/types/types";
import CardItem from "./CardItem";
import CardItemGrid from "./CardItemGrid";
import SpotifyIcon from "../SpotifyIcon";

interface Props {
  playlists: Playlist[];
}

export default function PlaylistCards({ playlists }: Props) {
  return (
    <CardItemGrid>
      {playlists?.map(
        (playlist) =>
          playlist && (
            <CardItem
              key={playlist.id}
              id={playlist.id}
              heading={playlist.name}
              subheading={playlist.description}
              altTitle={playlist.name}
              images={playlist.images}
              type="playlists"
            />
          )
      )}
      <div className="h-full p-4">
        <a
          href="https://open.spotify.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full h-full gap-2 py-4 font-medium bg-zinc-800 rounded hover:invert duration-200"
        >
          <SpotifyIcon />
          <p>Open Spotify</p>
        </a>
      </div>
    </CardItemGrid>
  );
}
