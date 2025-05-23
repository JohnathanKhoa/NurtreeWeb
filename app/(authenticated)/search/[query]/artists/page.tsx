import ArtistCards from "@/components/spotify/cards/ArtistCards";
import SearchFilters from "@/components/spotify/header-navigation/SearchFilters";
import { getSearchItems } from "@/lib/actions";
import { Artist } from "@/types/types";
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
        const artistResponse = await getSearchItems(
          session,
          "artist",
          query,
          20
        );
        return {
          title: `Artists related to "${query}"`,
          description: `Search Metadata: ${JSON.stringify(artistResponse)}`,
        };
      })();
}

export default async function ArtistsSearchResultPage({ params }: Props) {
  const session = await getAuthSession();
  return !session
    ? (redirect("/login"), null)
    : (async () => {
        const query = decodeURI((await params).query);
        const artistResponse = await getSearchItems(
          session,
          "artist",
          query,
          20
        );
        const artists = (artistResponse?.artists?.items || []) as Artist[];

        return (
          <>
            <SearchFilters />
            <ArtistCards artists={artists} />
          </>
        );
      })();
}