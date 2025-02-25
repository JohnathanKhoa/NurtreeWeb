import AlbumCards from "@/components/spotify/AlbumCards";
import ArtistCards from "@/components/spotify/ArtistCards";
import TrackCards from "@/components/spotify/TrackCards";
import {
  getNewReleases,
  getRecentlyPlayedTracks,
  getTopItems,
} from "@/lib/actions";
import { Artist, Track } from "@/types/types";
import { getAuthSession } from "@/util/serverUtils";
import { MenuIcon } from "lucide-react";
import { redirect } from "next/navigation";


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
    limit: 10,
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


  return (

    <section className="flex flex-col items-center">
      <h1 className="mb-5 text-3xl font-bold">Hello, {session?.user.name}!</h1>
      <h1 className="flex items-center gap-3 px-2 my-1 text-gray">
      Choose a playlist from your library <MenuIcon className="md:flex hidden" height={25} /> to get the top music video for each track
      </h1> 

      <h1 className="my-5 mt-16 text-3xl font-bold">Your Spotify Statistics</h1>
      <h1 className="mt-16">Top Artists this month</h1>
      <ArtistCards artists={topArtists} />

      
      <h1 className="">Top Tracks this month</h1>
      <TrackCards tracks={topTracks} />


      <h1 className="mt-16">New releases for you</h1>
      <AlbumCards albums={newReleases} />
      
    </section>
  );
}
