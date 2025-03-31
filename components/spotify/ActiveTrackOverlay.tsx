import { AudioLines } from "lucide-react";

export default function ActiveTrackOverlay() {
  return (
    <div className="fixed w-screen justify-items-end shadow-2xl">
      <AudioLines className="animate-pulse translate-y-3 md:-translate-x-10" />
    </div>
  );
}
