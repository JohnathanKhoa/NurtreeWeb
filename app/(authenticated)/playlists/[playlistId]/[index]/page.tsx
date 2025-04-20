import { getPlaylistById, getYoutubeVideoDamon } from "@/lib/actions";
import { getAuthSession } from "@/util/serverUtils";
import { Metadata } from "next";
import { Track } from "@/types/types";
import IndexContainer from "@/components/spotify/media-page-container/IndexContainer";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{
    playlistId: string;
    index: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const session = await getAuthSession();
  return !session
    ? { title: "Error in loading playlist data" }
    : (async () => {
        const { playlistId, index } = await params;
        const playlist = await getPlaylistById(session, playlistId);
        const playlistTracks: Track[] = (playlist?.tracks?.items || [])
          .filter((item: any) => item.track !== null)
          .map((item: any) => item.track);

        const track = playlistTracks[Number(index)];
        return track
          ? {
              title: `${track.name} - ${track.artists
                .map((artist) => artist.name)
                .join(", ")}`,
              description: `Playlist Metadata: ${JSON.stringify(
                playlistTracks
              )}`,
            }
          : {
              title: "Track not found",
              description: "The specified track index is invalid or missing.",
            };
      })();
}

export default async function PlaylistPage({ params }: Props) {
  const session = await getAuthSession();
  return !session
    ? (redirect("/login"), null)
    : (async () => {
        const { playlistId, index } = await params;
        const playlist = await getPlaylistById(session, playlistId);

        return !playlist
          ? (
              <div>
                <h1>Error: Playlist not found</h1>
                <p>The specified playlist does not exist or cannot be fetched.</p>
              </div>
            )
          : (async () => {
              const playlistTracks: Track[] = (playlist?.tracks?.items || [])
                .filter((item: any) => item.track !== null)
                .map((item: any) => item.track);

              const trackIndex = Number(index);
              const track = playlistTracks[trackIndex];

              return !track
                ? (
                    <div>
                      <h1>Error: Track not found</h1>
                      <p>The specified track index is invalid or missing.</p>
                    </div>
                  )
                : (async () => {
                    const result = await getYoutubeVideoDamon(session, track);
                    return !result || !result.id
                      ? (
                          <div>
                            <h1>Error: YouTube video not found</h1>
                            <p>
                              Unable to fetch the YouTube video for the specified
                              track.
                            </p>
                          </div>
                        )
                      : (
                          <div>
                            <IndexContainer
                              playlist={playlist}
                              tracks={playlistTracks}
                              track={result.id}
                              index={trackIndex}
                            />
                          </div>
                        );
                  })();
            })();
      })();
}