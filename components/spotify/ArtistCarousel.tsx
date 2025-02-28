"use client"
import { Carousel } from "flowbite-react";
import Video from "./Video";
import Image from "next/image";
import type { CustomFlowbiteTheme } from "flowbite-react";
import { Artist, Damon2Items, Track } from "@/types/types";
import CardItem from "./CardItem";



interface Props {
    artists: Artist[]
    
    
  }

  const customTheme: CustomFlowbiteTheme["carousel"] = {
    root: {
      base: "block place-content-center w-full flex flex-wrap",
      leftControl: "flex w-1/2 place-content-left left-0 top-2/3 items-center justify-center  ",
      rightControl: "flex w-1/2 place-content-right right-0 top-2/3 items-center justify-center  "
    },
    indicators: {
      active: {
        off: "invisible bg-white/50 hover:bg-white  dark:hover:bg-gray-800",
        on: "invisible bg-white dark:bg-gray-800",
      },
      wrapper: "flex w-full bot-1/2 place-content-center  flex  space-x-3"
    },
    
    item: {
      base: "left-1/2 block w-full  ",
      wrapper: {
        on: "w-full flex-shrink-0 transform cursor-grab snap-center",
        off: "w-full flex-shrink-0 transform cursor-grab snap-center",
      }
    },
    scrollContainer: {
      base: "flex w-screen h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-lg",
      snap: "snap-x"
    }
  };
  
  

export default function ArtistCarousel({ artists }: Props) {
  let keycount = 0;
    return(
        <div className="flex flex-col w-full items-center">
            <div className="flex flex-col w-screen p-4 md:w-1/2">
              <Carousel slide={true} theme={customTheme} >
                
                {artists?.map((artist) => (
                        <div key={keycount++}>
                        <CardItem
                          key={artist.id}
                          id={artist.id}
                          heading={artist.name}
                          images={artist.images}
                          altTitle={artist.name}
                          subheading="Artist"
                          type="artists"
                          imageRounded
                        />
                        </div>
                      ))}
                
              </Carousel>
              </div>
              </div>

    )
}