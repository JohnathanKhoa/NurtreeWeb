import { Artist } from "@/types/types";
import CardItem from "./CardItem";
import CardItemGrid from "./CardItemGrid";
import SpotifyIcon from "../SpotifyIcon";

interface Props {
  artists: Artist[];
}

export default function ArtistCards({ artists }: Props) {
  return (
    <CardItemGrid>
      {artists?.map((artist) => (
        <CardItem
          key={artist.id}
          id={artist.id}
          heading={artist.name}
          images={artist.images}
          altTitle={artist.name}
          subheading="Artist"
          type="artists"
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
  );
}
