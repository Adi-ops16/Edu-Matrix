import { IconActivity, IconRefresh } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

export default function OverviewError({
  onRetry,
}: {
  onRetry: () => void;
}) {
  return (
    <section className="mx-auto flex min-h-96 w-full max-w-7xl flex-col items-center justify-center px-4 py-12 text-center">
      <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
        <IconActivity className="size-6" aria-hidden="true" />
      </div>
      <h1 className="text-lg font-semibold">Overview unavailable</h1>
      <p className="mt-1 max-w-md text-sm text-muted-foreground">
        We couldn&apos;t load the platform overview. Please try again.
      </p>
      <Button
        type="button"
        variant="outline"
        className="mt-5"
        onClick={onRetry}
      >
        <IconRefresh aria-hidden="true" />
        Retry
      </Button>
    </section>
  );
}
