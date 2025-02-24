import {
  getUserLikedPlaylists,
  getUserLikedSongs,
} from "@/lib/actions";
import { getAuthSession } from "@/util/serverUtils";
import Image from "next/image";
import SidebarLinksList from "./SidebarLinksList";
import UserLibrary from "./UserLibrary";
import SpotifyImage from '@/public/images/spotify_logo.png'
import YoutubeImage from '@/public/images/yt_logo_mono_dark.png'
import NurtreeImage from '@/public/images/nurtree.png'


export default async function Sidebar() {
  const session = await getAuthSession();

  if (!session) {
    return null;
  }

  const [playlists, likedSongsCount] = await Promise.all([
    getUserLikedPlaylists(session),
    getUserLikedSongs(session).then((data) => data.total),
  ]);

  return (
    <header className="md:sticky  items-center w-full text-sm rounded-lg">
      <div className="flex flex-row items-center justify-between p-4 rounded-lg bg-paper-700">
      
        <UserLibrary
        playlists={playlists}
        />
        {/* <Image className="rounded-xl object-scale-down w-7 h-7 justify-self-center" src={NurtreeImage} alt="NurtreeImage"/> */}
        <SidebarLinksList />
      </div>
      
    </header>
  );
}
