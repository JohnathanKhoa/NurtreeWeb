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

export default function AddButton({ playlists, trackId, user }: Props) {
  let keycount = 0;
  return (
    <div className="">
      <div className="">
        <Menu>
          <MenuButton as={Fragment}>
            {({ active }) => (
              <button className={clsx(active) + "text-start cursor-pointer "}>
                {active === true ? (
                  <EllipsisVertical height={25} />
                ) : (
                  <EllipsisVertical
                    size={25}
                    className="text-start cursor-pointer"
                  />
                )}
              </button>
            )}
          </MenuButton>
          <MenuItems
            anchor="bottom start"
            className="flex items-center justify-center  scrollbar-hide rounded-sm bg-opacity-50 backdrop-blur-lg shadow-2xl "
          >
            <MenuItem key={keycount++}>
              <div className="items-center justify-center ">
                <AddLibrary
                  user={user}
                  trackId={trackId}
                  playlists={playlists}
                />
              </div>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
}
