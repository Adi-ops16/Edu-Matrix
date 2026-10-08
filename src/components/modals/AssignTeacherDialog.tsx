"use client";
import { IconSearch, IconUserPlus } from "@tabler/icons-react";
import type { FetchError } from "ofetch";
import { useState } from "react";
import SearchInput from "@/components/shared/SearchInput";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  useAssignTeacherToCourse,
  useGetTeacherToAssignToCourse,
} from "@/hooks";
import useDebounce from "@/hooks/debounce.hook";
import type { GetTeachersToAssignResponse } from "@/types";
import getInitials from "@/utils/getInitials";
import triggerToast from "@/utils/triggerToast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface Props {
  courseDetailsId: number;
}

export default function AssignTeacherDialog({ courseDetailsId }: Props) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTeacherIds, setSelectedTeacherIds] = useState<string[]>([]);
  const debouncedSearchTerm = useDebounce(searchTerm);
  const {
    data: teachersResponse,
    isLoading: isTeachersLoading,
    isError: isTeachersError,
    refetch: refetchTeachers,
  } = useGetTeacherToAssignToCourse(
    String(courseDetailsId),
    { searchTerm: debouncedSearchTerm },
    open,
  );
  const { mutate: assignTeachers, isPending } = useAssignTeacherToCourse();
  const teachers: GetTeachersToAssignResponse[] = teachersResponse?.data ?? [];

  const toggleTeacher = (teacherId: string) => {
    setSelectedTeacherIds((current) =>
      current.includes(teacherId)
        ? current.filter((id) => id !== teacherId)
        : [...current, teacherId],
    );
  };

  const handleAssign = () => {
    if (selectedTeacherIds.length === 0) return;

    assignTeachers(
      {
        course_details_id: courseDetailsId,
        teacher_id: selectedTeacherIds,
      },
      {
        onSuccess: (response) => {
          if (!response.success) {
            triggerToast({
              type: "error",
              title: "Teacher assignment failed",
              description: response.message || "Please try again.",
            });
            return;
          }

          triggerToast({
            type: "success",
            title: "Teachers assigned",
            description:
              response.message || "Teachers were assigned to the course.",
          });
          setSelectedTeacherIds([]);
          setSearchTerm("");
          setOpen(false);
        },
        onError: (error: FetchError) => {
          triggerToast({
            type: "error",
            title: "Teacher assignment failed",
            description: error.data?.message || "Internal Server Error",
          });
        },
      },
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (isPending) return;
        setOpen(nextOpen);
        if (!nextOpen) {
          setSelectedTeacherIds([]);
          setSearchTerm("");
        }
      }}
    >
      <DialogTrigger
        render={
          <Button type="button" variant="outline" size="sm">
            <IconUserPlus aria-hidden="true" />
            Assign Teacher
          </Button>
        }
      />
      <DialogContent className="h-[min(80vh,48rem)] max-h-[90vh] w-full max-w-4xl grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden sm:max-w-4xl">
        <DialogHeader className="pr-8">
          <DialogTitle>Assign teachers</DialogTitle>
          <DialogDescription>
            Search by teacher name or email, then select one or more teachers.
          </DialogDescription>
        </DialogHeader>

        <div className="flex min-h-0 flex-col gap-4">
          <div className="relative">
            <IconSearch
              aria-hidden="true"
              className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            />
            <SearchInput
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search teachers by name or email"
              aria-label="Search teachers by name or email"
              className="pl-9"
              disabled={isPending}
            />
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto rounded-lg border">
            {isTeachersLoading ? (
              <p className="px-4 py-10 text-center text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <Spinner /> Loading teachers...
                </span>
              </p>
            ) : isTeachersError ? (
              <div className="flex flex-col items-center gap-2 px-4 py-10 text-center text-sm text-muted-foreground">
                <span>Couldn&apos;t load available teachers.</span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => void refetchTeachers()}
                >
                  Try again
                </Button>
              </div>
            ) : teachers.length === 0 ? (
              <p className="px-4 py-10 text-center text-sm text-muted-foreground">
                {debouncedSearchTerm
                  ? "No teachers match this search."
                  : "No teachers are available to assign."}
              </p>
            ) : (
              <ul className="divide-y">
                {teachers.map((teacher) => {
                  const teacherId = teacher.teacher_id;
                  const isSelected = selectedTeacherIds.includes(teacherId);
                  return (
                    <li key={teacherId}>
                      <label
                        htmlFor={`teacher-${teacherId}`}
                        className="flex cursor-pointer items-center gap-3 px-4 py-3 transition-colors hover:bg-muted/50 has-checked:bg-muted/40"
                      >
                        <input
                          id={`teacher-${teacherId}`}
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleTeacher(teacherId)}
                          disabled={isPending}
                          className="size-4 shrink-0 accent-primary"
                        />
                        <Avatar>
                          <AvatarImage src={teacher.profile_url ?? ""} alt="" />
                          <AvatarFallback>
                            {getInitials(teacher.name)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-medium">
                            {teacher.name}
                          </span>
                          <span className="block truncate text-sm text-muted-foreground">
                            {teacher.email}
                          </span>
                        </span>
                        <span className="hidden text-right text-xs text-muted-foreground sm:block">
                          {teacher.designation ||
                            teacher.specialization ||
                            teacher.degree ||
                            "Teacher"}
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        <DialogFooter className="-mx-4 -mb-4 flex-col-reverse items-stretch gap-2 border-t bg-muted/50 p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            {selectedTeacherIds.length} selected
          </p>
          <Button
            type="button"
            disabled={isPending || selectedTeacherIds.length === 0}
            onClick={handleAssign}
          >
            {isPending && <Spinner />}
            {isPending ? "Adding teachers..." : "Add teachers to course"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
