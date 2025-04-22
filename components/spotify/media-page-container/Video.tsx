"use client";
import { redirect } from "next/navigation";
import YouTube from "react-youtube";

interface Props {
  tracksLength: number;
  index: number;
  id: string;
  play: number;
}

export default function Video({ tracksLength, index, id, play }: Props) {
  const handleVideoEnd = () =>
    play === 1
      ? redirect(`${index + 1 >= tracksLength ? 0 : index + 1}`)
      : undefined;

  return (
    <div className="flex justify-center">
      <YouTube
        videoId={id}
        className="absolute size-full content-center"
        onEnd={handleVideoEnd}
        opts={{
          width: "100%",
          height: "100%",
          title: { id },
          playerVars: {
            autoplay: play,
            controls: 1,
            cc_load_policy: 0,
            fs: 1,
            iv_load_policy: 0,
            playsinline: 1,
          },
        }}
      />
    </div>
  );
}
