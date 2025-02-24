"use client";

import { AuthSession } from "@/types/types";
import { ChevronLeft, ChevronRight, LogOut, User2 } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
require('dotenv').config()

export default function Header() {
  const url = process.env.NEXT_PUBLIC_LOCAL;
  const { data } = useSession();
  const session = data as AuthSession;
  const router = useRouter();
  

  const logout = () => {
    signOut({ callbackUrl: url + "/login" });
  };

  return (
    <div>
    <header className="sticky top-0 z-50 flex items-center justify-between w-full">
      <div className="flex items-center gap-10 w-[32rem]">
        <div className="flex items-center gap-3">
          <button
            className="flex items-center p-1 rounded-full bg-background-secondary focus:outline-none"
            onClick={() => router.back()}
          >
            <ChevronLeft className="text-2xl text-gray" />
          </button>

          <button
            className="flex items-center p-1 rounded-full bg-background-secondary focus:outline-none"
            onClick={() => router.forward()}
          >
            <ChevronRight className="text-2xl text-gray" />
          </button>
        </div>

        
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 py-2 pl-2 pr-4 rounded-full bg-background-secondary bg-opacity-70">
          {session?.user.image ? (
            <Image
              src={session?.user.picture as string}
              className="object-contain w-8 h-8 rounded-full"
              alt={session?.user?.name}
              height={32}
              width={32}
            />
          ) : (
            <User2 className="p-1 rounded-full bg-paper-400" />
          )}
          <span className="text-sm font-bold tracking-wide">
            {session?.user.name}
          </span>
        </div>
          
        <button
          className="flex items-center justify-center bg-background-secondary bg-opacity-70 rounded-full h-10 w-10 hover:bg-[#181818] focus:outline-none cursor-pointer"
          onClick={logout}
        >
          <LogOut />
        </button>
      </div>
    </header>
    </div>
  );
}
