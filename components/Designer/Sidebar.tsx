import { FormElements } from "../Form/Elements";
import { SidebarBtnElement } from "../SidebarBtnElement";

export function DesignerSidebar() {
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
      Elements
      <SidebarBtnElement formElement={FormElements.TextField} />
    </aside>
  );
}
