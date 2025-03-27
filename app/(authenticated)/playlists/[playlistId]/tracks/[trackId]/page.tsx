import { addTrack, getTrackById } from "@/lib/actions";
import { Data } from "@/types/types";
import { getAuthSession } from "@/util/serverUtils";
import { Metadata } from "next";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{
    playlistId: string;
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
