import SearchFilters from "@/components/spotify/header-navigation/SearchFilters";
import TracksTable from "@/components/spotify/media-page-container/TracksTable";
import { getSearchItems } from "@/lib/actions";
import { Track } from "@/types/types";
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
        const tracks = (await getSearchItems(session, "track", query, 20).then(
          (data) => data?.tracks?.items || []
        )) as Track[];
        return {
          title: `Songs related to "${query}"`,
          description: `Track Metadata: ${JSON.stringify(tracks)}`,
        };
      })();
}

export default async function TrackSearchResultPage({ params }: Props) {
  const session = await getAuthSession();
  return !session
    ? (redirect("/login"), null)
    : (async () => {
        const query = decodeURI((await params).query);
        const tracks = (await getSearchItems(session, "track", query, 20).then(
          (data) => data?.tracks?.items || []
        )) as Track[];

        return (
          <>
            <SearchFilters />
            <TracksTable tracks={tracks} showCover showSubtitle showAlbum />
          </>
        );
      })();
}