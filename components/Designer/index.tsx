import { cn } from "@/lib/utils";
import { useDroppable } from "@dnd-kit/core";
import { DesignerSidebar } from "./Sidebar";

export function Designer() {
  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
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
          {!droppable.isOver && (
            <p className="text-3xl text-primary flex flex-grow items-center font-bold">
              Drop Here
            </p>
          )}
          {droppable.isOver && (
            <div className="p-4 w-full">
              <div className="h-[120px] border-2 border-dashed border-primary rounded-md bg-[#f4f4f4]"></div>
            </div>
          )}
        </div>
      </div>
      <DesignerSidebar />
    </div>
  );
}
