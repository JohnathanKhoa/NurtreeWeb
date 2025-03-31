"use client";
import React from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import SpotifyImage from "@/public/images/spotify_logo.png";
import {
  MusicalNoteIcon,
  LockClosedIcon,
  ServerIcon,
} from "@heroicons/react/20/solid";
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
    name: " Sit back and enjoy as your personal spotify playlists seamlessly playback the top music videos. ",
    description: "",
    icon: ServerIcon,
  },
];

export default function Login() {
  const url = process.env.NEXT_PUBLIC_LOCAL;
  console.log(url);
  const handleLogin = () => {
    signIn("spotify", { callbackUrl: url });
  };

  return (
    // <>
    // <div className="flex flex-col py-10 items-center content-center  h-screen md:gap-10 gap-4">
    //   <div className="md:h-1/4"></div>
    //   <div className="text-center text-balance flex flex-col items-center justify-center">
    //   Play all the top music videos using your own curated Spotify playlists
    //   </div>
    //    <div className="flex md:h-full md:w-full flex-col w-screen items-center justify-center gap-x-6">
    //     Nurtree, a blend of
    //     <Image
    //       src={SpotifyImage}
    //       alt="spotify logo"
    //       width={320}
    //       height={96}
    //       className="md:h-[96px] md:w-[320px] h-1/2 w-1/2"
    //     />
    //   <a className="flex flex-col items-center justify-center text-3xl">
    //     +
    //   </a>
    //     <Image
    //       src={YoutubeImage}
    //       alt="youtube logo"
    //       width={320}

    //       className="md:h-auto md:w-[320px] h-1/2 w-1/2"
    //     />

    //   </div>
    //   <button
    //     className="hover:underline flex px-12 pt-20 text-3xl tracking-widest uppercase rounded-full focus:outline-none bg-primary hover:bg-opacity-80"
    //     onClick={handleLogin}
    //   >
    //     Login
    //   </button>
    //   <div className="">
    //     with Premium Spotify.
    //   </div>
    //   <div>
    //   {/* <div className="text-center text-balance flex-col items-center justify-center">
    //     Don't have an account? <Link className="underline" href="https://www.spotify.com/us/signup?forward_url=https%3A%2F%2Fopen.spotify.com%2F">Sign up</Link> on their official website
    //   </div>
    //   <div className="text-center text-balance pt-10">
    //     <BuyMeACoffee/>
    //   </div>  */}
    //   </div>
    // </div>
    // </>
    <div className="overflow-hidden  md:py-24 ">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto place-content-center justify-items-center max-w-2xl  gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none ">
          <div className="lg:pt-4 lg:pr-8">
            <div className="lg:max-w-lg">
              <h2 className="text-base/7 font-semibold text-indigo-400">
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
                        className="absolute top-1 left-1 size-5 text-indigo-500"
                      />
                      {feature.name}
                    </dt>{" "}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
              <button
                type="button"
                className="rounded-md bg-indigo-500  px-3.5 py-2.5 mt-24 w-full text-sm font-semibold text-white shadow-xs hover:bg-indigo-600 cursor-pointer"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </div>
          {/* <Image
            alt="Product screenshot"
            src={AppSS}
            width={2432}
            height={1442}
            className="w-screen -ml-6 max-w-none rounded-xl  shadow-xl  sm:w-[57rem] md:-ml-4 lg:-ml-0"
          /> */}
        </div>
      </div>
    </div>
  );
}
