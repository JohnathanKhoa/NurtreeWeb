import SearchFilters from "@/components/spotify/SearchFilters";
import TracksTable from "@/components/spotify/TracksTable";
import { getMe, getSearchItems, getUserAllPlaylists } from "@/lib/actions";
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
  const session = await getAuthSession();
  if (!session) {
    redirect("/login");
  }
  const query = decodeURI((await params).query);
  const tracks = (await getSearchItems(session, "track", query, 20).then(
    (data) => data.tracks.items
  )) as Track[];
  return {
    title: `Songs related to "${query}"`,
    description: `Track Metadata: ${JSON.stringify(tracks)}`,
  };
}

export default async function TrackSearchResultPage({ params }: Props) {
  const session = await getAuthSession();
  if (!session) {
    redirect("/login");
  }
  const [playlists] = await Promise.all([
    getUserAllPlaylists(session, 20),
    //getUserLikedSongs(session).then((data) => data.total),
  ]);
  const query = (await params).query;

  const currentUser = (await getMe({
    session,
  }).then((data) => data)) as User;

  const tracks = (await getSearchItems(session, "track", query, 20).then(
    (data) => data.tracks.items
  )) as Track[];

  return (
    <>
      <SearchFilters />
      <TracksTable
        user={currentUser.id}
        playlists={playlists}
        tracks={tracks}
        showCover
        showSubtitle
        showAlbum
      />
    </>
  );
}
