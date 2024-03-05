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
import { Shell } from "lucide-react";
import { useEffect, useState } from "react";
import { Designer } from "../Designer";
import { DragOverlayWrapper } from "../DragOverlayWrapper";
import { PreviewDialogBtn } from "../PreviewBtn";
import { PublishFormBtn } from "../PublishBtn";
import { SaveFormBtn } from "../SaveFormBtn";

export function FormBuilder({ form }: { form: Form }) {
  const { setElements } = useDesigner();
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

  if (!isReady) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <Shell className="animate-spin h-24 w-24" />
      </div>
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
                <PublishFormBtn />
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
