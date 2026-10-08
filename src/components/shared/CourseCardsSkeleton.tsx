import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const skeletonKeys = [
  "course-skeleton-alpha",
  "course-skeleton-bravo",
  "course-skeleton-charlie",
  "course-skeleton-delta",
  "course-skeleton-echo",
  "course-skeleton-foxtrot",
];

export default function CourseCardsSkeleton({
  withHeader = false,
  count = 6,
}: {
  withHeader?: boolean;
  count?: number;
}) {
  const cardGrid = (
    <div
      aria-hidden="true"
      className="grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-3"
    >
      {skeletonKeys.slice(0, count).map((key) => (
        <Card key={key} className="h-full rounded-lg">
          <CardHeader className="space-y-2">
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-4 w-1/3" />
          </CardHeader>
          <CardContent className="flex-1 space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            <div className="grid grid-cols-2 gap-4 border-t pt-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </CardContent>
          <CardFooter className="justify-end">
            <Skeleton className="h-8 w-28" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );

  if (!withHeader) return cardGrid;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <header className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="space-y-3">
          <Skeleton className="h-8 w-36" />
          <Skeleton className="h-4 w-64 max-w-full" />
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-8 w-44" />
          <Skeleton className="h-8 w-32" />
        </div>
      </header>
      {cardGrid}
    </div>
  );
}
