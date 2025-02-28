"use client"
import { Carousel } from "flowbite-react";
import Video from "./Video";
import Image from "next/image";
import type { CustomFlowbiteTheme } from "flowbite-react";
import { Artist, Damon2Items, Track } from "@/types/types";
import CardItem from "./CardItem";
import Link from "next/link";
import { Music } from "lucide-react";



interface Props {
    tracks: Track[];
    
    
  }

  const customTheme: CustomFlowbiteTheme["carousel"] = {
    root: {
      base: "block place-content-center w-full flex flex-wrap",
      leftControl: "flex w-1/2 place-content-left left-0 top-2/3 items-center justify-center  ",
      rightControl: "flex w-1/2 place-content-right right-0 top-2/3 items-center justify-center "
    },
    indicators: {
      active: {
        off: "invisible bg-white/50 hover:bg-white  dark:hover:bg-gray-800",
        on: "invisible bg-white dark:bg-gray-800",
      },
      wrapper: "flex w-full bot-1/2 place-content-center  flex  space-x-3"
    },
    
    item: {
      base: " block w-full  ",
      wrapper: {
        on: "w-full flex-shrink-0 transform cursor-grab snap-center",
        off: "w-full flex-shrink-0 transform cursor-grab snap-center",
      }
    },
    scrollContainer: {
      base: "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-lg",
      snap: "snap-x"
    }
  };
  
  

export default function TrackCarousel({ tracks }: Props) {
  let keycount = 0;
    return(
        <div className="">
            <div className=" ">
              <Carousel slide={true} theme={customTheme} >
                
              {tracks?.map((track: Track) => {
        if (!track) {
          return null;
        }
        return (
          <Link className="cursor-pointer place-content-center w-full flex" key={track.id} href={`/tracks/${track.id}/0`}>
            <div className=" transition duration-300 bg-paper-500 hover:opacity-80">
              <div className="">
                {track.album.images.length > 0 ? (
                  <Image
                    src={track.album.images[0].url}
                    alt={track.name}
                    height={350}
                    width={350}
                    className="  rounded-md aspect-square"
                  />
                ) : (
                  <div className="w-full h-40">
                    <Music className="w-full h-full bg-paper " />
                  </div>
                )}
              </div>
              <h3 className="mt-5 text-center font-bold truncate">{track.name}</h3>
              <h6 className="mt-1 text-center text-xs font-semibold truncate text-gray">
                {track.artists[0].name}
              </h6>
            </div>
          </Link>
        );
      })}
                
              </Carousel>
              </div>
              </div>

    )
}