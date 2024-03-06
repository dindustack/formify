"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Copy } from "lucide-react";

export function FormLinkShare({ shareUrl }: { shareUrl: string }) {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopiedId] = useState<string>();

  useEffect(() => {
    setTimeout(() => {
      setCopiedId(undefined);
    }, 3000);
  }, [copied]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const shareLink = `${window.location.origin}/submit/${shareUrl}`;

  return (
    <div className="w-full">
      <div className="flex p-2  w-fulljustify-center items-center rounded-full bg-[#f7f9fc]">
        <Input
          className="block w-full font-medium border-none shadow-none focus-visible:ring-0"
          readOnly
          value={shareLink}
        />
        <Button
          onClick={() => {
            navigator.clipboard.writeText(shareLink);
            setCopiedId("write-text");
          }}
          className="bg-white shadow-none text-primary 
                  rounded-full p-2 inline-flex items-center gap-2
                  hover:bg-white hover:ring-primary hover:ring-1"
        >
          <span>{copied === "write-text" ? "Copied" : "Copy"}</span>
          <Copy className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
