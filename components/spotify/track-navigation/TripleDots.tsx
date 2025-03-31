"use client";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuSeparator,
} from "@headlessui/react";
import { Playlist, Track } from "@/types/types";
import { EllipsisVertical } from "lucide-react";
import { Fragment } from "react";
import clsx from "clsx";
import AddLibrary from "./AddLibrary";
import GoToArtist from "./GoToArtist";
require("dotenv").config();

interface Props {
  track: Track;
  playlists: Playlist[];
  user: string;
}

export default function TripleDots({ playlists, track, user }: Props) {
  let keycount = 0;

  return (
    <Menu>
      <MenuButton as={Fragment}>
        {({ active }) => (
          <button className={clsx(active)}>
            {active === true ? (
              <EllipsisVertical className="cursor-pointer" size={25} />
            ) : (
              <EllipsisVertical className="cursor-pointer" size={25} />
            )}
          </button>
        )}
      </MenuButton>
      <MenuItems
        anchor="top start"
        className={
          " rounded-sm w-screen md:w-1/2  gap-6 bg-opacity-50 backdrop-blur-lg shadow-2xl"
        }
      >
        <>
          <div className={"grid grid-cols-1"}>
            <div className="flex-col">
              <MenuItem key={keycount++}>
                <div className="">
                  <AddLibrary
                    user={user}
                    trackId={track.id}
                    playlists={playlists}
                  />
                </div>
              </MenuItem>
              <MenuSeparator className="my-1 h-px bg-white" />
            </div>
            <div className="flex-col">
              <MenuItem key={keycount++}>
                <div className="">
                  <GoToArtist track={track} />
                </div>
              </MenuItem>
            </div>
          </div>
        </>
      </MenuItems>
    </Menu>
  );
}
3;
