import React from "react";
import { Button } from "./ui/button";
import { Download } from "lucide-react";

export function SaveFormBtn() {
  return (
    <Button variant={"outline"} className="gap-2 shadow-none border-primary">
      <Download className="w-4 h-4" />
      Save
    </Button>
  );
}
