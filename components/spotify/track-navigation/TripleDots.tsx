"use client";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuSeparator,
} from "@headlessui/react";
import Drawer from "rc-drawer";
import { Playlist, Track } from "@/types/types";
import { EllipsisVertical, Menu as MenuIcon, X } from "lucide-react";
import { Fragment, useState } from "react";
import clsx from "clsx";
import { signOut } from "next-auth/react";
import { Nunito_Sans } from "next/font/google";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";
import AddLibrary from "./AddLibrary";
import GoToArtist from "./GoToArtist";
const fontFamily = Nunito_Sans({ preload: false });
require("dotenv").config();

interface Props {
  track: Track;
  playlists: Playlist[];
  user: string;
}

export default function TripleDots({ playlists, track, user }: Props) {
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
                      <GoToArtist
                        user={user}
                        track={track}
                        playlists={playlists}
                      />
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
