"use client";
import { Track, Playlist, Artist } from "@/types/types";
import { useState } from "react";
import TracksTable from "./TracksTable";
import Video from "./Video";
import DescriptionBar from "./DescriptionBar";
import PlaylistBar from "./PlaylistBar";
interface Props {
  tracks: Track[];
  track: string;
  playlist: Playlist;
  index: number;
}

export default function IndexContainer({
  playlist,
  tracks,
  track,
  index,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  // const [tableIsOpen, setTableIsOpen] = useState<boolean | null>(false);

  return (
    <>
      <div className="flex flex-col  bg-[#1f1f1f]">
        <div className="relative h-1/3 aspect-video  xl:max-h-[650px] 2xl:max-h-[1048px] ">
          {
            <Video
              tracksLength={tracks.length}
              id={track}
              index={index}
              play={1}
            />
          }
        </div>
        <div className="flex flex-col overflow-y-auto gap-6 bg-[#1f1f1f] ">
          {playlist && (
            <>
              <div className="sticky top-0">
                <DescriptionBar track={tracks[index]} />
                <PlaylistBar playlist={playlist} />
              </div>
            </>
          )}
        </div>
        {/* <div className={`${tableIsOpen ? "" : "bottom-0"} flex justify-center`}>
        <div className="">
          <button className="flex" onClick={() => setTableIsOpen(!tableIsOpen)}>
            {tableIsOpen ? <ArrowBigDownDash /> : <ArrowBigUpDash />}
          </button>
        </div>
      </div> */}
        {/* <div className={`${tableIsOpen ? "visible" : "hidden"}`}> */}
        <div className="relative w-full  bg-[#1f1f1f]">
          <TracksTable
            tracks={tracks}
            showAlbum
            showCover
            showHeader
            showSubtitle
            i={index}
            currentIndex={setCurrentIndex}
            trackIndex={currentIndex}
          />
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
