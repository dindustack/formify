import { SidebarBtnElement } from "../SidebarBtnElement";
import { Separator } from "../ui/separator";
import { FormElements } from "./Elements";

export function FormElementsSidebar() {
  return (
    <div>
      <p className="text-sm text-primary">Drag and drop elements</p>
      <Separator className="my-2 bg-[#7a4fed]" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center">
        <p className="text-sm text-primary col-span-1 md:col-span-2 my-2 place-self-start">
          Layout elements
        </p>
        <SidebarBtnElement formElement={FormElements.TitleField} />
        <SidebarBtnElement formElement={FormElements.SubTitleField} />
        <SidebarBtnElement formElement={FormElements.ParagraphField} />
        <SidebarBtnElement formElement={FormElements.SeparatorField} />

        <p className="text-sm text-primary col-span-1 md:col-span-2 my-2 place-self-start">
          Form elements
        </p>
        <SidebarBtnElement formElement={FormElements.TextField} />
      </div>
    </div>
  );
}
