import "@/app/globals.css";
import { NextAuthProvider } from "@/providers/NextAuthProvider";
import NavBar from "@/components/spotify/NavBar";
import TrackPlayerProvider from "@/providers/TrackPlayerProvider";
import { Nunito_Sans } from "next/font/google";
const fontFamily = Nunito_Sans({ preload: false });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAuthProvider>
      <TrackPlayerProvider>
        <div className="grid grid-cols-10 gap-2 scrollbar-hide">
          <div className="flex flex-col h-full col-span-full overflow-hidden rounded-lg  scrollbar scrollbar-track-black">
            <NavBar />
            <main className={fontFamily.className}>{children}</main>
          </div>
        </div>
      </TrackPlayerProvider>
    </NextAuthProvider>
  );
}
