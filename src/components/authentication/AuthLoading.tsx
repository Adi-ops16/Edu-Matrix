import { IconLoader } from "@tabler/icons-react";
import { toast } from "../ui/toast";

export default function AuthLoading({
  label = "Verifying account",
}: {
  label?: string;
}) {
  toast.add({
    title: "Failed",
    description:
      "We couldn't load your data. please wait for some time and try again",
  });
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex gap-3 items-center">
        <IconLoader className="size-6 animate-spin"></IconLoader>
        <p>{label}</p>
      </div>
    </div>
  );
}
