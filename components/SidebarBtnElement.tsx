import React from "react";
import { FormElement } from "./Form/Elements";
import { Button } from "./ui/button";

export function SidebarBtnElement({
  formElement,
}: {
  formElement: FormElement;
}) {
  const { label, icon: Icon } = formElement.designerBtnElement;
  return (
    <Button variant={"outline"} className="flex flex-col gap-2 h-[120px] w-[120px] cursor-grab border-2 bg-white shadow-none border-primary">
      <Icon className="h-8 w-8 text-primary cursor-grab"/>
      <p className="text-xs text-primary">{label}</p>
    </Button>
  );
}
