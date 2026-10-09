import { IconArrowLeft, IconKey } from "@tabler/icons-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ForgotPasswordPage() {
  return (
    <main className="flex flex-1 items-center justify-center bg-muted px-5 py-10 sm:px-6">
      <Card className="w-full max-w-md border-border/70 shadow-sm">
        <CardHeader className="items-center px-6 pt-8 text-center sm:px-8">
          <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <IconKey className="size-6" aria-hidden="true" />
          </div>
          <CardTitle className="text-2xl tracking-tight">
            Forgot your password?
          </CardTitle>
          <CardDescription className="mt-1 max-w-sm text-sm leading-6">
            We&apos;re working on a secure way to help you get back into your
            Edu-Matrix account.
          </CardDescription>
        </CardHeader>

        <CardContent className="px-6 pb-8 sm:px-8">
          <div className="rounded-lg border bg-muted/50 p-4 text-center">
            <p className="text-sm font-medium">
              Password recovery is coming soon
            </p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              For now, please contact your institution administrator for help
              accessing your account.
            </p>
          </div>

          <Link
            href="/login"
            className={`${buttonVariants({ variant: "outline" })} mt-5 w-full gap-2`}
          >
            <IconArrowLeft className="size-4" aria-hidden="true" />
            Back to sign in
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
