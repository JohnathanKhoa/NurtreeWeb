"use client";
import "@/app/globals.css";
import { NextAuthProvider } from "@/providers/NextAuthProvider";
import NavBar from "@/components/spotify/NavBar";
import ReduxProvider from "@/providers/redux/ReduxProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAuthProvider>
      <ReduxProvider>
        <div className="grid grid-cols-10 gap-2 scrollbar-hide">
          <div className="flex flex-col h-full col-span-full overflow-hidden rounded-lg  scrollbar scrollbar-track-black">
            <NavBar />
            <main>{children}</main>
          </div>
        </div>
      </ReduxProvider>
    </NextAuthProvider>
  );
}
