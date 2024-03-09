import { GetFormById, GetFormWithSubmissions } from "@/actions/form";
import { ElementsType, FormElementInstance } from "@/components/Form/Elements";
import { FormLinkShare } from "@/components/FormLinkShare";
import { RowCell } from "@/components/RowCell";
import { StatsCard } from "@/components/StatsCard";
import { VisitBtn } from "@/components/VisitBtn";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDistance } from "date-fns";
import { BookCheck, MousePointerClick, Split, Telescope } from "lucide-react";
import React from "react";

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

      <div className="container pt-10">
        <SubmissionsTable id={form.id} />
      </div>
    </>
  );
}

type Row = { [key: string]: string } & {
  submittedAt: Date;
};

async function SubmissionsTable({ id }: { id: number }) {
  const form = await GetFormWithSubmissions(id);

  if (!form) {
    throw new Error("form not found");
  }

  const formElements = JSON.parse(form.content) as FormElementInstance[];
  const columns: {
    id: string;
    label: string;
    required: boolean;
    type: ElementsType;
  }[] = [];

  formElements.forEach((element) => {
    switch (element.type) {
      case "TextField":
        columns.push({
          id: element.id,
          label: element.extraAttributes?.label,
          required: element.extraAttributes?.required,
          type: element.type,
        });
        break;
      default:
        break;
    }
  });

  const rows: Row[] = [];
  form.FormSubmissions.forEach((submission) => {
    const content = JSON.parse(submission.content);
    rows.push({
      ...content,
      submittedAt: submission.createdAt,
    });
  });

  return (
    <>
      <h1 className="text-2xl font-bold my-4">Submissions</h1>
      <div className="rounded-md border-primary border">
        <Table>
          <TableHeader>
            <TableRow className="border-b-primary">
              {React.Children.toArray(
                columns.map((column) => (
                  <TableHead className="text-primary text-bold">
                    {column.label}
                  </TableHead>
                ))
              )}
              <TableHead className="text-right uppercase">
                Submitted at
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <RowCell
                    key={column.id}
                    type={column.type}
                    value={row[column.id]}
                  />
                ))}
                <TableCell className="text-right text-[#6b7280]">
                  {formatDistance(row.submittedAt, new Date(), {
                    addSuffix: true,
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default FormDetailPage;
