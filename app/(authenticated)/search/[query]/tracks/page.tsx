import SearchFilters from "@/components/spotify/SearchFilters";
import TracksTable from "@/components/spotify/TracksTable";
import { getMe, getSearchItems, getUserAllPlaylists, getUserLikedPlaylists } from "@/lib/actions";
import { Track, User } from "@/types/types";
import { getAuthSession } from "@/util/serverUtils";
import { redirect } from "next/navigation";
import { Metadata } from "next/types";

interface Props {
  params: Promise<{
    query: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const query = (await params).query;
  return {
    title: `Tracks related to "${query}"`,
  };
}

export default async function TrackSearchResultPage({ params }: Props) {
  const session = await getAuthSession();
  if (!session) {
    redirect("/login");
  }
  const [playlists] = await Promise.all([
          getUserAllPlaylists(session, 100),
          //getUserLikedSongs(session).then((data) => data.total),
        ]);
  const query = (await params).query;

  const currentUser = (await getMe({
        session,
      }).then((data) => data)) as User;

  const tracks = (await getSearchItems(session, "track", query, 50).then(
    (data) => data.tracks.items
  )) as Track[];

  return (
    <>
      <SearchFilters />
      <TracksTable user={currentUser.id} playlists={playlists} tracks={tracks} showCover showSubtitle />
    </>
  );
}
