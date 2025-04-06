import AlbumCards from "@/components/spotify/AlbumCards";
import ArtistCards from "@/components/spotify/ArtistCards";
import PlaylistCards from "@/components/spotify/PlaylistCards";
import SearchFilters from "@/components/spotify/SearchFilters";
import TracksTable from "@/components/spotify/TracksTable";
import { getMe, getSearchItems, getUserAllPlaylists } from "@/lib/actions";
import { User } from "@/types/types";
import { getAuthSession } from "@/util/serverUtils";
import { Metadata } from "next";

import { redirect } from "next/navigation";

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

  const searchResults = await getSearchItems(session, "all", query);
  return {
    title: `Search results for "${query}"`,
    description: `Search Metadata: ${JSON.stringify(searchResults)}`,
  };
}

export default async function SearchResults({ params }: Props) {
  const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }

  const query = decodeURI((await params).query);

  const searchResults = await getSearchItems(session, "all", query);

  return (
    <div className="mx-2 flex flex-col   ">
      <SearchFilters />

      <div className="flex flex-col  -mt-8">
        <div className="col-span-12 border-b border-zinc-500"></div>
        <h1 className="flex items-center justify-center">Tracks</h1>
        <TracksTable
          tracks={searchResults.tracks.items}
          showAlbum
          showCover
          showSubtitle
        />
      </div>

      {searchResults.artists.items.length > 0 && (
        <div>
          <div className="col-span-12 border-b border-zinc-500"></div>
          <h1 className="flex items-center justify-center">Artists</h1>
          <ArtistCards artists={searchResults.artists.items} />
        </div>
      )}

      {searchResults.albums.items.length > 0 && (
        <div>
          <div className="col-span-12 border-b border-zinc-500"></div>
          <h1 className="flex items-center justify-center">Albums</h1>
          <AlbumCards albums={searchResults.albums.items} />
        </div>
      )}

      {searchResults.playlists.items.length > 0 && (
        <div>
          <div className="col-span-12 border-b border-zinc-500"></div>
          <h1 className="flex items-center justify-center">Playlists</h1>
          <PlaylistCards playlists={searchResults.playlists.items} />
        </div>
      )}
    </div>
  );
}
