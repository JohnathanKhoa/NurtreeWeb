"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Playlist } from "@/types/types";
import { Fragment } from "react";
import LibraryItemCard from "./LibraryItemCard";
import clsx from "clsx";
import { Nunito_Sans } from "next/font/google";
const fontFamily = Nunito_Sans({preload: false});
interface Props {
  playlists: Playlist[];
}

export default function UserLibrary({ playlists }: Props) {
  let keycount = 0;

  return (
    <div className="">
      <div className="">
        <Menu>
          <MenuButton as={Fragment}>
            {({ active }) => (
              <button className={clsx(active)}>
                {active === true ? (
                  <div className={fontFamily.className + "flex flex-row"}>
                    {/* <MenuIcon height={25} /> */}
                    Playlists
                  </div>
                ) : (
                  <div className={fontFamily.className + "flex flex-row"}>
                    {/* <MenuIcon height={25} /> */}
                    Playlists
                  </div>
                )}
              </button>
            )}
          </MenuButton>
          <MenuItems
            anchor="bottom"
            className="overflow-auto scrollbar-hide rounded-sm bg-zinc-500 bg-opacity-50 backdrop-blur-lg"
          >
            {/* <div className="sticky top-0 bg-black text-center ">
              Your Playlist Library
            </div> */}
            {playlists?.map((playlist) => (
              <MenuItem key={keycount++}>
                <LibraryItemCard
                  key={playlist.id + keycount++}
                  entity={playlist}
                  type="playlists"
                  subtitle={playlist.owner.display_name}
                />
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
}
