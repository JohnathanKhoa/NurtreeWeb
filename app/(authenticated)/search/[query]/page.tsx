import AlbumCards from "@/components/spotify/AlbumCards";
import ArtistCards from "@/components/spotify/ArtistCards";
import PlaylistCards from "@/components/spotify/PlaylistCards";
import SearchFilters from "@/components/spotify/SearchFilters";
import TracksTable from "@/components/spotify/TracksTable";
import {
  getMe,
  getSearchItems,
  getUserAllPlaylists,
  getUserLikedPlaylists,
} from "@/lib/actions";
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
  const query = (await params).query;
  return {
    title: `Search results for "${query}"`,
  };
}

export default async function SearchResults({ params }: Props) {
  const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }

  const query = decodeURI((await params).query);

  const searchResults = await getSearchItems(session, "all", query);
  const currentUser = (await getMe({
    session,
  }).then((data) => data)) as User;
  const [playlists] = await Promise.all([
    getUserAllPlaylists(session, 100),
    //getUserLikedSongs(session).then((data) => data.total),
  ]);
  return (
    <div className="mx-2 flex flex-col items-stretch gap-8">
      <SearchFilters />

      <div className="flex flex-col items-stretch -mt-8">
      <div className="col-span-12 border-b border-zinc-500"></div>
        <h1 className="flex items-center justify-center">Tracks</h1>
        <TracksTable
          playlists={playlists}
          tracks={searchResults.tracks.items}
          showAlbum
          showCover
          showSubtitle
          user={currentUser.id}
        />
      </div>

      {searchResults.artists.items.length > 0 && (
        <div>
          <div className="col-span-12 border-b border-zinc-500"></div>
          <h1 className="flex items-center justify-center">
            Artists
          </h1>
          <ArtistCards artists={searchResults.artists.items} />
        </div>
      )}

      {searchResults.albums.items.length > 0 && (
        <div>
          <div className="col-span-12 border-b border-zinc-500"></div>
          <h1 className="flex items-center justify-center">
            Albums
          </h1>
          <AlbumCards albums={searchResults.albums.items} />
        </div>
      )}

      {searchResults.playlists.items.length > 0 && (
        <div>
          <div className="col-span-12 border-b border-zinc-500"></div>
          <h1 className="flex items-center justify-center">
            Playlists
          </h1>
          <PlaylistCards playlists={searchResults.playlists.items} />
        </div>
      )}
    </div>
  );
}
