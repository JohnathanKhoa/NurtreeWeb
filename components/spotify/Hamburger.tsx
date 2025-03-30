"use client";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuSeparator,
} from "@headlessui/react";
import Drawer from "rc-drawer";
import { Playlist } from "@/types/types";
import { Menu as MenuIcon } from "lucide-react";
import { Fragment, useState } from "react";
import clsx from "clsx";
import { signOut } from "next-auth/react";
import UserLibrary from "./UserLibrary";
import BuyMeACoffee from "../BuyMeACoffee";
import { Nunito_Sans } from "next/font/google";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";
const fontFamily = Nunito_Sans({ preload: false });
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

  const actions = [
    {
      name: "home",
      action: (
        <a
          className={
            fontFamily.className +
            "flex h-full w-full hover:text-zinc-400 hover:bg-white transition duration-300"
          }
          href="/"
        >
          Home
        </a>
      ),
    },
    {
      name: "",
    },
  ];

  return (
    <div className={fontFamily.className}>
      <div className="">
        <Menu>
          <MenuButton as={Fragment}>
            {({ active }) => (
              <button className={clsx(active)}>
                {active === true ? (
                  <MenuIcon className="cursor-pointer" height={25} />
                ) : (
                  <MenuIcon className="cursor-pointer" size={25} />
                )}
              </button>
            )}
          </MenuButton>
          <MenuItems
            anchor="bottom"
            className={
              fontFamily.className +
              "overflow-auto rounded-sm w-1/2 h-screen p-6 gap-6 bg-opacity-50 backdrop-blur-lg shadow-2xl"
            }
          >
            <MenuItem key={keycount++}>
              <Link
                className="flex rounded-sm pl-2 py-3 hover:bg-zinc-50/50 cursor-pointer"
                href="/"
              >
                <div>Home</div>
              </Link>
            </MenuItem>

            <MenuSeparator className="my-1 h-px bg-white" />
            <MenuItem key={keycount++}>
              <div className="flex rounded-sm pl-2 py-3 hover:bg-zinc-50/50 cursor-pointer ">
                <button className={fontFamily.className} onClick={logout}>
                  Logout
                </button>
              </div>
            </MenuItem>
            <MenuSeparator className="my-1 h-px bg-white" />
            <MenuItem key={keycount++}>
              <div className="flex rounded-sm pl-2 py-3 hover:bg-zinc-50/50 cursor-pointer">
                <BuyMeACoffee />
              </div>
            </MenuItem>
            <MenuSeparator className="my-1 h-px bg-white" />
            <MenuItem key={keycount++}>
              <div className="flex mt-20">
                <UserLibrary playlists={playlists} />
              </div>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
}
3;
