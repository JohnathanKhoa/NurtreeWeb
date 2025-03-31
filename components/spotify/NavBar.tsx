import { getUserAllPlaylists } from "@/lib/actions";
import { getAuthSession } from "@/util/serverUtils";
import Image from "next/image";
import SpotifyImage from "@/public/images/spotify_logo.png";
import SpotifyPrimaryImage from "@/public/images/Spotify_Primary_Logo_RGB_White.png";
import SearchInput from "./SearchInput";
import Hamburger from "./Hamburger";
import { Nunito_Sans } from "next/font/google";
import ResponsiveSpotifyLogo from "./ResponsiveSpotifyLogo";

const fontFamily = Nunito_Sans({ preload: false });

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
    <header className="items-center w-full bg-[#1f1f1f]">
      <div className="flex flex-row items-center justify-between p-4  ">
        <div className="flex flex-row">
          {/* <RouterButtons /> */}
          {/* <UserLibrary playlists={playlists} /> */}
          <div className="flex flex-row items-start gap-2 ">
            <Hamburger playlists={playlists} />
            <div
              className={
                fontFamily.className +
                " text-xl font-semibold tracking-tight text-pretty text-white "
              }
            >
              Nurtree
            </div>
          </div>
        </div>
        <SearchInput />
        <ResponsiveSpotifyLogo />
        {/* <Image className="rounded-xl object-scale-down w-7 h-7 justify-self-center" src={NurtreeImage} alt="NurtreeImage"/> */}
      </div>
    </header>
  );
}
