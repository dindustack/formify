import { BookCheck } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

export function PublishFormBtn() {
  return (
    <Button className="gap-2 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl">
      <BookCheck className="w-4 h-4" />
      Publish
    </Button>
  );
}
