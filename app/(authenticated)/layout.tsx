import "@/app/globals.css";
import Header from "@/components/spotify/Header";
import { NextAuthProvider } from "@/providers/NextAuthProvider";
import Sidebar from "@/components/spotify/Sidebar";
import TrackPlayerProvider from "@/providers/TrackPlayerProvider";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import SpotifyImage from "@/public/images/spotify_logo.png";
//import { Navbar, NavbarItem, NavbarSection } from "@/components/catalyst/navbar";

const fontFamily = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Nurtree",
  description: "Spotify and Youtube API",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAuthProvider>
      <TrackPlayerProvider>
        <div className="grid grid-cols-10 gap-2 scrollbar-hide">
          <div className="flex flex-col h-full col-span-full overflow-hidden rounded-lg bg-paper-700 scrollbar-hide">
            <Sidebar />
            <div className="m-2 w-screen place-content-center justify-items-center text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">
                <div className="">Nurtree <div className="text-sm font-normal flex flex-row gap-1">powered by <Image className="w-20" src={SpotifyImage} alt={""} /></div></div>
              </div>
            <main className="">{children}</main>
          </div>
        </div>
      </TrackPlayerProvider>
    </NextAuthProvider>
  );
}
