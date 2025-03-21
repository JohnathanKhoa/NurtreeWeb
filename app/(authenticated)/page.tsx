import AlbumCards from "@/components/spotify/AlbumCards";
import ArtistCards from "@/components/spotify/ArtistCards";
import Image from "next/image";
import { Heading, Subheading } from "@/components/heading";
import { Divider } from "@/components/divider";
import {
  getArtistTopTrack,
  getMe,
  getNewReleases,
  getTopItems,
  getTotalPlaylists,
  getUserAllPlaylists,
  getUserLikedPlaylists,
  getYoutubeVideoDamon,
} from "@/lib/actions";
import { Artist, Damon2Items, Playlist, Track, User } from "@/types/types";
import { getAuthSession } from "@/util/serverUtils";
import { redirect } from "next/navigation";
import VideoCarousel from "@/components/spotify/VideoCarousel";
import getRandomNumbers from "@/components/Random";
import TrackCards from "@/components/spotify/TrackCards";
import ArtistCarousel from "@/components/spotify/ArtistCarousel";
import TrackCarousel from "@/components/spotify/TrackCarousel";
import { it } from "node:test";
import PlaylistCards from "@/components/spotify/PlaylistCards";
import { getGreeting } from "@/util/clientUtils";

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
    limit: 50,
    type: "tracks",
  }).then((data) => data.items)) as Track[];

  const currentUser = (await getMe({
    session,
  }).then((data) => data)) as User;

  const [playlists] = await Promise.all([
    getUserAllPlaylists(session, 100),
    //getUserLikedSongs(session).then((data) => data.total),
  ]);
  // const mostPopular = topTracks.filter(item => item.popularity >= 84)
  //   .map((item) => item) as Track[];
  //   console.log(mostPopular)

  const topArtists = (await getTopItems({
    session,
    limit: 50,
    type: "artists",
  }).then((data) => data.items)) as Artist[];

  const newReleases = await getNewReleases(session);

  // const mostPopular:Track[] = [];
  // topTracks.filter((item) => {
  //   item.popularity >= 70;
  // }).map((item) => mostPopular.push(item)) ;

  const youtubeVideo: Damon2Items[] = [];
  // const videoTrack: Track[] = [];
  //   for (let i = 0; i < mostPopular.length; i++){
  //     const result = await getYoutubeVideoDamon(session, mostPopular[i])
  //     youtubeVideo.push(result);
  //     videoTrack.push(mostPopular[i]);
  //   }

  const min = 0;
  const max = topArtists.length - 1;
  const count = 3;
  const randomNumbers = getRandomNumbers(0, topArtists.length - 1, 3);

  const randomTracks: Track[] = [];
  const randomSuggestions: Track[] = [];
  const randomArtists: Artist[] = [];

  for (let i = 0; i < count; i++) {
    randomArtists.push(topArtists[randomNumbers[i]]);

    // const result = await getYoutubeVideoDamon(session, topTracks[randomNumbers[0]]);
    // youtubeVideo.push(result);
    // randomTracks.push(topTracks[randomNumbers[0]]);
  }

  for (let i = 0; i < randomArtists.length; i++) {
    const topResult = await getArtistTopTrack(session, randomArtists[i].id);
    const randomTopTrack = getRandomNumbers(0, 2, 1);
    const video = await getYoutubeVideoDamon(
      session,
      topResult[0].tracks[randomTopTrack[0]]
    );
    randomTracks.push(topResult[0].tracks[randomTopTrack[0]]);

    youtubeVideo.push(video);
  }

  for (let i = 0; i < 9; i++) {
    const randomNumbers = getRandomNumbers(min, max, count);
    randomSuggestions.push(topTracks[randomNumbers[0]]);
  }
  // const total = await getTotalPlaylists(session);
  // const publicPlaylists: Playlist[] = [];
  // const total = await getTotalPlaylists(session);

  // let offset = 0;
  // let limit = 50;
  // while (offset < total){
  //   let playlists: Playlist[] = await getUserLikedPlaylists(session, offset, limit);
  //   playlists
  //     .filter((item: any) => item.public === true)
  //     .map((item: any) => publicPlaylists.push(item));
  //     if (offset + limit > total){
  //       offset = offset + total - limit - 1;
  //     } else {
  //       offset = offset + limit;
  //     }
  // }
  // console.log('Length' + publicPlaylists.length)
  // console.log(publicPlaylists)
  const user = session.user;

  return (
    <section className="flex flex-col items-center">
      <Heading>
        Good {getGreeting()}, {user.name}
      </Heading>

      {/* <h1 className="mb-5 text-xl font-bold">Greetings, {session?.user.name}!</h1> */}
      {/* <h1 className="flex items-center gap-3 px-2 my-1 text-gray">
      Choose a playlist from your library <MenuIcon className="md:flex hidden" height={25} /> to get the top music video for each track
      </h1>  */}
      {/* <h1 className="font-bold underline">Top music videos for you</h1> */}
      <div className="">
        <VideoCarousel
          user={currentUser.id}
          playlists={playlists}
          topTracks={randomTracks}
          youtubeVideo={youtubeVideo}
        />
      </div>
      <Divider className="" />
      {/* <div className="pt-4 flex flex-row w-full items-center justify-center gap-6 border-t-2">
      
      <div className="flex flex-row items-center justify-center gap-6">
      <div className="flex flex-shrink h-20 w-20 md:max-w-100 md:max-h-100">
      <Image
          src={currentUser.images[0].url}
          alt={currentUser.display_name}
          height={200}
          width={200}
          className={`aspect-square object-scale-down ${"rounded-full"
          }`}
        />
      </div> 
      <div className="items-center justify-center">
      <h1 className="text-lg font-bold">{session?.user.name}</h1>
      <div className="text-sm">Total Playlists: {total}</div>
      <div className="text-sm">Followers: {currentUser.followers.total}</div>
      
      </div>
      </div>
      
      </div> */}
      {/* <div className="flex h-1/2 w-1/2 items-center justify-center">
        <PlaylistCards playlists={publicPlaylists}/>
      </div> */}
      <div className="flex w-1/2 items-center justify-center">
        <ArtistCarousel artists={topArtists} />
      </div>
      <div className="my-16 flex  w-1/2 items-center justify-center">
        <TrackCarousel tracks={randomSuggestions} />
      </div>

      {/* <h1 className="mt-4 flex items-center justify-center w-screen ">Your favorite artists</h1> */}

      {/* <h1 className="mt-4 flex items-center justify-center w-screen ">Your favorite tracks</h1> */}
    </section>
  );
}
