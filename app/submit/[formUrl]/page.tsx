import { GetFormContentByUrl } from "@/actions/form";
import { FormElementInstance } from "@/components/Form/Elements";
import { FormSubmit } from "@/components/Form/Submit";

async function SubmitPage({
  params,
}: {
  params: {
    formUrl: string;
  };
}) {
  const form = await GetFormContentByUrl(params.formUrl);

  if (!form) {
    throw new Error("form not found");
  }

  const formContent = JSON.parse(form.content) as FormElementInstance[];

  return <FormSubmit formUrl={params.formUrl} content={formContent} />;
}

export default SubmitPage;
