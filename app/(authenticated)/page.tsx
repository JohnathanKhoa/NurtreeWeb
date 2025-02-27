import AlbumCards from "@/components/spotify/AlbumCards";
import ArtistCards from "@/components/spotify/ArtistCards";
import {
  getNewReleases,
  getTopItems,
  getYoutubeVideoDamon,
} from "@/lib/actions";
import { Artist, Damon2Items, Track } from "@/types/types";
import { getAuthSession } from "@/util/serverUtils";
import { redirect } from "next/navigation";
import VideoCarousel from "@/components/spotify/VideoCarousel";
import getRandomNumbers from "@/components/Random";

interface Props {
  params: Promise<{
    index?: string;
  }>;
}

export const metadata = {
  title: "Nurtree",
  description: "A blend of Spotify and Youtube",
};

export default async function Home({ params }: Props) {
  const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }
  let index;
  const param = (await params);
  if (param.index !== undefined){
    index = Number(param.index);
  }
   index = 0;

  const topTracks = (await getTopItems({
    session,
    limit: 20,
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
    //let youtubeVideo = await getYoutubeVideoDamon(session, topTracks[index]);
    //let id = youtubeVideo.id;
    
    
    // Example usage
    const min = 0;
    const max = topTracks.length-1;
    const count = 1;
    
    
    
      const youtubeVideo: Damon2Items[] = [];
      const randomTracks: Track[] = [];
  
      for (let i = 0; i < 3; i++){
        const randomNumbers = getRandomNumbers(min, max, count);
        const result = await getYoutubeVideoDamon(session, topTracks[randomNumbers[0]]);
        youtubeVideo.push(result);
        randomTracks.push(topTracks[randomNumbers[0]]);
      }

  // async function handleClick(index) {
  //   youtubeVideo = await getYoutubeVideoDamon(session, topTracks[index]);
  //   id = youtubeVideo.id;
  // }

  return (

    <section className="flex flex-col items-center">
      {/* <h1 className="mb-5 text-xl font-bold">Greetings, {session?.user.name}!</h1> */}
      {/* <h1 className="flex items-center gap-3 px-2 my-1 text-gray">
      Choose a playlist from your library <MenuIcon className="md:flex hidden" height={25} /> to get the top music video for each track
      </h1>  */}
      {/* <h1 className="font-bold underline">Top music videos for you</h1> */}
    <VideoCarousel topTracks={randomTracks} youtubeVideo={youtubeVideo} i={index} />
      
      <h1 className="mt-4 flex items-center justify-center w-screen border-t-2">Your favorite artists</h1>
      <div className="h-full w-full">
      <ArtistCards artists={topArtists} />
      </div>


      <h1 className="mt-4 flex items-center justify-center w-screen border-t-2">New releases for you</h1>
      <AlbumCards albums={newReleases} />
      
    </section>
  );
}
