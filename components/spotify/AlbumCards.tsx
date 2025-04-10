import { Album } from "@/types/types";
import CardItem from "./CardItem";
import Image from "next/image";
import SpotifyPrimaryImage from "@/public/images/Spotify_Primary_Logo_RGB_White.png"; // Adjust the path as needed
import CardItemGrid from "./CardItemGrid";

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
        <div className="h-full p-4">
          <a
            href={`https://open.spotify.com/`}
            target="_blank"
            className="flex flex-row w-full h-full col-span-12 items-center justify-center gap-2 font-medium bg-zinc-800 rounded hover:invert duration-200 py-4"
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
    </>
  );
}
