"use client";

import { AuthSession } from "@/types/types";
import { ChevronLeft, ChevronRight, LogOut, User2 } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
require("dotenv").config();

export default function LogoutButton() {
  const url = process.env.NEXT_PUBLIC_LOCAL;

  const logout = () => {
    signOut({ callbackUrl: url + "/login" });
  };

  return (
    <button className="" onClick={logout}>
      <LogOut />
    </button>
  );
}
