import { useDesigner } from "@/lib/hooks/useDesigner";
import { Button } from "../ui/button";
import { FormElements } from "./Elements";
import { X } from "lucide-react";
import { Separator } from "../ui/separator";

export function FormPropertiesSidebar() {
  const { selectedElement, setSelectedElement } = useDesigner();

  if (!selectedElement) return null;

  const PropertiesForm =
    FormElements[selectedElement?.type].propertiesComponent;

  return (
    <div className="flex flex-col p-2">
      <div className="flex justify-between items-center">
        <p className="text-sm text-foreground">Element properties</p>
        <Button
          size="icon"
          variant={"outline"}
          className="border-primary"
          onClick={() => {
            setSelectedElement(null);
          }}
        >
          <X />
        </Button>
      </div>
      <div className="mb-4" />
      <PropertiesForm elementInstance={selectedElement} />
    </div>
  );
}
