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
import { Fragment, useState } from "react";
import clsx from "clsx";
import { signOut } from "next-auth/react";
import UserLibrary from "./UserLibrary";
import BuyMeACoffee from "../BuyMeACoffee";
import { Nunito_Sans } from "next/font/google";
const fontFamily = Nunito_Sans({preload: false});
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

  const [tableIsOpen, setTableIsOpen] = useState<boolean | null>(false);

  return (
    <div className={fontFamily.className}>
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
            className={fontFamily.className + "overflow-auto rounded-sm w-64 p-6  bg-zinc-500 bg-opacity-50 backdrop-blur-lg"}
          >
            <MenuItem key={keycount++}>
              <div className="rounded-sm hover:text-zinc-400 transition duration-300">
                <a className={fontFamily.className} href="/">
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
                <button className={fontFamily.className} onClick={logout}>Logout</button>
              </div>
            </MenuItem>
            <MenuSeparator className="my-1 h-px bg-black" />
            <MenuItem key={keycount++}>
              <div className="rounded-sm hover:text-zinc-400 transition duration-300">
                <BuyMeACoffee/>
              </div>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
}
3;
