'use client'
import { Track, Playlist } from "@/types/types";
import { useState } from "react";
import TracksTable from "./TracksTable";
import Video from "./Video";
import Image from "next/image";
import { Music, Dot } from "lucide-react";
import parse from "html-react-parser";
import styles from "@/styles/Description.module.css";
import { Vibrant } from "node-vibrant/browser";
import { MdPlayArrow } from "react-icons/md";
import {Wave} from "@foobar404/wave";
interface Props {
  tracks: Track[];
  track: string;
  playlist: Playlist
  index: number;
  playlists: Playlist[];
  user: string;
}


export default function IndexContainer({
  playlist,
  tracks,
  track,
  index,
  playlists,
  user
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  let v = new Vibrant(playlist.images[0].url);



  return (
    <>
      <div className="flex flex-col ">
          <div className="sticky h-1/3 aspect-video top-1/5 max-h-[1048px] ">
              {<Video tracksLength={tracks.length} id={track} index={index} currentIndex={setCurrentIndex} play={1}/>}
          
          </div>
        <div className="flex flex-col md:flex-row gap-6 m-4">
      {playlist && (
        <>
        <div className="flex items-center gap-6 md:m-4">
          {playlist.images.length > 0 ? (
            <Image
              src={playlist.images[0].url}
              alt={playlist.name}
              height={240}
              width={240}
              className="shadow-2xl object-contain rounded-3xl md:w-40 w-20 md:h-40 h-20"
              priority
            />
          ) : (
            <div className="w-full h-40">
              <Music size={160} className="w-full h-full bg-paper " />
            </div>
          )}

          <div className="visible flex flex-col ">
            <h5 className="text-xs font-bold uppercase shadow-2xl">Spotify {playlist.type}</h5>
            <h2 className="md:text-4xl text-xl font-bold">{playlist.name}</h2>

            {playlist.description && (
              <p className={styles.description + " font-medium mt-3"}>
                {parse(playlist.description)}
              </p>
            )}

            <div className="md:flex hidden items-center md:font-semibold md:text-sm text-xs ">
              <span>{playlist.owner?.display_name}</span>
              {playlist.followers.total > 0 && (
                <>
                  <Dot />
                  <span>
                    {playlist.followers.total.toLocaleString()}{" "}
                    {playlist.followers.total > 1 ? "likes" : "like"}
                  </span>
                </>
              )}
              {playlist.tracks.items.length > 0 && (
                <>
                  <Dot />
                  <span>{playlist.tracks.total.toLocaleString()} songs</span>
                </>
              )}
            </div>
            </div>
            {/* <div className="md:flex hidden self-center gap-6 m-4"><MdPlayArrow size={50}/></div> */}
          </div>
          <div id="#canvasElmId" className="flex">

          </div>
          
          <div className="flex md:justify-center items-center gap-6 md:m-4">
          
          {
            <Image
            src={tracks[index].album?.images[0].url}
            alt={playlist.name}
            height={250}
            width={250}
            className="self-center shadow-2xl object-contain rounded-3xl md:w-40 w-20 md:h-40 h-20"
            priority
            />}
          <div className="md:flex flex-col">
          <h5 className="text-xs font-bold uppercase shadow-2xl">Currently Playing</h5>
          <h2 className="md:text-4xl text-xl font-bold">{tracks[index].name}</h2>
          <h1> {tracks[index].artists.map((artist, index) => (
                          <a
                            key={artist.id}
                            className="text-xs md:text-sm md:font-semibold"
                          >
                            {index !== 0 ? `, ${artist.name}` : artist.name}
                          </a>
                        ))}</h1>
                        
           </div>
          </div>
        </>
      )}
    </div>
        <div className="relative w-full overflow-auto scrollbar-hide">
          <TracksTable
              tracks={tracks}
              showAlbum
              showCover
              showHeader
              showSubtitle
              i={index}
              playlists={playlists}
              currentIndex={setCurrentIndex}
              trackIndex={currentIndex}
              user={user}
          />
        </div>
      </div>
    </>
  )
}