import { useDesigner } from "@/lib/hooks/useDesigner";
import { FormElementsSidebar } from "../Form/ElementsSidebar";
import { FormPropertiesSidebar } from "../Form/PropertiesSidebar";

export function DesignerSidebar() {
  const { selectedElement } = useDesigner();
  return (
    <aside
      className="
        w-[400px] 
        max-w-[400px] 
        flex 
        flex-col 
        flex-grow 
        gap-2
        border-l-2
        p-4
        bg-background
        overflow-y-auto
        h-full
        "
    >
      {!selectedElement && <FormElementsSidebar />}
      {selectedElement && <FormPropertiesSidebar />}
    </aside>
  );
}
