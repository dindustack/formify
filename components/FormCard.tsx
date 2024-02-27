import { Form } from "@prisma/client";
import { formatDistance } from "date-fns";
import { ArrowRight, BookCheck, FilePenLine, Telescope } from "lucide-react";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export function FormCard({ form }: { form: Form }) {
  return (
    <Card className="shadow-none border-primary">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-between">
          <span className="truncate font-bold">{form.name}</span>
          {form.published && <Badge>Published</Badge>}
          {!form.published && <Badge variant={"destructive"}>Draft</Badge>}
        </CardTitle>
        <CardDescription className="flex items-center justify-between text-sm">
          {formatDistance(form.createdAt, new Date(), {
            addSuffix: true,
          })}
          {!form.published && (
            <span className="flex items-center gap-2">
              <Telescope />
              <span className="text-primary">
                {form.visits.toLocaleString()}
              </span>
              <BookCheck />
              <span className="text-primary">
                {form.submissions.toLocaleString()}
              </span>
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[20px] truncate text-sm">
        {form.description || "No description"}
      </CardContent>
      <CardFooter>
        {/* Submission button */}
        {form.published && (
          <Button asChild className="w-full mt-2 test-md gap-4">
            <Link href={`/forms/${form.id}`}>
              View submissions <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        )}

        {/* Edit button */}
        {!form.published && (
          <Button asChild className="w-full mt-2 test-md gap-4">
            <Link href={`/builder/${form.id}`}>
              Edit Form <FilePenLine className="h-4 w-4" />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
