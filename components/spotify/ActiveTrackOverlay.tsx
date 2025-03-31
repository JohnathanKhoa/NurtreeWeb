import { AudioLines } from "lucide-react";

export default function ActiveTrackOverlay() {
  return (
    <div className="absolute w-full place-content-center justify-items-end shadow-2xl">
      <AudioLines className="animate-pulse mt-3 mx-10" />
      {/* <div className=""></div> */}
    </div>
  );
}
