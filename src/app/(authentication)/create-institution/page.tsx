import Image from "next/image";
import CreateInstitutionForm from "@/components/forms/CreateInstitutionForm";
import { Card, CardContent } from "@/components/ui/card";

export default function CreateInstitutionPage() {
  return (
    <section className="flex flex-1 items-center justify-center px-5 py-10 sm:px-6">
      <div className="w-full max-w-5xl space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-medium text-primary">Institution setup</p>
          <h1 className="text-2xl font-semibold sm:text-3xl">
            Create an institution
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            Add your institution details and contact information. You can review
            everything before submitting.
          </p>
        </div>

        <Card className="overflow-hidden border-border/70 shadow-sm py-0">
          <CardContent className="grid p-0 lg:grid-cols-[minmax(0,1fr)_280px]">
            <div className="p-5 sm:p-8">
              <CreateInstitutionForm />
            </div>
            <aside className="relative hidden min-h-full bg-muted lg:block">
              <Image
                src="/registerBanner.png"
                alt="Students studying at an institution"
                fill
                sizes="280px"
                className="object-cover dark:brightness-[0.75]"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/10 to-transparent" />
              <div className="absolute inset-x-5 bottom-6 text-white">
                <p className="text-lg font-semibold">
                  A place to learn and grow
                </p>
                <p className="mt-1 text-sm text-white/80">
                  Set up your institution&apos;s learning community.
                </p>
              </div>
            </aside>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
