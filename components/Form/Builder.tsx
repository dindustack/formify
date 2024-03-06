"use client";
import { useDesigner } from "@/lib/hooks/useDesigner";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Form } from "@prisma/client";
import { Copy, Shell } from "lucide-react";
import { useEffect, useState } from "react";
import { Designer } from "../Designer";
import { DragOverlayWrapper } from "../DragOverlayWrapper";
import { PreviewDialogBtn } from "../PreviewBtn";
import { PublishFormBtn } from "../PublishBtn";
import { SaveFormBtn } from "../SaveFormBtn";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export function FormBuilder({ form }: { form: Form }) {
  const { setElements } = useDesigner();
  const [copied, setCopiedId] = useState<string>();
  const [isReady, setIsReady] = useState(false);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    if (isReady) return;
    const elements = JSON.parse(form.content);
    setElements(elements);
    const readyTimeout = setTimeout(() => setIsReady(true), 500);

    return () => clearTimeout(readyTimeout);
  }, [form, isReady, setElements]);

  useEffect(() => {
    setTimeout(() => {
      setCopiedId(undefined);
    }, 3000);
  }, [copied]);

  if (!isReady) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <Shell className="animate-spin h-24 w-24" />
      </div>
    );
  }

  const shareUrl = `${window.location.origin}/submit/${form.shareURL}`;

  if (form.published) {
    return (
      <>
        <div className="flex flex-col items-center justify-center h-full w-full">
          <div className="max-w-lg">
            <h1
              className="text-center text-4xl font-bold text-primary 
        pb-2 mb-10"
            >
              🎊🎊 Form Published 🎊🎊
            </h1>
            <h3 className="text-center text-lg text-primary  pb-10">
              Anyone who has access to the link can view and complete the form.
            </h3>
            <div className="my-4 flex flex-col gap-2 items-center w-full pb-4">
              <div className="flex p-2  w-full justify-center items-center rounded-full bg-[#f7f9fc]">
                <Input
                  className="block w-full border-none shadow-none"
                  readOnly
                  value={shareUrl}
                />
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(shareUrl);
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
          </div>
        </div>
      </>
    );
  }

  return (
    <DndContext sensors={sensors}>
      <main className="flex flex-col w-full">
        <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
          <h2 className="truncate font-medium">
            <span className="text-muted-foreground mr-2">Form:</span>
            {form.name}
          </h2>
          <div className="flex items-center gap-2">
            <PreviewDialogBtn />
            {!form.published && (
              <>
                <SaveFormBtn id={form.id} />
                <PublishFormBtn id={form.id} />
              </>
            )}
          </div>
        </nav>
        <div
          className="
          flex 
          w-full 
          flex-grow 
          items-center 
          justify-center 
          relative 
          overflow-y-auto 
          h-[200px]
          bg-[#f4f4f4]
          bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]
          "
        >
          <Designer />
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
}
