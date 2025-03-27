"use client";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuSeparator,
} from "@headlessui/react";
import { Playlist } from "@/types/types";
import { Menu as MenuIcon } from "lucide-react";
import { Fragment } from "react";
import LibraryItemCard from "./LibraryItemCard";
import clsx from "clsx";
import { signOut } from "next-auth/react";
import UserLibrary from "./UserLibrary";
require("dotenv").config();

interface Props {
  playlists: Playlist[];
}

export default function Hamburger({ playlists }: Props) {
  let keycount = 0;
  const url = process.env.NEXT_PUBLIC_LOCAL;
  const logout = () => {
    signOut({ callbackUrl: url + "/login" });
  };

  return (
    <div className="">
      <div className="">
        <Menu>
          <MenuButton as={Fragment}>
            {({ active }) => (
              <button className={clsx(active)}>
                {active === true ? (
                  <MenuIcon height={25} />
                ) : (
                  <MenuIcon size={25} className="" />
                )}
              </button>
            )}
          </MenuButton>
          <MenuItems
            anchor="bottom"
            className="overflow-auto rounded-sm w-48 p-6 bg-zinc-500 bg-opacity-50 backdrop-blur-lg"
          >
            <MenuItem key={keycount++}>
              <div className="rounded-sm hover:text-zinc-400 transition duration-300">
                <a className="" href="/">
                  Home
                </a>
              </div>
            </MenuItem>
            <MenuSeparator className="my-1 h-px bg-black" />
            <MenuItem key={keycount++}>
              <div className="rounded-sm hover:text-zinc-400 transition duration-300">
                <UserLibrary playlists={playlists} />
              </div>
            </MenuItem>
            <MenuSeparator className="my-1 h-px bg-black" />
            <MenuItem key={keycount++}>
              <div className="rounded-sm hover:text-zinc-400 transition duration-300">
                <button onClick={logout}>Logout</button>
              </div>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
}
3;
