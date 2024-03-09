import React from "react";
import { SidebarBtnElement } from "../SidebarBtnElement";
import { FormElements } from "./Elements";
import { Separator } from "../ui/separator";

export function FormElementsSidebar() {
  return (
    <div>
      <p className="text-sm text-primary">Drag and drop elements</p>
      <Separator className="my-2" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center">
        <p className="text-sm text-primary col-span-1 md:col-span-2 my-2 place-self-start">
          Layout elements
        </p>
        <SidebarBtnElement formElement={FormElements.TextField} />
        <SidebarBtnElement formElement={FormElements.TitleField} />
      </div>
    </div>
  );
}
