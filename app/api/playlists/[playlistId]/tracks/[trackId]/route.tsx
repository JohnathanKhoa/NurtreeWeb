import { addTrack, getTrackById } from "@/lib/actions";
import { Data } from "@/types/types";
import { getAuthSession } from "@/util/serverUtils";
import { redirect } from "next/navigation";

export async function POST(
  req: Request,
  { params }: { params: { playlistId: string; trackId: string } }
) {
  const session = await getAuthSession();

  // Redirect to login if the user is not authenticated
  if (!session) {
    return redirect("/login");
  }

  const { playlistId, trackId } = await params;

  try {
    // Fetch track details
    const track = await getTrackById(session, trackId);
    if (!track) {
      return new Response("Track not found", { status: 404 });
    }

    // Prepare the request body
    const body: Data = { uris: [track.uri] };

    // Add track to the playlist
    const result = await addTrack(session, playlistId, body);

    // Return the result
    return new Response(JSON.stringify({ result }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in POST /playlists/:playlistId/tracks/:trackId:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}