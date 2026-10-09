import { IconArrowLeft, IconCreditCardOff } from "@tabler/icons-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function PaymentCancelPage() {
  return (
    <section className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg rounded-2xl border bg-card p-8 text-center shadow-sm sm:p-10">
        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <IconCreditCardOff aria-hidden="true" className="size-9" />
        </div>

        <p className="mb-2 text-sm font-medium text-muted-foreground">
          Checkout canceled
        </p>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          No payment was made
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
          Your checkout was canceled, and you haven&apos;t been charged. You can
          return to the courses page whenever you&apos;re ready to try again.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/student/courses"
            className={buttonVariants({ className: "gap-2" })}
          >
            <IconArrowLeft aria-hidden="true" />
            Return to courses
          </Link>
          <Link
            href="/student/my-courses"
            className={buttonVariants({ variant: "outline" })}
          >
            Go to My Courses
          </Link>
        </div>
      </div>
    </section>
  );
}
