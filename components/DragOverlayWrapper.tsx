"use client";
import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { useState } from "react";
import { ElementsType, FormElements } from "./Form/Elements";
import { SidebarBtnElementOverlay } from "./SidebarBtnElement";
import { useDesigner } from "@/lib/hooks/useDesigner";

export function DragOverlayWrapper() {
  const { elements } = useDesigner();
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);

  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active);
    },
    onDragCancel: () => {
      setDraggedItem(null);
    },
    onDragEnd: () => {
      setDraggedItem(null);
    },
  });

  if (!draggedItem) return null;


  let node = <div>No drag overlay</div>;
  const isSidebarBtnElement = draggedItem.data?.current?.isDesignerBtnElement;

  if (isSidebarBtnElement) {
    const type = draggedItem.data?.current?.type as ElementsType;
    node = <SidebarBtnElementOverlay formElement={FormElements[type]} />;
  }


  const isDesignerElement = draggedItem.data?.current?.isDesignerElement;
  if (isDesignerElement) {
    const elementId = draggedItem.data?.current?.elementId
    const element = elements.find((el) => el.id === elementId);
    if (!element) node = <div>Element not found!</div>;
    else {
      const DesignerElementComponent =
        FormElements[element.type].designerComponent;

      node = (
        <div
          className="flex border border-primary bg-[#f4f4f4] rounded-md h-[120px] w-full
        py-4 px-4 pointer-events-none"
        >
          <DesignerElementComponent elementInstance={element} />
        </div>
      );
    }
  }
  return <DragOverlay>{node}</DragOverlay>;
}
