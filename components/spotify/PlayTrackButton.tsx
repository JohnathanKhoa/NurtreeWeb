"use client";

import { Track } from "@/types/types";
import { MdPlayArrow } from "react-icons/md";

interface Props {
  variant?: "simple" | "filled";
  track: Track;
  className?: string;
}

export default function PlayTrackButton({ variant = "simple" }: Props) {
  return (
    <MdPlayArrow
      className={
        variant === "filled" ? "text-paper-700" : "flex items-center text-white"
      }
    />
  );
}
