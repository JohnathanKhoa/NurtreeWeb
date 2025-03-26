import { Artist, Track } from "@/types/types";
import Image from "next/image";

interface Props {
  artist: Artist;
  track: Track;
}

export default function DescriptionBar({ track, artist }: Props) {
  return (
    <>
      {/* <Image src={artist.images[1].url} alt={artist.name} quality={100} height={1920} width={1920} className=""/> */}
      <div className="flex md:justify-center items-center gap-6 ">
        <div id="embed-iframe"></div>

        {
          <Image
            src={track.album?.images[0].url}
            alt={track.name}
            height={250}
            width={250}
            className="self-center shadow-2xl object-contain rounded-3xl  w-20 h-20"
            priority
          />
        }
        <div className="md:flex flex-col gap-3">
          <h2 className="md:text-4xl text-xl font-bold">{track.name}</h2>
          <h1>
            {" "}
            {track.artists.map((artist, index) => (
              <a
                key={artist.id}
                className="text-xs md:text-sm md:font-semibold"
              >
                {index !== 0 ? `, ${artist.name}` : artist.name}
              </a>
            ))}
          </h1>
          <div id="embed-iframe"></div>

        </div>
      </div>
    </>
  );
}
