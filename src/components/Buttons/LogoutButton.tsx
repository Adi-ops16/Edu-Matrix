"use client";
import { IconLogout } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import type { FetchError } from "ofetch";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks";
import { toast } from "../ui/toast";

export default function LogoutButton() {
  const router = useRouter();
  const { mutate: logout } = useLogout();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.add({
          type: "success",
          title: "Logged out",
          description: "You have been logged out successfully.",
        });
        router.push("/login");
      },
      onError: (error: FetchError) => {
        const message = error.data?.message;
        toast.add({
          type: "error",
          title: "Logout failed",
          description: message || "An error occurred while logging out.",
        });
      },
    });
  };

  return (
    <Button
      onClick={handleLogout}
      type="button"
      variant="ghost"
      className="w-full justify-start text-muted-foreground bg-red-800 hover:bg-destructive/10 hover:text-destructive"
    >
      <IconLogout aria-hidden="true" />
      Log out
    </Button>
  );
}
