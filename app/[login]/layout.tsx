import "@/app/globals.css";
import { NextAuthProvider } from "@/providers/NextAuthProvider";
import { Montserrat } from "next/font/google";
const fontFamily = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Nurtree - Login",
  description: "Authenticate with Premium Spotify",
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
