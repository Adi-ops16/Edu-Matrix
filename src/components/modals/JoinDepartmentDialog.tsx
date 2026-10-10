"use client";
import { IconPlusFilled } from "@tabler/icons-react";
import type { FetchError } from "ofetch";
import type { Dispatch, SetStateAction } from "react";
import { useJoinDepartmentRequest } from "@/hooks";
import type { Department } from "@/types";
import triggerToast from "@/utils/triggerToast";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Spinner } from "../ui/spinner";

interface Props {
  department: Department | null;
  setJoinDepartment: Dispatch<SetStateAction<Department | null>>;
}

export default function JoinDepartmentDialog({
  department,
  setJoinDepartment,
}: Props) {
  const { mutate: review, isPending } = useJoinDepartmentRequest();

  const handleJoiningApplication = () => {
    if (department) {
      review(department.id, {
        onSuccess: (res) => {
          if (!res.success) {
            triggerToast({
              type: "error",
              title: "Error sending request",
              description: res.message || "please, try again in a while",
            });
            return;
          }
          triggerToast({
            type: "success",
            title: "Request sent successfully",
            description: "Joining request sent, please wait for approval",
          });
          setJoinDepartment(null);
        },
        onError: (err: FetchError) => {
          const message = err.data?.message;
          triggerToast({
            type: "error",
            title: "Error while requesting",
            description: message || "Internal Server Error",
          });
        },
      });
    }
  };

  return (
    <Dialog
      open={!!department}
      onOpenChange={(open) => {
        if (!open) {
          setJoinDepartment(null);
        }
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Make Joining Application</DialogTitle>
          <DialogDescription>
            are you sure you want to join this department?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            onClick={handleJoiningApplication}
            type="button"
            disabled={isPending}
          >
            {isPending ? <Spinner /> : <IconPlusFilled aria-hidden="true" />}
            Join
          </Button>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
