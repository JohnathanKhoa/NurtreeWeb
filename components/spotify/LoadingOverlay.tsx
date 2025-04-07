import { Disc3 } from "lucide-react";

export default function LoadingOverlay() {
  return (
    <div className="shadow-2xl">
      <Disc3 className="animate-spin" />
    </div>
  );
}
