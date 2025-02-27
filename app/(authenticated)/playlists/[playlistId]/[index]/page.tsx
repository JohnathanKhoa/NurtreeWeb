import { getMe, getPlaylistById, getUserAllPlaylists, getUserLikedPlaylists, getYoutubeVideoDamon, getYoutubeVideoDamonDetails } from "@/lib/actions";
import { getAuthSession } from "@/util/serverUtils";
import { Metadata } from "next";
import { Track, User } from "@/types/types";
import IndexContainer from "@/components/spotify/IndexContainer";
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
  return {
    title: `Nurtree - ${playlist.name}`,
  };
}



export default async function PlaylistPage({ params }: Props) {
  
  const session = await getAuthSession();
  if (!session) {
    redirect("/login");
  }
 
  const param = (await params);
  
  const playlistId = param.playlistId;
  const index = Number(param.index);
  const playlist = await getPlaylistById(session, playlistId);
  //const track = await getTrackById(session, trackId);
  const playlistTracks:Track[] = playlist?.tracks.items
        .filter((item: any) => item.track !== null)
        .map((item: any) => item.track);
  const [playlists] = await Promise.all([
          getUserAllPlaylists(session, 100),
          //getUserLikedSongs(session).then((data) => data.total),
        ]);
  const currentUser = (await getMe({
      session,
    }).then((data) => data)) as User;
      
  if (index !== undefined) {
    //const track = await getTrackById(session, trackId);
    const result = await getYoutubeVideoDamon(session, playlistTracks[index]);

    
    return (
      <div className="scrollbar-hide">
      <IndexContainer
      playlist={playlist}
      tracks={playlist?.tracks.items
        .filter((item: any) => item.track !== null)
        .map((item: any) => item.track)}
      track={result.id}
      index={index}
      playlists={playlists}
      user={currentUser.id}
      />
    </div>
    );
  } 
}
