import {
  getMe,
  getPlaylistById,
  getTopItems,
  getUserAllPlaylists,
} from "@/lib/actions";
import Image from "next/image";
import { Artist, Playlist, Track, User } from "@/types/types";
import { getAuthSession } from "@/util/serverUtils";
import { redirect } from "next/navigation";
import Blur from "@/components/spotify/Blur";
import PlaylistCards from "@/components/spotify/PlaylistCards";
import CardItem from "@/components/spotify/CardItem";

export const metadata = {
  title: "Nurtree - Powered by Spotify",
  description: "A blend of Spotify and Youtube",
};

export default async function Home() {
  const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }
  const user = session.user;

  const currentUser = (await getMe({
    session,
  }).then((data) => data)) as User;

  const [playlists] = await Promise.all([
    getUserAllPlaylists(session, 100),
    //getUserLikedSongs(session).then((data) => data.total),
  ]);
  const nurtreePlaylist = await getPlaylistById(
    session,
    "2SipcZ6RkkcQ0zVP2Z6BSP"
  );
  const playlistSet: Playlist[] = [];
  playlistSet.push(nurtreePlaylist);
  return (
    <>
      <section className="flex ">
        <Blur img={currentUser.images[0].url} />
        <div className="flex flex-row w-full h-full place-content-center justify-items-center ">
          <div className="fixed md:translate-y-1/2">
            {/* <Image
              src={currentUser.images[0].url}
              alt={currentUser.display_name}
              height={2000}
              width={2000}
              quality={100}
              priority={true}
              className={`aspect-square w-full rounded-md shadow-2xl`}
            /> */}
            {/* <div className={"items-center"}>
              <h1 className="text-lg font-bold text-center">{session?.user.name}</h1>
            </div> */}
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
        </div>
      </section>
    </>
  );
}
