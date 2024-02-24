import React, { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

type IStatsCardProps = {
  title: string;
  value: string;
  helperText: string;
  className: string;
  loading: boolean;
  icon: ReactNode;
};

export function StatsCard(props: IStatsCardProps) {
  const { title, value, helperText, className, loading, icon } = props;
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-[#949494]">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading && (
            <Skeleton className="w-[100px] bg-gray-200  opacity-0 rounded-full">
              <span>0</span>
            </Skeleton>
          )}
          {!loading && value}
        </div>
        <p className="text-xs text-[#949494] pt-1">{helperText}</p>
      </CardContent>
    </Card>
  );
}
