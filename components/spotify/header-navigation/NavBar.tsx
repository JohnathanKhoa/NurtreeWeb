import SearchInput from "./SearchInput";
import Hamburger from "./Hamburger";
import ResponsiveSpotifyLogo from "./ResponsiveSpotifyLogo";

export default function NavBar() {
  return (
    <header className="w-full bg-[#1f1f1f]">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-start gap-2">
          <Hamburger />
          <h1 className="text-xl font-semibold tracking-tight text-white">
            Nurtree
          </h1>
        </div>
        <SearchInput />
        <ResponsiveSpotifyLogo />
      </div>
    </header>
  );
}
