import React, { useTransition } from "react";
import { Button } from "./ui/button";
import { Download, Shell } from "lucide-react";
import { useDesigner } from "@/lib/hooks/useDesigner";
import { UpdateFormContent } from "@/actions/form";
import { toast } from "./ui/use-toast";

export function SaveFormBtn({ id }: { id: number }) {
  const { elements } = useDesigner();
  const [loading, startTransition] = useTransition();

  const updateFormContent = async () => {
    try {
      const jsonElements = JSON.stringify(elements);
      await UpdateFormContent(id, jsonElements);
      toast({
        title: "Success",
        description: "Your form has been saved",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };
  return (
    <Button
      variant={"outline"}
      disabled={loading}
      onClick={() => {
        startTransition(updateFormContent);
      }}
      className="gap-2 shadow-none border-primary"
    >
      <Download className="w-4 h-4" />
      Save
      {loading && <Shell className="animate-spin h-4 w-4" />}
    </Button>
  );
}
