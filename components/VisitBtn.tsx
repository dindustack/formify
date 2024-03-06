"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export function VisitBtn({ shareUrl }: { shareUrl: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const shareLink = `${window.location.origin}/submit/${shareUrl}`;
  return (
    <Button
      className="md:w-[200px] py-5 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl"
      onClick={() => {
        window.open(shareLink, "_blank");
      }}
    >
      Visit
    </Button>
  );
}
