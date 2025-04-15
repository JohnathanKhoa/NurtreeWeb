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
  if (!session) {
    return {
      title: "Error in loading playlist data",
    };
  }
  const playlistId = (await params).playlistId;
  const playlist = await getPlaylistById(session, playlistId);
  const index = Number((await params).index);
  const playlistTracks: Track[] = playlist?.tracks.items
    .filter((item: any) => item.track !== null)
    .map((item: any) => item.track);
  return {
    title: `${playlistTracks[index].name} - ${playlistTracks[index].artists.map(
      (artist) => artist.name
    )}`,
    description: `Playlist Metadata: ${JSON.stringify(playlistTracks)}`,
  };
}

export default async function PlaylistPage({ params }: Props) {
  const session = await getAuthSession();
  if (!session) {
    redirect("/login");
  }
  const param = await params;
  const playlistId = param.playlistId;
  const index = Number(param.index);
  const playlist = await getPlaylistById(session, playlistId);
  const playlistTracks: Track[] = playlist?.tracks.items
    .filter((item: any) => item.track !== null)
    .map((item: any) => item.track);
  if (index !== undefined) {
    const result = await getYoutubeVideoDamon(session, playlistTracks[index]);

    return (
      <div className="">
        <IndexContainer
          playlist={playlist}
          tracks={playlistTracks}
          track={result.id}
          index={index}
        />
      </div>
    );
  }
}
