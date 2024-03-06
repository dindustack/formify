import { GetFormContentByUrl } from "@/actions/form";

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

  return <div>SubmitPage: {params.formUrl}</div>;
}

export default SubmitPage;
