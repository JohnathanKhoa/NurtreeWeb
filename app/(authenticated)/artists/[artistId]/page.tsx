import AlbumCards from "@/components/spotify/cards/AlbumCards";
import ArtistCards from "@/components/spotify/cards/ArtistCards";
import TracksTable from "@/components/spotify/media-page-container/TracksTable";
import { getArtistById, getArtistDiscography } from "@/lib/actions";
import { getAuthSession } from "@/util/serverUtils";
import { Music } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Metadata } from "next/types";
import SpotifyIcon from "@/components/spotify/SpotifyIcon";

interface Props {
  params: Promise<{
    artistId: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const session = await getAuthSession();
  return !session
    ? { title: "Error in loading artist data" }
    : (async () => {
        const artistId = (await params).artistId;
        const artist = await getArtistById(session, artistId);
        return {
          title: `${artist.name}`,
          description: `Artist Metadata: ${JSON.stringify(artist)}`,
        };
      })();
}

export default async function ArtistPage({ params }: Props) {
  const session = await getAuthSession();
  return !session
    ? (redirect("/login"), null)
    : (async () => {
        const artistId = (await params).artistId;
        const [
          artist,
          artistTopTracks,
          artistAlbums,
          artistSingles,
          artistAppearsOn,
          artistCompilation,
          relatedArtists,
        ] = await getArtistDiscography(session, artistId);

        return (
          <div className="mx-2">
            <div className="flex items-end gap-6">
              {artist ? (
                <>
                  {artist.images.length > 0 ? (
                    <div>
                      <Image
                        src={artist.images[1].url}
                        alt={artist.name}
                        height={200}
                        width={200}
                        className="object-cover rounded-md md:w-52 w-20 md:h-52 h-20"
                        priority
                      />

                      <a
                        href={`https://open.spotify.com/artist/${artist.id}`}
                        target="_blank"
                        className="flex flex-row gap-2 items-center justify-center mt-2 text-black font-semibold bg-zinc-800 rounded-2xl py-1 hover:invert duration-200"
                      >
                        <SpotifyIcon />
                      </a>
                    </div>
                  ) : (
                    <Music size={160} className="w-full h-full bg-paper" />
                  )}
                  <div className="flex flex-col gap-3">
                    <h2 className="md:text-5xl text-md font-bold">
                      {artist.name}
                    </h2>
                    <span className="text-sm">
                      {artist.followers.total.toLocaleString()} followers
                    </span>
                    <div className="flex items-center gap-5 text-sm">
                      {artist.genres.map((genre: string) => (
                        <span
                          key={genre}
                          className="px-4 py-1 text-xs capitalize rounded-full bg-paper-600 hover:bg-paper-400"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              ) : null}
            </div>

            <div className="my-8">
              <div className="col-span-12 border-b border-zinc-500"></div>
              <h1 className="flex items-center justify-center">Popular</h1>
              <div className="relative w-full">
                <TracksTable
                  tracks={artistTopTracks?.tracks || []}
                  showAlbum
                  showCover
                  showSubtitle
                />
              </div>
            </div>

            {artistAlbums?.items?.length > 0 && (
              <div className="mt-12">
                <div className="col-span-12 border-b border-zinc-500"></div>
                <h1 className="flex items-center justify-center">Albums</h1>
                <AlbumCards albums={artistAlbums.items} />
              </div>
            )}

            {artistSingles?.items?.length > 0 && (
              <div className="mt-12">
                <div className="col-span-12 border-b border-zinc-500"></div>
                <h1 className="flex items-center justify-center">Singles</h1>
                <AlbumCards albums={artistSingles.items} />
              </div>
            )}

            {artistAppearsOn?.items?.length > 0 && (
              <div className="mt-12">
                <div className="col-span-12 border-b border-zinc-500"></div>
                <h1 className="flex items-center justify-center">Appears on</h1>
                <AlbumCards albums={artistAppearsOn.items} />
              </div>
            )}

            {artistCompilation?.items?.length > 0 && (
              <div className="mt-12">
                <h1>Compilation</h1>
                <AlbumCards albums={artistCompilation.items} />
              </div>
            )}

            {relatedArtists?.artists?.length > 0 && (
              <div className="mt-12">
                <div className="col-span-12 border-b border-zinc-500"></div>
                <h1 className="flex items-center justify-center">
                  Fans also like
                </h1>
                <ArtistCards artists={relatedArtists.artists} />
              </div>
            )}
          </div>
        );
      })();
}
