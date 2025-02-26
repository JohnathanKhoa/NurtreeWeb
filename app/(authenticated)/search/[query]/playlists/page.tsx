import PlaylistCards from "@/components/spotify/PlaylistCards";
import SearchFilters from "@/components/spotify/SearchFilters";
import { getSearchItems } from "@/lib/actions";
import { Playlist } from "@/types/types";
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
    title: `Playlists related to "${query}"`,
  };
}

export default async function PlaylistSearchResultPage({ params }: Props) {
  const session = await getAuthSession();
  if (!session) {
    redirect("/login");
  }

  const query = decodeURI((await params).query);

  const playlistResponse = await getSearchItems(session, "playlist", query, 50);

  const playlists = playlistResponse.playlists.items as Playlist[];

  return (
    <>
      <SearchFilters />
      <PlaylistCards playlists={playlists} />
    </>
  );
}
