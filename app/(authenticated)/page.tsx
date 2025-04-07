import { getMe, getPlaylistById } from "@/lib/actions";
import { Playlist, User } from "@/types/types";
import { getAuthSession } from "@/util/serverUtils";
import { redirect } from "next/navigation";
import Blur from "@/components/spotify/Blur";
import CardItem from "@/components/spotify/CardItem";

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
  const currentUser = (await getMe({
    session,
  }).then((data) => data)) as User;
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
