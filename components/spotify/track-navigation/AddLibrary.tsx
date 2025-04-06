"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Playlist } from "@/types/types";
import { ChevronDown, SquarePlus } from "lucide-react";
import { Fragment } from "react";
import clsx from "clsx";
import AddLibraryItemCard from "./AddLibraryItemCard";

import { AppDispatch, AppState } from "@/providers/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "@/providers/redux/userSlice";

interface Props {
  trackId: string;
}

async function handleClick(user: string, trackId: string) {
  const response = await fetch(`/api/users/${user}/playlists/${trackId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
export default function AddLibrary({ trackId }: Props) {
  const dispatch: AppDispatch = useDispatch();
  const userPlaylists = useSelector(
    (state: AppState) => state.userData.data.playlists
  ) as Playlist[];
  const userId = useSelector(
    (state: AppState) => state.userData.data.user.id
  ) as string;
  const handleFetchData = () => {
    dispatch(fetchUserData());
  };
  let keycount = 0;
  return (
    <>
      <Menu>
        <MenuButton as={Fragment}>
          {({ active }) => (
            <button
              onClick={() => handleFetchData()}
              className={` ${clsx(active)} +
              "flex w-full rounded-sm pl-2 py-3 hover:bg-indigo-100/50  text-start cursor-pointer`}
            >
              <div className={` flex w-full justify-between items-between`}>
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
          anchor="top"
          className={
            "w-screen md:w-1/2 overflow-auto scrollbar scrollbar-thumb-rounded-full scrollbar-thumb-zinc-300 scrollbar-track-transparent rounded-sm bg-opacity-50 backdrop-blur-lg  shadow-2xl"
          }
        >
          <div
            onClick={() => {
              handleClick(userId, trackId);
            }}
            className=" rounded-sm bg-opacity-50 backdrop-blur-lg shadow-2xl hover:bg-indigo-100/50 cursor-pointer"
          >
            <div className={` flex flex-row p-4 gap-2 items-center`}>
              <SquarePlus size={20} />
              New Playlist
            </div>
          </div>
          {userPlaylists.map((playlist) => (
            <MenuItem key={keycount++}>
              <AddLibraryItemCard
                key={playlist.id + keycount++}
                playlist={playlist}
                trackId={trackId}
              />
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </>
  );
}
