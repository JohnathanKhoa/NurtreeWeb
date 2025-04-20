import PlaylistCards from "@/components/spotify/cards/PlaylistCards";
import SearchFilters from "@/components/spotify/header-navigation/SearchFilters";
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
  const session = await getAuthSession();
  return !session
    ? (redirect("/login"), { title: "Redirecting to login..." })
    : (async () => {
        const query = decodeURI((await params).query);
        const playlistResponse = await getSearchItems(
          session,
          "playlist",
          query,
          20
        );
        return {
          title: `Playlists related to "${query}"`,
          description: `Search Metadata: ${JSON.stringify(playlistResponse)}`,
        };
      })();
}

export default async function PlaylistSearchResultPage({ params }: Props) {
  const session = await getAuthSession();
  return !session
    ? (redirect("/login"), null)
    : (async () => {
        const query = decodeURI((await params).query);
        const playlistResponse = await getSearchItems(
          session,
          "playlist",
          query,
          20
        );
        const playlists = (playlistResponse?.playlists?.items || []) as Playlist[];

        return (
          <>
            <SearchFilters />
            <PlaylistCards playlists={playlists} />
          </>
        );
      })();
}