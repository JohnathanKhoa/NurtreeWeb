"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Playlist } from "@/types/types";
import { Fragment } from "react";
import { ChevronDown } from "lucide-react";
import LibraryItemCard from "../cards/LibraryItemCard";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, AppState } from "@/providers/redux/store";
import { fetchUserData } from "@/providers/redux/userSlice";

export default function UserLibrary() {
  let keycount = 0;
  const dispatch: AppDispatch = useDispatch();
  const userPlaylists = useSelector(
    (state: AppState) => state.userData.data.playlists
  ) as Playlist[];
  const handleFetchData = () => {
    dispatch(fetchUserData());
  };

  return (
    <Menu>
      <MenuButton as={Fragment}>
        {({ active }) => (
          <button
            onClick={handleFetchData}
            className={
              clsx(active) +
              `flex w-full rounded-sm pl-2 py-3 hover:bg-indigo-100/50  text-start cursor-pointer`
            }
          >
            {active === true ? (
              <div className="flex w-full justify-between items-between">
                <p>Playlists</p>

                <ChevronDown height={25} />
              </div>
            ) : (
              <div className="flex w-full justify-between items-between">
                <p>Playlists</p>
                <ChevronDown height={25} />
              </div>
            )}
          </button>
        )}
      </MenuButton>
      <MenuItems
        anchor="bottom"
        className="w-screen md:w-1/2 overflow-auto scrollbar scrollbar-thumb-rounded-full scrollbar-thumb-zinc-300 scrollbar-track-transparent rounded-sm bg-opacity-50 backdrop-blur-lg  shadow-2xl"
      >
        {userPlaylists?.map((playlist) => (
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
  );
}
