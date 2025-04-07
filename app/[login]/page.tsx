"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { MoveRight, Disc3 } from "lucide-react";
import {
  MusicalNoteIcon,
  LockClosedIcon,
  ServerIcon,
} from "@heroicons/react/20/solid";
import SpotifyIcon from "@/components/spotify/SpotifyIcon";
require("dotenv").config();

const features = [
  {
    name: "Login with your Spotify Account.",
    description: "",
    icon: LockClosedIcon,
  },
  {
    name: "Discover music videos based on your unique listening activity.",
    description: "",
    icon: MusicalNoteIcon,
  },
  {
    name: " Sit back and enjoy as your personal Spotify playlists seamlessly playback the top music videos. ",
    description: "",
    icon: ServerIcon,
  },
];

export default function Login() {
  const url = process.env.NEXT_PUBLIC_LOCAL;

  // const [clicked, setClicked] = useState(false);
  const [clickedLogin, setClickedLogin] = useState(false);

  const handleLogin = () => {
    setClickedLogin(true);
    signIn("spotify", { callbackUrl: url });
  };

  return (
    <div className="overflow-hidden  md:py-24 ">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto place-content-center justify-items-center max-w-2xl  gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none ">
          <div className="lg:pt-4 lg:pr-8">
            <div className="lg:max-w-lg">
              <h2 className="text-base/7 font-semibold text-indigo-300">
                Watch Music Videos
              </h2>
              <div className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">
                Nurtree
                {/* <div className="text-sm font-normal">powered by </div>
                <Image className="w-20" src={SpotifyImage} alt={""} /> */}
              </div>
              <p className="mt-6 text-lg/8 text-gray-300">
                Play all the top music videos using your own curated Spotify
                playlists
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-300 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-white">
                      <feature.icon
                        aria-hidden="true"
                        className="absolute top-1 left-1 size-5 text-indigo-300"
                      />
                      {feature.name}
                    </dt>{" "}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
              <button
                type="button"
                className="flex flex-row w-full py-3 my-3 mt-10 gap-2 rounded-md place-content-center  bg-indigo-500 hover:bg-indigo-400 cursor-pointer shadow-2xl"
                onClick={handleLogin}
              >
                <p className="absolute tracking-widest">Login</p>{" "}
                <div
                  id="login"
                  className="flex flex-row w-full mr-5 gap-2 items-end justify-end "
                >
                  {clickedLogin && <Disc3 className="animate-spin w-6" />}
                  <MoveRight />
                </div>
              </button>
              <a
                type="button"
                className="flex flex-row w-full py-3 my-3 mt-10 gap-2 rounded-md place-content-center  subpixel-antialiased border-1 border-[#1ED760] bg-[#1ED760] cursor-pointer shadow-2xl"
                // onClick={() => setClicked(true)}
                href="https://www.spotify.com/us/signup?forward_url=https%3A%2F%2Fopen.spotify.com%2F"
                target="_blank"
              >
                <div className="flex flex-row w-full mr-5 gap-2 items-end justify-end">
                  {/* {clicked && <Disc3 className="animate-spin w-6" />} */}
                  <SpotifyIcon />
                </div>{" "}
                <p className={` absolute tracking-widest`}>Get Spotify Free</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
