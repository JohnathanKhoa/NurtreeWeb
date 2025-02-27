import AlbumCards from "@/components/spotify/AlbumCards";
import ArtistCards from "@/components/spotify/ArtistCards";
import TrackCards from "@/components/spotify/TrackCards";
import {
  getNewReleases,
  getRecentlyPlayedTracks,
  getTopItems,
  getYoutubeVideoDamon,
} from "@/lib/actions";
import { Artist, AuthSession, Damon2Items, Track } from "@/types/types";
import { getAuthSession } from "@/util/serverUtils";
import { MenuIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { Carousel } from "flowbite-react";
import Video from "@/components/spotify/Video";
import type { CustomFlowbiteTheme } from "flowbite-react";
import Image from "next/image";
import VideoCarousel from "@/components/spotify/VideoCarousel";

const customTheme: CustomFlowbiteTheme["carousel"] = {
  root: {
    base: "block place-content-center w-full flex flex-wrap",
    leftControl: "flex w-1/2 place-content-left left-0 top-2/3 items-center justify-center  ",
    rightControl: "flex w-1/2 place-content-right right-0 top-2/3 items-center justify-center "
  },
  indicators: {
    active: {
      off: " bg-white/50 hover:bg-white  dark:hover:bg-gray-800",
      on: "bg-white dark:bg-gray-800",
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
    base: "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-lg",
    snap: "snap-x"
  }
};

const customButtonTheme: CustomFlowbiteTheme = {
  button: {
    color: {
      primary: "bg-red-500 hover:bg-red-600",
    },
  },
};

export const metadata = {
  title: "Nurtree",
  description: "A blend of Spotify and Youtube",
};

export default async function Home() {
  const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }

  const recentlyPlayed = (await getRecentlyPlayedTracks(session, 10).then(
    (data) => data.items.map((item: any) => item.track)
  )) as Track[];

  const topTracks = (await getTopItems({
    session,
    limit: 4,
    type: "tracks",
  }).then((data) => data.items)) as Track[];

  const allTimeTopTracks = (await getTopItems({
    session,
    limit: 10,
    timeRange: "long_term",
    type: "tracks",
  }).then((data) => data.items)) as Track[];

  const topArtists = (await getTopItems({
    session,
    limit: 10,
    type: "artists",
  }).then((data) => data.items)) as Artist[];

  const newReleases = await getNewReleases(session);
  //let youtubeVideo = await getYoutubeVideoDamon(session, topTracks[0]);

  // async function handleIndex (
  //   session: AuthSession,
  //   index: number,
  // ){
  //   const result = await getYoutubeVideoDamon(session, topTracks[index]);
  //   youtubeVideo = result;
  // };

     const youtubeVideo: Damon2Items[] = [];

  
     for (let i = 0; i < topTracks.length; i++){
       const result = await getYoutubeVideoDamon(session, topTracks[i]);
       youtubeVideo.push(result);
     }

  return (

    <section className="flex flex-col items-center">
      {/* <h1 className="mb-5 text-xl font-bold">Greetings, {session?.user.name}!</h1> */}
      {/* <h1 className="flex items-center gap-3 px-2 my-1 text-gray">
      Choose a playlist from your library <MenuIcon className="md:flex hidden" height={25} /> to get the top music video for each track
      </h1>  */}
      {/* <h1 className="font-bold underline">Top music videos for you</h1> */}
    <VideoCarousel topTracks={topTracks} youtubeVideo={youtubeVideo}/>
      
      <h1 className="mt-4 flex items-center justify-center w-screen border-t-2">Your favorite artists</h1>
      <div className="h-full w-full">
      <ArtistCards artists={topArtists} />
      </div>


      <h1 className="mt-4 flex items-center justify-center w-screen border-t-2">New releases for you</h1>
      <AlbumCards albums={newReleases} />
      
    </section>
  );
}
