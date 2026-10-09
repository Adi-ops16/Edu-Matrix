import {
  IconActivity,
  IconArrowUpRight,
  IconClock,
} from "@tabler/icons-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { formatGeneratedAt } from "./overview-utils";

export default function OverviewHeader({ generatedAt }: { generatedAt: string }) {
  return (
    <header className="relative isolate overflow-hidden rounded-2xl border bg-card px-5 py-6 sm:px-7 sm:py-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-28 -z-10 size-80 rounded-full bg-primary/10 blur-3xl"
      />
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1 text-xs font-medium text-primary">
            <IconActivity className="size-3.5" aria-hidden="true" />
            Platform overview
          </div>
          <h1 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
            System at a glance
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Monitor institutions, users, academic activity, and platform
            revenue from one place.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <IconClock className="size-4" aria-hidden="true" />
            {formatGeneratedAt(generatedAt)}
          </div>
          <Link
            href="/super_admin/institution-applications"
            className={buttonVariants({ variant: "outline" })}
          >
            Review applications
            <IconArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </header>
  );
}
