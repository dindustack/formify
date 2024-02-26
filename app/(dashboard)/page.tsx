import { BookCheck, MousePointerClick, Split, Telescope } from "lucide-react";
import { GetFormStats, GetForms } from "@/actions/form";
import { StatsCard } from "@/components/StatsCard";
import React, { Suspense } from "react";
import { Separator } from "@/components/ui/separator";
import { CreateFormButton } from "@/components/createFormButton";
import { FormCardSkeleton } from "@/components/FormCardSkeleton";
import { FormCard } from "@/components/FormCard";

export default function Home() {
  return (
    <div className="container pt-4">
      <Suspense fallback={<StatsCards loading={true} />}>
        <CardStatsWrapper />
      </Suspense>
      <div className="my-12"></div>
      <h2 className="text-4xl font-bold col-span-2">Your Forms</h2>
      <Separator className="my-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CreateFormButton />
        <Suspense
          fallback={[1, 2, 3, 4, 5].map((el) => (
            <FormCardSkeleton key={el} />
          ))}
        >
          <FormCards />
        </Suspense>
      </div>
    </div>
  );
}

async function CardStatsWrapper() {
  const stats = await GetFormStats();
  return <StatsCards loading={false} data={stats} />;
}

interface StatsCardProps {
  data?: Awaited<ReturnType<typeof GetFormStats>>;
  loading: boolean;
}

function StatsCards(props: StatsCardProps) {
  const { data, loading } = props;
  return (
    <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {/* All time form visits  */}
      <StatsCard
        title="Total visits"
        icon={<Telescope />}
        helperText="All time form visits"
        value={data?.visits.toLocaleString() || ""}
        loading={loading}
        className="border-[0px] shadow-none bg-[#e6f5f9]"
      />

      {/* Total submissions  */}
      <StatsCard
        title="Total submissions"
        icon={<BookCheck />}
        helperText="All time form submissions"
        value={data?.submissions.toLocaleString() || ""}
        loading={loading}
        className="border-[0px] shadow-none bg-[#eefcef]"
      />

      {/* Submission rate  */}
      <StatsCard
        title="Submission rate"
        icon={<MousePointerClick />}
        helperText="Results that result in form submission"
        value={data?.submissionRate.toLocaleString() + "%" || ""}
        loading={loading}
        className="border-[0px] shadow-none bg-[#eff6fc]"
      />

      {/* Bounce rate  */}
      <StatsCard
        title="Bounce rate"
        icon={<Split />}
        helperText="Visits without interaction"
        value={data?.submissionRate.toLocaleString() + "%" || ""}
        loading={loading}
        className="border-[0px] shadow-none bg-[#eef7ee]"
      />
    </div>
  );
}

async function FormCards() {
  const forms = await GetForms();
  return (
    <>{React.Children.toArray(forms.map((form) => <FormCard form={form} />))}</>
  );
}
