import "@/app/globals.css";
import { NextAuthProvider } from "@/providers/NextAuthProvider";

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
    <NextAuthProvider>
      <div className="text-white">{children}</div>
    </NextAuthProvider>
  );
}