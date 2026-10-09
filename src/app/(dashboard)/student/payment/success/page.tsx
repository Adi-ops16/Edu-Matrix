import {
  IconArrowRight,
  IconCircleCheck,
  IconExclamationCircleFilled,
} from "@tabler/icons-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function PaymentSuccessPage() {
  return (
    <section className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg rounded-2xl border bg-card p-8 text-center shadow-sm sm:p-10">
        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <IconCircleCheck aria-hidden="true" className="size-9" />
        </div>

        <p className="mb-2 text-sm font-medium text-primary">
          Payment complete
        </p>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          You&apos;re all set!
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
          Your payment was successful. Your course access will be available in
          My Courses shortly.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/student/payment-history" className={buttonVariants({})}>
            <IconExclamationCircleFilled />
            View Payment Details
          </Link>
          <Link
            href="/student/my-courses"
            className={buttonVariants({
              className: "gap-2",
              variant: "secondary",
            })}
          >
            Go to My Courses
            <IconArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
