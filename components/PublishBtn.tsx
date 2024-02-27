import { BookCheck } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

export function PublishFormBtn() {
  return (
    <Button className="gap-2">
      <BookCheck className="w-4 h-4" />
      Publish
    </Button>
  );
}
