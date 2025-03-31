"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Playlist } from "@/types/types";
import { ChevronDown, SquarePlus } from "lucide-react";
import { Fragment } from "react";
import clsx from "clsx";
import AddLibraryItemCard from "./AddLibraryItemCard";

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
    <>
      <Menu>
        <MenuButton as={Fragment}>
          {({ active }) => (
            <button
              onClick={() => {}}
              className={` ${clsx(active)} +
              "flex w-full rounded-sm pl-2 py-3 hover:bg-indigo-100/50  text-start cursor-pointer`}
            >
              <div
                className={` flex w-full justify-between items-between`}
              >
                <p className="flex flex-row items-center justify-center gap-2">
                  {" "}
                  <SquarePlus size={20} />
                  Add to Playlist
                </p>
                <ChevronDown height={25} />
              </div>
            </button>
          )}
        </MenuButton>
        <MenuItems
          anchor="bottom"
          className={
            "w-screen md:w-1/2 overflow-auto scrollbar scrollbar-thumb-rounded-full scrollbar-thumb-zinc-300 scrollbar-track-transparent rounded-sm bg-opacity-50 backdrop-blur-lg  shadow-2xl"
          }
        >
          <div
            onClick={() => {
              handleClick(user, trackId);
            }}
            className=" rounded-sm bg-opacity-50 backdrop-blur-lg shadow-2xl hover:bg-indigo-100/50 cursor-pointer"
          >
            <div
              className={` flex flex-row p-4 gap-2 items-center`}
            >
              <SquarePlus size={20} />
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
    </>
  );
}
