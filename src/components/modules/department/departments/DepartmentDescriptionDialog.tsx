import type { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Department } from "@/types";

export default function DepartmentDescriptionDialog({
  descriptionDepartment,
  setDescriptionDepartment,
}: {
  descriptionDepartment: Department | null;
  setDescriptionDepartment: Dispatch<SetStateAction<Department | null>>;
}) {
  return (
    <Dialog
      open={!!descriptionDepartment}
      onOpenChange={(open) => {
        if (!open) setDescriptionDepartment(null);
      }}
    >
      <DialogContent className="max-h-[85vh] overflow-hidden sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{descriptionDepartment?.name} description</DialogTitle>
          <DialogDescription className="sr-only">
            Full department description
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[55vh] overflow-y-auto whitespace-pre-wrap wrap-break-word rounded-md border bg-muted/30 p-4 text-sm leading-6">
          {descriptionDepartment?.department_description}
        </div>
        <DialogFooter>
          <DialogClose
            render={
              <Button type="button" variant="outline">
                Close
              </Button>
            }
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
