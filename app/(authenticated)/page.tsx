import { getUserAllPlaylists } from "@/lib/actions";
import { getAuthSession } from "@/util/serverUtils";
import { redirect } from "next/navigation";
import PlaylistCards from "@/components/spotify/cards/PlaylistCards";

export async function generateMetadata() {
  const session = await getAuthSession();
  return !session
    ? { title: "Error in loading session data" }
    : {
        title: "Nurtree - Powered by Spotify",
        description: "A blend of Spotify and Youtube",
      };
}

export default async function Home() {
  const session = await getAuthSession();
  return !session
    ? (redirect("/login"), null)
    : (async () => {
        const res = await getUserAllPlaylists(session, 20);
        return res?.length > 0 ? (
          <section className="flex flex-col items-center">
            <h1 className="mt-4">Recent Playlists</h1>
            <PlaylistCards playlists={res} />
          </section>
        ) : (
          <div className="flex flex-col items-center">
            No playlists found. Try creating some playlists!
          </div>
        );
      })();
}