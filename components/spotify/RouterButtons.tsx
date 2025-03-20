"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RouterButtons() {
  const router = useRouter();
  return (
    <div className="">
      <button
        className=" rounded-full bg-background-secondary focus:outline-none"
        onClick={() => router.back()}
      >
        <ChevronLeft className="text-2xl text-gray" />
      </button>

      <button
        className="  rounded-full bg-background-secondary focus:outline-none"
        onClick={() => router.forward()}
      >
        <ChevronRight className="text-2xl text-gray" />
      </button>
    </div>
  );
}
