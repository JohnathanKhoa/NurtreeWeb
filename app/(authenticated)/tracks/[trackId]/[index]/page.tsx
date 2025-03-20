import IndexContainer from "@/components/spotify/IndexContainer";
import Video from "@/components/spotify/Video";
import {
  getArtistById,
  getMe,
  getTrackById,
  getUserAllPlaylists,
  getUserLikedPlaylists,
  getYoutubeVideoDamon,
} from "@/lib/actions";
import { getAuthSession } from "@/util/serverUtils";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Track, User } from "@/types/types";
import TracksTable from "@/components/spotify/TracksTable";
import DescriptionBar from "@/components/spotify/DescriptionBar";

interface Props {
  params: Promise<{
    trackId: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const session = await getAuthSession();
  if (!session) {
    return {
      title: "Error in loading track data",
    };
  }
  const trackId = (await params).trackId;
  const track = await getTrackById(session, trackId);
  return {
    title: `Nurtree - ${track.name}`,
  };
}

export default async function TrackPage({ params }: Props) {
  const session = await getAuthSession();
  if (!session) {
    redirect("/login");
  }

  const param = await params;

  const trackId = param.trackId;
  const track = await getTrackById(session, trackId);

  const result = await getYoutubeVideoDamon(session, track);
  const tracks: Track[] = [];
  tracks.push(track);
  const [playlists] = await Promise.all([
    getUserAllPlaylists(session, 100),
    //getUserLikedSongs(session).then((data) => data.total),
  ]);
  const artist = await getArtistById(session, track.artists[0].id);
  const currentUser = (await getMe({
    session,
  }).then((data) => data)) as User;
  return (
    <div className="scrollbar-hide">
      <div className="flex flex-col ">
        <div className="sticky h-1/3 aspect-video top-1/5 max-h-[1048px] ">
          {<Video tracksLength={0} id={result.id} index={0} play={1} />}
        </div>
        <DescriptionBar artist={artist} track={track} />
        <div className="relative w-full overflow-auto scrollbar-hide">
          <TracksTable
            user={currentUser.id}
            playlists={playlists}
            tracks={tracks}
            showHeader
            showSubtitle
          />
        </div>
      </div>
    </div>
  );
}
