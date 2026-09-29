import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CreateInstitutionButton() {
  return (
    <Button
      nativeButton={false}
      render={<Link href="/create-institution" />}
      variant="outline"
      className="w-full sm:w-auto"
    >
      Create an institution
    </Button>
  );
}
