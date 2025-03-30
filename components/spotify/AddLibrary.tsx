"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Playlist } from "@/types/types";
import { Plus } from "lucide-react";
import { Fragment } from "react";
import clsx from "clsx";
import AddLibraryItemCard from "./AddLibraryItemCard";
import { Nunito_Sans } from "next/font/google";
const fontFamily = Nunito_Sans({ preload: false });
interface Props {
  playlists: Playlist[];
  trackId: string;
  user: string;
}

async function handleClick(user: string, trackId: string) {
  const response = await fetch(`/api/users/${user}/playlists/${trackId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
export default function AddLibrary({ playlists, trackId, user }: Props) {
  let keycount = 0;
  return (
    <div className="">
      <div>
        <Menu>
          <MenuButton as={Fragment}>
            {({ active }) => (
              <button onClick={() => {}} className={` ${clsx(active)}`}>
                <div className="flex flex-row p-4 gap-2 items-center  justify-center rounded-sm bg-opacity-50 backdrop-blur-lg shadow-2xl hover:bg-zinc-50/50 cursor-pointer">
                  <Plus size={25} />
                  Add to Playlist
                </div>
              </button>
            )}
          </MenuButton>
          <MenuItems
            anchor="bottom"
            className={
              fontFamily.className +
              "overflow-auto w-1/2 scrollbar scrollbar-thumb-rounded-full scrollbar-thumb-zinc-300 scrollbar-track-transparent rounded-sm bg-opacity-50 backdrop-blur-lg  shadow-2xl"
            }
          >
            <div
              onClick={() => {
                handleClick(user, trackId);
              }}
              className=" rounded-sm bg-opacity-50 backdrop-blur-lg shadow-2xl hover:bg-zinc-50/50 cursor-pointer"
            >
              <div className="flex flex-row p-4 gap-2 items-center ">
                <Plus size={25} />
                New Playlist
              </div>
            </div>
            {playlists.map((playlist) => (
              <MenuItem key={keycount++}>
                <AddLibraryItemCard
                  key={playlist.id + keycount++}
                  entity={playlist}
                  playlistId={playlist.id}
                  trackId={trackId}
                />
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
}
