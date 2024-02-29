import { useDroppable } from "@dnd-kit/core";
import { FormElementInstance, FormElements } from "../Form/Elements";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";

export function DesignerElementWrapper({
  element,
}: {
  element: FormElementInstance;
}) {
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);
  const topHalf = useDroppable({
    id: element.id + "-top",
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true,
    },
  });

  const bottomHalf = useDroppable({
    id: element.id + "-bottom",
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true,
    },
  });

  const DesignerElement = FormElements[element.type].designerComponent;

  return (
    <div
      className="relative bg-[#f4f4f4] border border-primary h-[120px] flex flex-col text-primary
    hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset"
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
    >
      <div
        ref={topHalf.setNodeRef}
        className="absolute w-full h-1/2 rounded-t-md"
      />
      <div
        ref={bottomHalf.setNodeRef}
        className="absolute w-full bottom-0 h-1/2 rounded-b-md"
      />
      {mouseIsOver && (
        <>
          <div className="absolute left-0  w-full bg-primary/50 h-full z-[1]" />

          <div className="absolute right-0 h-full z-[2]">
            <Button
              className="flex justify-center h-full border 
                rounded-md rounded-l-none bg-red-500"
            >
              <X />
            </Button>
          </div>
          <div
            className="
            absolute  top-1/2 left-1/2 -translate-x-1/2 
            -translate-y-1/2 animate-pulse z-[2]"
          >
            <p className="text-background text-sm">
              Click for properties or drag to move
            </p>
          </div>
        </>
      )}
      <div className="flex w-full h-[120px] items-center rounded-md bg-[] px-4 py-2 pointer-evevnts-none">
        <DesignerElement elementInstance={element} />
      </div>
    </div>
  );
}
