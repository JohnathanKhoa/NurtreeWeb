import { Playlist } from "@/types/types";
import Image from "next/image";

interface Props {
  playlist: Playlist;
}

export default function PlaylistBar({ playlist }: Props) {
  return (
    <>
      <div className="flex md:justify-start items-center gap-6 mx-4  ">
        <Image
          className="rounded-md"
          src={playlist.images[0].url}
          alt={""}
          width={50}
          height={50}
        />
        <div className="flex flex-col gap-1">
          <h6 className={`text-sm text-white`}>{playlist.name}</h6>
          <p className={`text-xs text-zinc-400`}>{playlist.description}</p>
          <p className={`text-xs text-zinc-400`}>
            {playlist.owner.display_name}
          </p>
        </div>
      </div>
    </>
  );
}
