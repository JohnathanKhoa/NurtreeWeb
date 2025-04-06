import SearchInput from "./SearchInput";
import Hamburger from "./Hamburger";
import ResponsiveSpotifyLogo from "./ResponsiveSpotifyLogo";

export default  function NavBar() {

  return (
    <header className="items-center w-full bg-[#1f1f1f]">
      <div className="flex flex-row items-center justify-between p-4  ">
        <div className="flex flex-row">
          <div className="flex flex-row items-start gap-2 ">
            <Hamburger  />
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
