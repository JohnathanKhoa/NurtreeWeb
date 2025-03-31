import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuSeparator,
} from "@headlessui/react";
import clsx from "clsx";
import { EllipsisVertical } from "lucide-react";
import { Fragment } from "react";
import { Playlist, Track } from "@/types/types";
import AddLibrary from "./AddLibrary";
import GoToArtist from "./GoToArtist";
import { Nunito_Sans } from "next/font/google";
const fontFamily = Nunito_Sans({ preload: false });
interface Props {
  track: Track;
  playlists: Playlist[];
  user: string;
}

export default function AddButton({ playlists, track, user }: Props) {
  let keycount = 0;
  return (
    <div className={fontFamily.className}>
      <div className="">
        <Menu>
          <MenuButton as={Fragment}>
            {({ active }) => (
              <button className={clsx(active) + "cursor-pointer "}>
                {active === true ? (
                  <EllipsisVertical size={25} />
                ) : (
                  <EllipsisVertical
                    size={25}
                    className="cursor-pointer"
                  />
                )}
              </button>
            )}
          </MenuButton>
          <MenuItems  className={
              "w-screen md:w-1/2 overflow-auto scrollbar scrollbar-thumb-rounded-full scrollbar-thumb-zinc-300 scrollbar-track-transparent rounded-sm bg-opacity-50 backdrop-blur-lg  shadow-2xl"}>
            <MenuItem key={keycount++}>
              <div className="items-center justify-center ">
                <AddLibrary
                  user={user}
                  trackId={track.id}
                  playlists={playlists}
                />
              </div>
            </MenuItem>
            <MenuSeparator className=" h-px bg-black" />
            <MenuItem key={keycount++}>
              <div className="items-center justify-center ">
                <GoToArtist user={user} track={track} playlists={playlists} />
              </div>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
}
