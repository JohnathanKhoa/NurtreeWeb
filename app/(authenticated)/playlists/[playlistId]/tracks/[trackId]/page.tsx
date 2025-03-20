import { addTrack, getTrackById } from "@/lib/actions";
import { Data } from "@/types/types";
import { getAuthSession } from "@/util/serverUtils";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{
    playlistId: string;
    trackId: string;
  }>;
}

export default async function Page({ params }: Props) {
  const session = await getAuthSession();
  if (!session) {
    redirect("/login");
  }
  const data = await params;
  const playlistId = data.playlistId;
  const trackId = data.trackId;
  const track = await getTrackById(session, trackId);
  const uri = track.uri;
  const body: Data = { uris: [uri] };
  try {
    const result = await addTrack(session, playlistId, body);
    return <div>{result.snapshot_id}</div>;
  } catch (error) {
    console.log(error);
  }
}
