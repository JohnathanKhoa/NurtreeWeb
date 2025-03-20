"use client";
import { Carousel } from "flowbite-react";
import Video from "./Video";
import Image from "next/image";
import type { CustomFlowbiteTheme } from "flowbite-react";
import { Damon2Items, Playlist, Track } from "@/types/types";
import { useState } from "react";
import AddButton from "./AddButton";

interface Props {
  topTracks: Track[];
  youtubeVideo: Damon2Items[];
  user: string;
  playlists: Playlist[];
}

const customTheme: CustomFlowbiteTheme["carousel"] = {
  root: {
    base: " block  w-full flex flex-col  ",
    leftControl: "hidden",
    rightControl: "hidden",
  },
  indicators: {
    active: {
      off: " bg-white/50 hover:bg-white  dark:hover:bg-gray-800",
      on: " bg-white dark:bg-gray-800",
    },
    wrapper: "pt-4 flex w-full bot-1/2 place-content-center  flex   space-x-3",
  },

  item: {
    base: " block w-full  ",
    wrapper: {
      on: "w-full flex-shrink-0 transform cursor-grab snap-center",
      off: "w-full flex-shrink-0 transform cursor-grab snap-center",
    },
  },
  scrollContainer: {
    base: "block flex  h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-lg",
    snap: "snap-x",
  },
};

export default function VideoCarousel({
  topTracks,
  youtubeVideo,
  user,
  playlists,
}: Props) {
  const [slideState, setSlideState] = useState(true);
  let keycount = 0;
  return (
    <div className="relative flex max-w-[720px]">
      <Carousel slide={slideState} theme={customTheme}>
        {topTracks?.map((track, index) => (
          <div key={keycount++}>
            <div className="sticky w-full aspect-video max-h-[450px] ">
              {
                <Video
                  setSlideState={setSlideState}
                  tracksLength={0}
                  id={youtubeVideo[index].id}
                  index={0}
                  play={0}
                />
              }
            </div>
            <div className="flex justify-center items-center gap-6 mt-2">
              {
                <Image
                  src={topTracks[index].album?.images[0].url}
                  alt={topTracks[index].name}
                  height={250}
                  width={250}
                  className="self-center shadow-2xl object-contain rounded-3xl md:w-40 w-20 md:h-40 h-20"
                  priority
                />
              }
              <div className="md:flex flex-col gap-3">
                <h5 className="text-xs font-bold uppercase shadow-2xl">
                  Top Tracks For You
                </h5>
                <h2 className="md:text-4xl text-xl font-bold">
                  {topTracks[index].name}
                </h2>
                <h1>
                  {" "}
                  {topTracks[index].artists.map((artist, index) => (
                    <a
                      key={artist.id}
                      className="text-xs md:text-sm md:font-semibold"
                    >
                      {index !== 0 ? `, ${artist.name}` : artist.name}
                    </a>
                  ))}
                </h1>
                <div>
                  <div className="absolute right-0 -translate-y-11">
                    <AddButton
                      user={user}
                      trackId={track.id}
                      playlists={playlists}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
