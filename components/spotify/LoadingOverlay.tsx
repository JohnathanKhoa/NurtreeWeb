import { Disc3 } from "lucide-react";

export default function LoadingOverlay() {
  return (
    <div className="absolute w-screen  justify-items-end shadow-2xl  ">
      <Disc3 className="animate-pulse translate-y-3 -translate-x-10 " />
    </div>
  );
}
