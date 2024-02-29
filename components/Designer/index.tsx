import { cn } from "@/lib/utils";
import { DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core";
import { DesignerSidebar } from "./Sidebar";
import { ElementsType, FormElements } from "../Form/Elements";
import { idGenerator } from "@/lib/idGenerator";
import { useDesigner } from "@/lib/hooks/useDesigner";
import React from "react";
import { DesignerElementWrapper } from "./ElementWrapper";

export function Designer() {
  const { elements, addElement } = useDesigner();
  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) return;

      const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement;

      if (isDesignerBtnElement) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          idGenerator()
        );

        addElement(0, newElement);
      }
    },
  });

  return (
    <div className="flex w-full h-full">
      <div className="p-4 w-full">
        <div
          ref={droppable.setNodeRef}
          className={cn(
            "bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto",
            droppable.isOver && "ring-2 ring-primary"
          )}
        >
          {!droppable.isOver && elements.length === 0 && (
            <p className="text-3xl text-primary flex flex-grow items-center font-bold">
              Drop Here
            </p>
          )}
          {droppable.isOver && (
            <div className="p-4 w-full">
              <div className="h-[120px] border-2 border-dashed border-primary rounded-md bg-[#f4f4f4]"></div>
            </div>
          )}
          {elements.length > 0 && (
            <div className="flex flex-col text-primary w-full gap-2 p-4">
              {React.Children.toArray(elements.map((element) => (
                <DesignerElementWrapper element={element} />
              )))}
            </div>
          )}

        </div>
      </div>
      <DesignerSidebar />
    </div>
  );
}
