"use client";

import { SubmitForm } from "@/actions/form";
import { ArrowLeft, Send, Shell } from "lucide-react";
import Link from "next/link";
import { useCallback, useRef, useState, useTransition } from "react";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import { FormElementInstance, FormElements } from "./Elements";

type IFormSubmitProps = {
  formUrl: string;
  content: FormElementInstance[];
};

export function FormSubmit({ formUrl, content }: IFormSubmitProps) {
  const formValues = useRef<{ [key: string]: string }>({});
  const formErrors = useRef<{ [key: string]: boolean }>({});
  const [renderKey, setRenderKey] = useState(new Date().getTime());

  const [submitted, setSubmitted] = useState(false);
  const [pending, startTransition] = useTransition();

  const validateForm: () => boolean = useCallback(() => {
    for (const field of content) {
      const actualValue = formValues.current[field.id] || "";
      const valid = FormElements[field.type].validate(field, actualValue);

      if (!valid) {
        formErrors.current[field.id] = true;
      }
    }
    if (Object.keys(formErrors.current).length > 0) {
      return false;
    }

    return true;
  }, [content]);

  const submitValue = useCallback((key: string, value: string) => {
    formValues.current[key] = value;
  }, []);

  const submitForm = async () => {
    formErrors.current = {};
    const validForm = validateForm();
    if (!validForm) {
      setRenderKey(new Date().getTime());
      toast({
        title: "Error",
        description: "Please check the form for errors",
        variant: "destructive",
      });
      return;
    }

    try {
      const jsonContent = JSON.stringify(formValues.current);
      await SubmitForm(formUrl, jsonContent);
      setSubmitted(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  if (submitted) {
    return (
      <div className="flex justify-center w-full h-full items-center p-8">
        <div
          className="max-w-[620px] flex flex-col items-center gap-4 flex-grow
        w-full p-8 overflow-y-auto border border-primary  rounded-md 
        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
        "
        >
          <h1 className="text-2xl font-bold">Form submitted</h1>
          <p>Thank you for submitting the form.</p>

          <Button asChild className="mt-2 text-md gap-4">
            <Link href={"/"}>
              <ArrowLeft className="h-5 w-5" /> Return to Homepage
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full h-full items-center p-8">
      <div
        key={renderKey}
        className="max-w-[620px] flex flex-col gap-4 flex-grow bg-[#f4f4f4]
        w-full p-8 overflow-y-auto border border-primary  rounded-md
        "
      >
        {content.map((element) => {
          const FormElement = FormElements[element.type].formComponent;
          return (
            <FormElement
              key={element.id}
              elementInstance={element}
              submitValue={submitValue}
              isInvalid={formErrors.current[element.id]}
              defaultValue={formValues.current[element.id]}
            />
          );
        })}
        <Button
          className="mt-8"
          disabled={pending}
          onClick={() => {
            startTransition(submitForm);
          }}
        >
          {!pending && (
            <>
              <Send className="mr-2" />
              Submit
            </>
          )}
          {pending && <Shell className="animate-spin w-5 h-5" />}
        </Button>
      </div>
    </div>
  );
}
