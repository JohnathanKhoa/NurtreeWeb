import { getTrackById, addTrack, addNewPlaylist } from "@/lib/actions";
import { Data } from "@/types/types";
import { getAuthSession } from "@/util/serverUtils";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{
    userId: string;
    trackId: string;
  }>;
}

export default async function Page({ params }: Props) {
  const session = await getAuthSession();
  if (!session) {
    redirect("/login");
  }
  const data = await params;
  const userId = data.userId;
  const trackId = data.trackId;
  const track = await getTrackById(session, trackId);
  const name = track.name;
  const body = { name: name };
  const uri = track.uri;
  const trackBody: Data = { uris: [uri] };
  try {
    const result = await addNewPlaylist(session, userId, body);
    const nextResult = await addTrack(session, result.id, trackBody);

    return <div>{result.id}</div>;
  } catch (error) {
    console.log(error);
  }
}
