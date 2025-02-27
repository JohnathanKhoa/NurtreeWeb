import { addTrack, getTrackById } from "@/lib/actions";
import { Data } from "@/types/types";
import { getAuthSession } from "@/util/serverUtils";
import { redirect } from "next/navigation";


export async function POST(req: Request, {
  params

}: {
  params: Promise<{ 
    playlistId: string, 
    trackId: string}>}) {
  const session = await getAuthSession();
  if (!session) {
    redirect("/login");
  }
  
    const data = params;
    const playlistId = (await data).playlistId;
    const trackId = (await data).trackId;
    const track = await getTrackById(session, trackId);
    const uri = track.uri;
    const body:Data = { uris: [ uri ]}
    const result = await addTrack(session, playlistId, body);
    return Response.json({ result });
    
  
}