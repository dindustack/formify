import { useDesigner } from "@/lib/hooks/useDesigner";
import { ScanEye } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { FormElements } from "./Form/Elements";

export function PreviewDialogBtn() {
   const { elements } = useDesigner();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2 shadow-none">
          <ScanEye className="w-4 h-4" />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent
        className="w-screen h-screen max-h-screen max-w-full flex flex-col
      flex-grow p-0 gap-0"
      >
        <div className="px-4 py-2 border-b">
          <p className="text-lg font-bold text-primary">Form preview</p>
          <p className="text-sm text-muted-foreground">
            This is how users will view your form.
          </p>
        </div>
        <div
          className="bg-accent flex flex-col flex-grow items-center
          justify-center p-4
          bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]
          overflow-y-auto
          "
        >
          <div
            className="w-[620px] flex flex-col gap-4 flex-grow
          bg-background h-full rounded-2xl p-8 overflow-y-auto
          "
          >{React.Children.toArray(
            elements.map((element) => {
              const FormComponent = FormElements[element.type].formComponent;
              return <FormComponent elementInstance={element} />

            })
          )}

          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
