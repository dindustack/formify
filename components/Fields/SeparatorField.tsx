"use client";

import { useDesigner } from "@/lib/hooks/useDesigner";
import { zodResolver } from "@hookform/resolvers/zod";
import { SeparatorHorizontal } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "../Form/Elements";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

const type: ElementsType = "SeparatorField";

export const SeparatorFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
  }),
  designerBtnElement: {
    icon: SeparatorHorizontal,
    label: "Separator Field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: () => true,
};

function DesignerComponent() {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="text-primary/50">Separator field</Label>
      <Separator className="bg-primary" />
    </div>
  );
}

function PropertiesComponent() {
  return <p>No properties for this element</p>;
}

function FormComponent() {
  return <Separator className="bg-primary" />;
}
