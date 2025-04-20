import Video from "@/components/spotify/media-page-container/Video";
import { getTrackById, getYoutubeVideoDamon } from "@/lib/actions";
import { getAuthSession } from "@/util/serverUtils";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Track } from "@/types/types";
import TracksTable from "@/components/spotify/media-page-container/TracksTable";
import DescriptionBar from "@/components/spotify/media-page-container/DescriptionBar";

interface Props {
  params: Promise<{
    trackId: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const session = await getAuthSession();
  return !session
    ? { title: "Error in loading track data" }
    : (async () => {
        const trackId = (await params).trackId;
        const track = await getTrackById(session, trackId);
        return {
          title: `${track.name} - ${track.artists
            .map((artist) => artist.name)
            .join(", ")}`,
          description: `Track Metadata: ${JSON.stringify(track)}`,
        };
      })();
}

export default async function TrackPage({ params }: Props) {
  const session = await getAuthSession();
  return !session
    ? (redirect("/login"), null)
    : (async () => {
        const param = await params;
        const trackId = param.trackId;
        const track = await getTrackById(session, trackId);
        const result = await getYoutubeVideoDamon(session, track);
        const tracks: Track[] = [track];

        return (
          <div className="scrollbar-hide">
            <div className="flex flex-col bg-[#1f1f1f]">
              <div className="sticky h-1/3 aspect-video max-h-[1048px]">
                <Video tracksLength={0} id={result.id} index={0} play={1} />
              </div>
              <DescriptionBar track={track} />
              <div className="py-4"></div>
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
      })();
}