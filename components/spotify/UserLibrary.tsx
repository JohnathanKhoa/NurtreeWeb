"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Playlist } from "@/types/types";
import { Menu as MenuIcon } from "lucide-react";
import { Fragment } from "react";
import LibraryItemCard from "./LibraryItemCard";
import clsx from 'clsx';

interface Props {
  playlists: Playlist[];
  
  
}

export default function UserLibrary({
  playlists,
}: Props) {
  let keycount = 0;
  
  return (
    <div className="">
      <div className="">
        <Menu>
          <MenuButton as={Fragment}>
            {({ active }) => <button className={clsx(active)}>{active === true ? <MenuIcon height={25} /> : <MenuIcon size={25} className=""/>}</button>}
          </MenuButton>
          <MenuItems anchor="bottom" className="overflow-auto scrollbar-hide  bg-zinc-800 rounded-xl opacity-80">
            <div className="sticky top-0 bg-black text-center ring-white ring-1 font-semibold">Your Playlist Library</div>
            {playlists?.map((playlist) => (
              
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
      </div>
    </div>
  );
}
