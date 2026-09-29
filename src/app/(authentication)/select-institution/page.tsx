import CreateInstitutionButton from "@/components/Buttons/CreateInstitutionButton";
import SelectInstitutionForm from "@/components/forms/SelectInstitutionForm";
import { Card, CardContent } from "@/components/ui/card";

export default function SelectInstitutionPage() {
  return (
    <section className="relative isolate flex flex-1 items-center justify-center bg-[url('/progress-banner.svg')] bg-cover bg-center px-5 py-10 sm:px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-black/10 dark:bg-black/45"
      />

      <Card className="relative z-10 w-full max-w-md border-border/70 shadow-sm">
        <CardContent className="space-y-6 p-6 sm:p-8">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold">Choose your institution</h1>
            <p className="text-sm leading-6 text-muted-foreground">
              Select where you study or teach and choose your role.
            </p>
          </div>
          <SelectInstitutionForm />
          <div className="space-y-3 border-t border-border pt-5 text-center">
            <p className="text-sm text-muted-foreground">Own an institution?</p>
            <CreateInstitutionButton />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
