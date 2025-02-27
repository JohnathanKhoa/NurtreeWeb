
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import clsx from "clsx";
import { EllipsisVertical } from "lucide-react";
import { Fragment } from "react";
import { Playlist } from "@/types/types";
import AddLibrary from "./AddLibrary";

interface Props {
  trackId: string;
  playlists: Playlist[];
  user: string;
}



export default function AddButton({playlists, trackId, user}:Props) {
    let keycount = 0;
    return (
        <div className="">
      <div className="">
        <Menu>
          <MenuButton as={Fragment}>
            {({ active }) => <button  className={clsx(active)}>{
                active === true ? 
                <EllipsisVertical height={25} /> : 
                <EllipsisVertical size={25} className=""/>
                }</button>}
          </MenuButton>
          <MenuItems anchor="left" className="overflow-auto scrollbar-hide border-4-black bg-zinc-800 hover:bg-white  hover:text-black ">
            
            <MenuItem key={keycount++}>
                <div className=""><div className="flex flex-row "><AddLibrary user={user} trackId={trackId} playlists={playlists}/></div></div>
              </MenuItem>
            
          </MenuItems>
        </Menu>
      </div>
    </div>
    );
};