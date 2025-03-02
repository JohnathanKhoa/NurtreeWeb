import PlaylistCards from "@/components/spotify/PlaylistCards";
import { getTrackById, addNewPlaylist, addTrack, getUserAllPlaylists, getUserPlaylists } from "@/lib/actions";
import { Data } from "@/types/types";
import { getAuthSession } from "@/util/serverUtils";
import { redirect } from "next/navigation";

interface Props {
    params: Promise<{
      userId: string;
      
    }>;
}

export default async function Page({ params }: Props) {
  
    const session = await getAuthSession();
      if (!session) {
        redirect("/login");
      }
    const data = (await params);
    const userId = data.userId;
    const publicPlaylists = await getUserPlaylists(session, userId);
    
    
    return(
        <div className="flex h-1/2 w-1/2 items-center justify-center">
                <PlaylistCards playlists={publicPlaylists}/>
              </div>
    )
    
    
}