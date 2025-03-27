import { getUserAllPlaylists } from "@/lib/actions";
import { getAuthSession } from "@/util/serverUtils";
import Image from "next/image";
import SpotifyImage from "@/public/images/spotify_logo.png";
import SearchInput from "./SearchInput";
import Hamburger from "./Hamburger";
import { Nunito_Sans } from "next/font/google";
const fontFamily = Nunito_Sans();

export default async function NavBar() {
  const session = await getAuthSession();

  if (!session) {
    return null;
  }

  const [playlists] = await Promise.all([
    getUserAllPlaylists(session, 100),
    //getUserLikedSongs(session).then((data) => data.total),
  ]);

  return (
    <header className="md:sticky  items-center w-full ">
      <div className="flex flex-row items-center justify-between p-4 rounded-lg bg-paper-700">
        <div className="flex flex-row">
          {/* <RouterButtons /> */}
          {/* <UserLibrary playlists={playlists} /> */}
          <div className="flex flex-row items-start gap-2">
            <Hamburger playlists={playlists} />
            <div className={fontFamily.className + " text-xl font-semibold tracking-tight text-pretty text-white "}>
              Nurtree
            </div>
          </div>
        </div>
        <SearchInput />
        {/* <Image className="rounded-xl object-scale-down w-7 h-7 justify-self-center" src={NurtreeImage} alt="NurtreeImage"/> */}
        <div className="flex flex-row">
          <div className="text-sm font-normal pr-2">powered by </div>
          <a href="https://open.spotify.com">
            <Image className="w-20 h-full" src={SpotifyImage} alt={""} />
          </a>
        </div>
      </div>
    </header>
  );
}
