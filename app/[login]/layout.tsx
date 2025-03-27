import "@/app/globals.css";
import { NextAuthProvider } from "@/providers/NextAuthProvider";
import { Nunito_Sans } from "next/font/google";
const fontFamily = Nunito_Sans({preload: false});

export const metadata = {
  title: "Login with Spotify",
  description: "Login page to authenticate through Spotify",
};

export default function LoginPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NextAuthProvider>
        <div className={fontFamily.className + " text-white bg-paper-700"}>
          {children}
        </div>
      </NextAuthProvider>
    </>
  );
}
