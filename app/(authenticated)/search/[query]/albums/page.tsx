import AlbumCards from "@/components/spotify/cards/AlbumCards";
import SearchFilters from "@/components/spotify/header-navigation/SearchFilters";
import { getSearchItems } from "@/lib/actions";
import { Album } from "@/types/types";
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
        const albumResponse = await getSearchItems(session, "album", query, 20);
        return {
          title: `Albums related to "${query}"`,
          description: `Search Metadata: ${JSON.stringify(albumResponse)}`,
        };
      })();
}

export default async function AlbumsSearchResultPage({ params }: Props) {
  const session = await getAuthSession();
  return !session
    ? (redirect("/login"), null)
    : (async () => {
        const query = decodeURI((await params).query);
        const albumResponse = await getSearchItems(session, "album", query, 20);
        const albums = (albumResponse?.albums?.items || []) as Album[];

        return (
          <>
            <SearchFilters />
            <AlbumCards albums={albums} />
          </>
        );
      })();
}