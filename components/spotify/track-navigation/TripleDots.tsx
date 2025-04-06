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
import OpenSpotify from "./OpenSpotify";
import GoToAlbum from "./GoToAlbum";
import GoToArtists from "./GoToArtists";
require("dotenv").config();

interface Props {
  track: Track;
}

export default function TripleDots({ track }: Props) {
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
                  <AddLibrary trackId={track.id} />
                </div>
              </MenuItem>
            </div>
            <MenuSeparator className="my-1 h-px bg-white" />
            <div className="flex-col">
              <MenuItem key={keycount++}>
                <div className="">
                  <GoToArtists track={track} />
                </div>
              </MenuItem>
            </div>
            <MenuSeparator className="my-1 h-px bg-white" />
            <div className="flex-col">
              <MenuItem key={keycount++}>
                <div className="">
                  <GoToAlbum track={track} />
                </div>
              </MenuItem>
            </div>
            <MenuSeparator className="my-1 h-px bg-white" />
            <div className="flex-col">
              <MenuItem key={keycount++}>
                <div className="">
                  <OpenSpotify track={track} />
                </div>
              </MenuItem>
            </div>
          </div>
        </>
      </MenuItems>
    </Menu>
  );
}
