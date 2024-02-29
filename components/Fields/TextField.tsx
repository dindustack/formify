"use client";

import { Type } from "lucide-react";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "../Form/Elements";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const type: ElementsType = "TextField";

const extraAttributes = {
  label: "Text field",
  helperText: "Helper text",
  required: false,
  placeholder: "Value here..",
};

export const TextFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: Type,
    label: "Text Field",
  },
  designerComponent: DesignerComponent,
  formComponent: () => <div>form Component</div>,
  propertiesComponent: () => <div>properties Component</div>,
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { label, required, placeholder, helperText } = element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="text-primary">
        {label}
        {required && <div className="text-red-500">*</div>}
      </Label>
      <Input
        readOnly
        disabled
        placeholder={placeholder}
        className="border-primary bg-white !opacity-100"
      />
      {helperText && <p className="text-primary text-[0.8rem]">{helperText}</p>}
    </div>
  );
}
