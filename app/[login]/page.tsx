'use client'
import React from "react";

import { signIn } from "next-auth/react";
import Image from "next/image";
import SpotifyImage from '@/public/images/spotify_logo.png'
import YoutubeImage from '@/public/images/yt_logo_mono_dark.png'
import Link from "next/link";
import BuyMeACoffee from "@/components/BuyMeACoffee";
require('dotenv').config()

export default function Login() {
  const url = process.env.NEXT_PUBLIC_LOCAL;
  console.log(url)
  const handleLogin = () => {
    signIn("spotify", { callbackUrl: url });
  };

  return (
    <>
    <div className="flex flex-col py-10 items-center content-center  h-screen gap-10">
      <div className="text-center text-balance flex flex-col items-center justify-center">
      Play all the top music videos using your own curated Spotify playlists
      </div>
      <div className="flex  flex-col w-screen items-center justify-center gap-x-6">
        Nurtree, a blend of
        <Image
          src={SpotifyImage}
          alt="spotify logo"
          width={320}
          height={96}
        />
      <a className="flex flex-col items-center justify-center text-3xl">
        +
      </a>
        <Image
          src={YoutubeImage}
          alt="youtube logo"
          width={320}
          height={96}
        />
        
      </div>
      <button
        className="hover:underline flex px-12 pt-20 text-3xl tracking-widest uppercase rounded-full focus:outline-none bg-primary hover:bg-opacity-80"
        onClick={handleLogin}
      >
        Login
      </button>
      <div className="">
        with Premium Spotify.
      </div>
      <div>
      <div className="text-center text-balance flex-col items-center justify-center">
        Don't have an account? <Link className="underline" href="https://www.spotify.com/us/signup?forward_url=https%3A%2F%2Fopen.spotify.com%2F">Sign up</Link> on their official website
      </div>
      <div className="text-center text-balance pt-10">
        <BuyMeACoffee/>
      </div> 
      </div>
    </div>
    </>
  );
}