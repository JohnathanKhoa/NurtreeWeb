import { Artist, Track } from "@/types/types";
import { Spotify } from "react-spotify-embed";

interface Props {
  artist: Artist;
  track: Track;
}

export default function DescriptionBar({ track, artist }: Props) {
  return (
    <>
      {/* <Image src={artist.images[1].url} alt={artist.name} quality={100} height={1920} width={1920} className=""/> */}
      <div className="flex md:justify-center items-center gap-6 ">
        {/* {
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
          
        </div> */}
        {/* `https://open.spotify.com/embed/track/${track.id}?utm_source=generator&theme=0` */}
        <iframe
          className="w-full "
          src={`https://open.spotify.com/embed/track/${track.id}?utm_source=generator&theme=0`}
          // src="https://open.spotify.com/embed/track/5D1QJgn1rP8docnVY6MRJ9?utm_source=generator&theme=0"
          width="100%"
          height="152"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
        {/* <iframe
          className="fixed  w-full rounded-none"
          src={`https://open.spotify.com/embed/track/${track.id}?utm_source=generator`}
          // src="https://open.spotify.com/embed/track/5D1QJgn1rP8docnVY6MRJ9?utm_source=generator&theme=0"
          width="100%"
          height="152"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe> */}
        {/* <Spotify
          className="fixed z-10 w-full bg-transparent opacity-0 hover:opacity-100 duration-300"
          width="100%"
          height={152}
          theme={0}
          view="coverart"
          link={`https://open.spotify.com/track/${track.id}`}
        />  */}
      </div>
    </>
  );
}
