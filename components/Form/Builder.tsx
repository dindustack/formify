"use client"
import { DndContext } from "@dnd-kit/core";
import { Form } from "@prisma/client";
import { Designer } from "../Designer";
import { PreviewDialogBtn } from "../PreviewBtn";
import { PublishFormBtn } from "../PublishBtn";
import { SaveFormBtn } from "../SaveFormBtn";

export function FormBuilder({ form }: { form: Form }) {
  return (
    <DndContext>
      <main className="flex flex-col w-full">
        <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
          <h2 className="truncate font-medium">
            <span className="text-muted-foreground mr-2">Form:</span>
            {form.name}
          </h2>
          <div className="flex items-center gap-2">
            <PreviewDialogBtn />
            {!form.published && (
              <>
                <SaveFormBtn />
                <PublishFormBtn />
              </>
            )}
          </div>
        </nav>
        <div
          className="
          flex 
          w-full 
          flex-grow 
          items-center 
          justify-center 
          relative 
          overflow-y-auto 
          h-[200px]
          bg-[#f4f4f4]
          bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]
          "
        >
          <Designer />
        </div>
      </main>
    </DndContext>
  );
}
