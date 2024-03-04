import { useDesigner } from "@/lib/hooks/useDesigner";
import { FormElements } from "./Elements";

export function FormPropertiesSidebar() {
  const { selectedElement } = useDesigner();

  if (!selectedElement) return null;

  const PropertiesForm =
    FormElements[selectedElement?.type].propertiesComponent;

  return <PropertiesForm />;
}
