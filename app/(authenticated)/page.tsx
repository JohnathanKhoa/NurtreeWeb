import AlbumCards from "@/components/spotify/AlbumCards";
import ArtistCards from "@/components/spotify/ArtistCards";
import Image from "next/image";
import {
  getMe,
  getNewReleases,
  getTopItems,
  getYoutubeVideoDamon,
} from "@/lib/actions";
import { Artist, Damon2Items, Track, User } from "@/types/types";
import { getAuthSession } from "@/util/serverUtils";
import { redirect } from "next/navigation";
import VideoCarousel from "@/components/spotify/VideoCarousel";
import getRandomNumbers from "@/components/Random";



export const metadata = {
  title: "Nurtree",
  description: "A blend of Spotify and Youtube",
};

export default async function Home() {
  const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }
  
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

  const currentUser = (await getMe({
    session,
  }).then((data) => data)) as User;
  
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
    <VideoCarousel topTracks={randomTracks} youtubeVideo={youtubeVideo}  />
      {/* <h1 className="mb-5 text-xl font-bold">Greetings, {session?.user.name}!</h1>
      <div className="flex flex-shrink max-w-50 max-h-50">
      <Image
          src={currentUser.images[0].url}
          alt={currentUser.display_name}
          height={500}
          width={500}
          className={`aspect-square object-scale-down ${"rounded-full"
          }`}
        />
      </div> */}
      <h1 className="mt-4 flex items-center justify-center w-screen border-t-2">Your favorite artists</h1>
      <div className="h-full w-full">
      <ArtistCards artists={topArtists} />
      </div>


      <h1 className="mt-4 flex items-center justify-center w-screen border-t-2">New releases for you</h1>
      {/* <AlbumCards albums={newReleases} /> */}
      
    </section>
  );
}
