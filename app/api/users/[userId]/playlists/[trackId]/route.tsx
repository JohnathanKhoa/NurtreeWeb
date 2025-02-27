import { getTrackById, addTrack, addNewPlaylist } from "@/lib/actions";
import { Data } from "@/types/types";
import { getAuthSession } from "@/util/serverUtils";
import { redirect } from "next/navigation";

export async function POST(req: Request, {
  params

}: {
  params: Promise<{ 
    userId: string, 
    trackId: string}>}) {
      const session = await getAuthSession();
      if (!session) {
        redirect("/login");
      }
  
    const data = params;
    const userId = (await data).userId;
    const trackId = (await data).trackId;
    const track = await getTrackById(session!, trackId);
    const name = track.name;
    const body = { name:  name };
    const uri = track.uri;
    const trackBody:Data = { uris: [ uri ]}
    const result = await addNewPlaylist(session!, userId, body);
    const nextResult = await addTrack(session!, result.id, trackBody);
    return Response.json({ nextResult });
      

}

