import { getUserAllPlaylists } from "@/lib/actions";
import { getAuthSession } from "@/util/serverUtils";
import { redirect } from "next/navigation";
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
          <h1 className="mt-4">Recent Playlists</h1>
          <PlaylistCards playlists={res} />
        </section>
      </>
    );
  } else {
    return (
      <div className="flex flex-col items-center">
        No playlists found. Try creating some playlists!
      </div>
    );
  }
}
