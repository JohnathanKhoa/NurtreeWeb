import {
  getMe,
  getPlaylistById,
  getRecentlyPlayedTracks,
  getTopItems,
  getUserAllPlaylists,
} from "@/lib/actions";
import { Artist, Playlist, Track, User } from "@/types/types";
import { getAuthSession } from "@/util/serverUtils";
import { redirect } from "next/navigation";
import Blur from "@/components/spotify/Blur";
import CardItem from "@/components/spotify/cards/CardItem";
import ArtistCards from "@/components/spotify/cards/ArtistCards";
import PlaylistCards from "@/components/spotify/cards/PlaylistCards";

export async function generateMetadata() {
  const session = await getAuthSession();
  if (!session) {
    return {
      title: "Error in loading track data",
    };
  }

  return {
    title: "Nurtree - Powered by Spotify",
    description: "A blend of Spotify and Youtube",
  };
}

export default async function Home() {
  const session = await getAuthSession();
  if (!session) {
    redirect("/login");
  }
  const res = await getUserAllPlaylists(session, 20);
  if (res.length > 0 || res != null) {
    return (
      <>
        <section className="flex flex-col items-center">
          {/* <Blur img={currentUser.images[0].url} /> */}
          <h1 className="mt-16">Recent Playlists</h1>
          <PlaylistCards playlists={res} />
          {/* <div className="flex flex-row w-full h-full place-content-center justify-items-center ">
            <div className="fixed md:translate-y-1/2">
              <div className="">
                <CardItem
                  key={nurtreePlaylist.id}
                  id={nurtreePlaylist.id}
                  heading={nurtreePlaylist.name}
                  subheading={nurtreePlaylist.description}
                  altTitle={nurtreePlaylist.name}
                  images={nurtreePlaylist.images}
                  type="playlists"
                />
              </div>
            </div>
          </div> */}
        </section>
      </>
    );
  } else {
    return (
      <div className="flex flex-col items-center">
        No playlists found. Try creating some playlists!
      </div>
    )
  }

  return (
    <>
      <section className="flex flex-col items-center">
        {/* <Blur img={currentUser.images[0].url} /> */}
        <h1 className="mt-16">Recent Playlists</h1>
        <PlaylistCards playlists={res} />
        {/* <div className="flex flex-row w-full h-full place-content-center justify-items-center ">
          <div className="fixed md:translate-y-1/2">
            <div className="">
              <CardItem
                key={nurtreePlaylist.id}
                id={nurtreePlaylist.id}
                heading={nurtreePlaylist.name}
                subheading={nurtreePlaylist.description}
                altTitle={nurtreePlaylist.name}
                images={nurtreePlaylist.images}
                type="playlists"
              />
            </div>
          </div>
        </div> */}
      </section>
    </>
  );
}
