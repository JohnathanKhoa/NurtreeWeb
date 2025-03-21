import {
  getUserAllPlaylists,
  getUserLikedPlaylists,
  getUserLikedSongs,
} from "@/lib/actions";
import { getAuthSession } from "@/util/serverUtils";
import Image from "next/image";
import SidebarLinksList from "./SidebarLinksList";
import UserLibrary from "./UserLibrary";
import SpotifyImage from "@/public/images/spotify_logo.png";
import YoutubeImage from "@/public/images/yt_logo_mono_dark.png";
import NurtreeImage from "@/public/images/nurtree.png";
import LogoutButton from "./LogoutButton";
import SearchBar from "./SearchBar";
import SearchInput from "./SearchInput";
import RouterButtons from "./RouterButtons";

export default async function NavigationBar() {
  const session = await getAuthSession();

  if (!session) {
    return null;
  }

  const [playlists] = await Promise.all([
    getUserAllPlaylists(session, 100),
    //getUserLikedSongs(session).then((data) => data.total),
  ]);

  return (
    <header className="md:sticky  items-center w-full text-sm ">
      <div className="flex flex-row items-center justify-between p-4 rounded-lg bg-paper-700">
        <div className="flex flex-row">
          <RouterButtons />
          <UserLibrary playlists={playlists} />
        </div>
        <SearchInput />
        {/* <Image className="rounded-xl object-scale-down w-7 h-7 justify-self-center" src={NurtreeImage} alt="NurtreeImage"/> */}
        <div className="flex flex-row">
          <SidebarLinksList />
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
