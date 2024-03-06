import { GetFormById } from "@/actions/form";
import { FormLinkShare } from "@/components/FormLinkShare";
import { StatsCard } from "@/components/StatsCard";
import { VisitBtn } from "@/components/VisitBtn";
import { BookCheck, MousePointerClick, Split, Telescope } from "lucide-react";

async function FormDetailPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;
  const form = await GetFormById(Number(id));

  if (!form) {
    throw new Error("form not found");
  }

  const { visits, submissions } = form;

  let submissionRate = 0;

  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }

  const bounceRate = 100 - submissionRate;
  return (
    <>
      <div className="py-10">
        <div className="flex justify-between container">
          <h1 className="text-4xl font-bold truncate">{form.name}</h1>
          <VisitBtn shareUrl={form.shareURL} />
        </div>
      </div>
      <div className="py-4 border-b border-muted">
        <div className="container flex gap-2 items-center justify-between">
          <FormLinkShare shareUrl={form.shareURL} />
        </div>
      </div>
      <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 container">
          {/* All time form visits  */}
          <StatsCard
            title="Total visits"
            icon={<Telescope />}
            helperText="All time form visits"
            value={visits.toLocaleString() || ""}
            loading={false}
            className="border-[0px] shadow-none bg-[#e6f5f9]"
          />

          {/* Total submissions  */}
          <StatsCard
            title="Total submissions"
            icon={<BookCheck />}
            helperText="All time form submissions"
            value={submissions.toLocaleString() || ""}
            loading={false}
            className="border-[0px] shadow-none bg-[#eefcef]"
          />

          {/* Submission rate  */}
          <StatsCard
            title="Submission rate"
            icon={<MousePointerClick />}
            helperText="Results that result in form submission"
            value={submissionRate.toLocaleString() + "%" || ""}
            loading={false}
            className="border-[0px] shadow-none bg-[#eff6fc]"
          />

          {/* Bounce rate  */}
          <StatsCard
            title="Bounce rate"
            icon={<Split />}
            helperText="Visits without interaction"
            value={submissionRate.toLocaleString() + "%" || ""}
            loading={false}
            className="border-[0px] shadow-none bg-[#eef7ee]"
          />
      </div>
    </>
  );
}

export default FormDetailPage;
