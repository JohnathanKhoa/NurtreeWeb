import { AudioLines } from "lucide-react";

export default function ActiveTrackOverlay() {
  return (
    <div className="shadow-2xl">
      <AudioLines className="animate-pulse" />
    </div>
  );
}
