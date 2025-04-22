import { Track } from "@/types/types";

interface Props {
  track: Track;
}

export default function DescriptionBar({ track }: Props) {
  return (
    <div className="flex md:justify-center items-center gap-6">
      <iframe
        className="w-full"
        src={`https://open.spotify.com/embed/track/${track.id}?utm_source=generator&theme=0`}
        width="100%"
        height="152"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  );
}
