import Video from "@/components/spotify/Video";
import {
  getArtistById,
  getMe,
  getTrackById,
  getUserAllPlaylists,
  getYoutubeVideoDamon,
} from "@/lib/actions";
import { getAuthSession } from "@/util/serverUtils";
import { Metadata } from "next";
import { redirect } from "next/navigation";
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
    description: `Track Metadata: ${JSON.stringify(track)}`,
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

  const artist = await getArtistById(session, track.artists[0].id);

  return (
    <div className="scrollbar-hide">
      <div className="flex flex-col bg-[#1f1f1f]">
        <div className="sticky h-1/3 aspect-video max-h-[1048px] ">
          {<Video tracksLength={0} id={result.id} index={0} play={1} />}
        </div>
        <DescriptionBar artist={artist} track={track} />
        <div className="relative w-full h-screen bg-[#1f1f1f]">
          <TracksTable
            tracks={tracks}
            showHeader
            showSubtitle
            showAlbum
            showCover
          />
        </div>
      </div>
    </div>
  );
}
