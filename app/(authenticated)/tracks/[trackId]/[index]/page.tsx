import IndexContainer from "@/components/spotify/IndexContainer";
import Video from "@/components/spotify/Video";
import {
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
  const currentUser = (await getMe({
    session,
  }).then((data) => data)) as User;
  return (
    <div className="scrollbar-hide">
      <div className="flex flex-col ">
        <div className="sticky h-1/3 aspect-video top-1/5 max-h-[1048px] ">
          {<Video tracksLength={0} id={result.id} index={0} play={1} />}
        </div>
        <div className="flex md:justify-center items-center gap-6 md:m-4">
          {
            <Image
              src={track.album?.images[0].url}
              alt={track.name}
              height={250}
              width={250}
              className="self-center shadow-2xl object-contain rounded-3xl md:w-40 w-20 md:h-40 h-20"
              priority
            />
          }
          <div className="md:flex flex-col gap-3">
            <h5 className="text-xs font-bold uppercase shadow-2xl">
              Currently Playing
            </h5>
            <h2 className="md:text-4xl text-xl font-bold">{track.name}</h2>
            <h1>
              {" "}
              {track.artists.map((artist, index) => (
                <a
                  key={artist.id}
                  className="text-xs md:text-sm md:font-semibold"
                >
                  {index !== 0 ? `, ${artist.name}` : artist.name}
                </a>
              ))}
            </h1>
          </div>
        </div>
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
