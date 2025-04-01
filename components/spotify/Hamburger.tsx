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
import clsx from "clsx";
import { signOut } from "next-auth/react";
import UserLibrary from "./UserLibrary";
import BuyMeACoffee from "../BuyMeACoffee";
import Link from "next/link";
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
    <div>
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
            className={`overflow-auto rounded-sm w-screen md:w-1/2 h-screen mt-6 p-6 gap-6 bg-opacity-50 backdrop-blur-lg shadow-2xl`}
          >
            <>
              <div className={"grid grid-cols-1 h-full content-between"}>
                <div className="flex-col">
                <MenuItem key={keycount++}>
                    <Link
                      className="flex rounded-sm pl-2 py-3 hover:bg-indigo-100/50 cursor-pointer"
                      href="/"
                    >
                      <div>Home</div>
                    </Link>
                  </MenuItem>
                  <MenuSeparator className="my-1 h-px bg-white" />
                  <MenuItem key={keycount++}>
                    <div className="">
                      <UserLibrary playlists={playlists} />
                    </div>
                  </MenuItem>
                  
                  
                  <MenuSeparator className="my-1 h-px bg-white" />
                  {/* <MenuItem key={keycount++}>
                    <Link
                      className="flex rounded-sm pl-2 py-3 hover:bg-indigo-100/50 cursor-pointer"
                      href="https://open.spotify.com/"
                      target="_blank"
                    >
                      <div>Spotify</div>
                    </Link>
                  </MenuItem>
                  <MenuSeparator className="my-1 h-px bg-white" /> */}
                  <MenuItem key={keycount++}>
                    <div
                      onClick={logout}
                      className="flex rounded-sm pl-2 py-3 hover:bg-indigo-100/50 cursor-pointer "
                    >
                      <button onClick={logout}>Logout</button>
                    </div>
                  </MenuItem>
                  <div className="flex grow max-h-full"></div>
                  <MenuSeparator className="my-1 h-px bg-white" />
                </div>
                <div className="flex-col">
                  
                  <MenuItem key={keycount++}>
                    <div className=" rounded-sm pl-2 py-3 hover:bg-indigo-100/50 cursor-pointer">
                      <BuyMeACoffee />
                    </div>
                  </MenuItem>
                </div>
              </div>
            </>
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
}
3;
