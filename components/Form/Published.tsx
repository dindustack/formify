import React from "react";
import { Input } from "../ui/input";
import { Button } from "react-day-picker";

export function FormPublished({ shareUrl }: { shareUrl: string }) {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-full w-full">
        <div className="max-w-md">
          <h1
            className="text-center text-4xl font-bold text-primary 
        pb-2 mb-10"
          >
            🎊🎊 Form Published 🎊🎊
          </h1>
          <h2 className="text-2xl">Share this form</h2>
          <h3 className="text-xl text-primary/60 border-b pb-10">
            Anyone who has access to the link can view and complete the form.
          </h3>
          <div className="my-4 flex flex-col gap-2 items-center w-full border-b pb-4">
            <Input className="w-full" readOnly value={shareUrl} />
            <Button
              className="mt-2 w-full"
              onClick={() => {
                navigator.clipboard.writeText(shareUrl);
              }}
            >
              Copy link
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
