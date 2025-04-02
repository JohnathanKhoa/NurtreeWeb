import { getUserAllPlaylists } from "@/lib/actions";
import { getAuthSession } from "@/util/serverUtils";
import SearchInput from "./SearchInput";
import Hamburger from "./Hamburger";
import ResponsiveSpotifyLogo from "./ResponsiveSpotifyLogo";

export default async function NavBar() {
  const session = await getAuthSession();

  if (!session) {
    return null;
  }

  const [playlists] = await Promise.all([
    getUserAllPlaylists(session, 20),
    //getUserLikedSongs(session).then((data) => data.total),
  ]);

  return (
    <header className="items-center w-full bg-[#1f1f1f]">
      <div className="flex flex-row items-center justify-between p-4  ">
        <div className="flex flex-row">
          <div className="flex flex-row items-start gap-2 ">
            <Hamburger playlists={playlists} />
            <div
              className={`text-xl font-semibold tracking-tight text-pretty text-white `}
            >
              Nurtree
            </div>
          </div>
        </div>
        <SearchInput />
        <ResponsiveSpotifyLogo />
      </div>
    </header>
  );
}
