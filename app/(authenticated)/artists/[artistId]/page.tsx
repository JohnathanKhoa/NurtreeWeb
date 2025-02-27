import AlbumCards from "@/components/spotify/AlbumCards";
import ArtistCards from "@/components/spotify/ArtistCards";
import TracksTable from "@/components/spotify/TracksTable";
import { getArtistById, getArtistDiscography } from "@/lib/actions";
import { getAuthSession } from "@/util/serverUtils";
import { Music } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Metadata } from "next/types";

interface Props {
  params: Promise<{
    artistId: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const session = await getAuthSession();
  if (!session) {
    return {
      title: "Error in loading artist data",
    };
  }
  const artistId = (await params).artistId;
  const artist = await getArtistById(session, artistId);
  return {
    title: `Nurtree - ${artist.name}`,
  };
}

export default async function ArtistPage({ params }: Props) {
  const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }
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
        {artist && (
          <>
            {artist.images.length > 0 ? (
              <Image
                src={artist.images[0].url}
                alt={artist.name}
                height={200}
                width={200}
                className="object-cover rounded-full md:w-52 w-20 md:h-52 h-20"
                priority
              />
            ) : (
              <div className="w-full h-40">
                <Music size={160} className="w-full h-full bg-paper " />
              </div>
            )}
            <div className="flex flex-col gap-3">
              <h2 className="md:text-5xl text-md font-bold">{artist.name}</h2>
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
        )}
      </div>

      <div className="my-8">
        <h1 className="flex items-center justify-center border-t-2">Popular</h1>
        <div className="my-2">
          <TracksTable tracks={artistTopTracks.tracks} showCover />
        </div>
      </div>

      {artistAlbums?.items.length > 0 && (
        <div className="mt-12">
          <h1 className="flex items-center justify-center border-t-2">Albums</h1>
          <AlbumCards albums={artistAlbums.items} />
        </div>
      )}

      {artistSingles?.items.length > 0 && (
        <div className="mt-12">
          <h1 className="flex items-center justify-center border-t-2">Singles</h1>
          <AlbumCards albums={artistSingles.items} />
        </div>
      )}

      {artistAppearsOn?.items.length > 0 && (
        <div className="mt-12">
          <h1 className="flex items-center justify-center border-t-2">Appears on</h1>
          <AlbumCards albums={artistAppearsOn.items} />
        </div>
      )}

      {artistCompilation?.items.length > 0 && (
        <div className="mt-12">
          <h1>Compilation</h1>
          <AlbumCards albums={artistCompilation.items} />
        </div>
      )}

      {relatedArtists?.artists.length > 0 && (
        <div className="mt-12">
          <h1 className="flex items-center justify-center border-t-2">Fans also like</h1>
          <ArtistCards artists={relatedArtists.artists} />
        </div>
      )}
    </div>
  );
}
