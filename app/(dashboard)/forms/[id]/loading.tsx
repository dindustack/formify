import { Shell } from "lucide-react";
import React from "react";

function Loading() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Shell className="animate-spin h-24 w-24" />
    </div>
  );
}

export default Loading;
