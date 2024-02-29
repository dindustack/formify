import { useDroppable } from "@dnd-kit/core";
import { FormElementInstance, FormElements } from "../Form/Elements";
import { cn } from "@/lib/utils";

export function DesignerElementWrapper({
  element,
}: {
  element: FormElementInstance;
}) {
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
    >
      <div
        ref={topHalf.setNodeRef}
        className={cn(
          "absolute w-full h-1/2 rounded-t-md",
          topHalf.isOver && "bg-green-500"
        )}
      />
      <div
        ref={bottomHalf.setNodeRef}
        className={cn(
          "absolute w-full bottom-0 h-1/2 rounded-b-md",
          topHalf.isOver && "bg-red-500"
        )}
      />
      <div className="flex w-full h-[120px] items-center rounded-md bg-[] px-4 py-2 pointer-evevnts-none">
        <DesignerElement elementInstance={element} />
      </div>
    </div>
  );
}
