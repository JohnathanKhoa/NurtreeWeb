import { getTrackById, addTrack, addNewPlaylist } from "@/lib/actions";
import { Data } from "@/types/types";
import { getAuthSession } from "@/util/serverUtils";
import { redirect } from "next/navigation";

export async function POST(
  req: Request,
  { params }: { params: { userId: string; trackId: string } }
) {
  const session = await getAuthSession();

  // Redirect to login if the user is not authenticated
  if (!session) {
    return redirect("/login");
  }

  const { userId, trackId } = await params;

  try {
    // Fetch track details
    const track = await getTrackById(session, trackId);
    if (!track) {
      return new Response("Track not found", { status: 404 });
    }

    // Create new playlist
    const playlistBody = { name: track.name };
    const newPlaylist = await addNewPlaylist(session, userId, playlistBody);

    // Add track to the newly created playlist
    const trackBody: Data = { uris: [track.uri] };
    const addTrackResult = await addTrack(session, newPlaylist.id, trackBody);

    // Return the result
    return new Response(JSON.stringify({ addTrackResult }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in POST /playlists/:trackId:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}