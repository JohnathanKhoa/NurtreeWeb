import AlbumTracksTable from "@/components/spotify/media-page-container/AlbumTracksTable";
import { getAlbumById } from "@/lib/actions";
import { getAuthSession } from "@/util/serverUtils";
import { Dot, Music } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{
    albumId: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const session = await getAuthSession();
  return !session
    ? { title: "Error in loading album data" }
    : (async () => {
        const albumId = (await params).albumId;
        const album = await getAlbumById(session, albumId);
        return {
          title: `${album.name} - ${album.artists.map((artist) => artist.name)}`,
          description: `Album Metadata: ${JSON.stringify(album)}`,
        };
      })();
}

export default async function AlbumPage({ params }: Props) {
  const session = await getAuthSession();
  return !session
    ? (redirect("/login"), null)
    : (async () => {
        const albumId = (await params).albumId;
        const album = await getAlbumById(session, albumId);

        return (
          <>
            <div className="mx-2 flex items-end gap-6">
              {album ? (
                <>
                  {album.images && album.images.length > 0 ? (
                    <Image
                      src={album.images[0].url as string}
                      alt={album.name}
                      height={200}
                      width={200}
                      className="object-cover rounded-sm aspect-square md:w-52 w-20 md:h-52 h-20"
                      priority
                    />
                  ) : (
                    <Music size={160} className="w-full h-full" />
                  )}
                  <div className="flex flex-col gap-3">
                    <h5 className="text-xs font-bold uppercase">
                      {album.album_type}
                    </h5>
                    <h2 className="md:text-5xl text-md font-bold">
                      {album.name}
                    </h2>

                    <div className="flex items-center text-sm font-semibold">
                      <Link
                        href={`/artists/${album.artists[0].id}`}
                        className="hover:underline"
                      >
                        {album.artists[0].name}
                      </Link>
                      <Dot />
                      <span>{new Date(album.release_date).getFullYear()}</span>
                      {album.tracks?.items?.length > 0 && (
                        <>
                          <Dot />
                          <span>{album.tracks.total} songs</span>
                        </>
                      )}
                    </div>
                  </div>
                </>
              ) : null}
            </div>

            <AlbumTracksTable
              album={album}
              tracks={album?.tracks?.items || []}
              showHeader
              showSubtitle
              showAlbum
              showCover
            />
          </>
        );
      })();
}