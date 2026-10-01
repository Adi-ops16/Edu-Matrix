"use client";

import { useRouter } from "next/navigation";
import type { FetchError } from "ofetch";
import { type SubmitEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useApplyForInstitution, useGetInstitutions } from "@/hooks";
import triggerToast from "@/utils/triggerToast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function SelectInstitutionForm() {
  const { data, isError, refetch } = useGetInstitutions();
  const institutions = data?.data ?? [];
  const { mutate: apply, isPending } = useApplyForInstitution();

  const [institutionId, setInstitutionId] = useState("");
  const [role, setRole] = useState("student");
  const router = useRouter();

  const institutionItems = institutions.map((institution) => ({
    label: `${institution.name.length > 30 ? `${institution.name.slice(0, 30)}...` : institution.name} - ${institution.city}`,
    value: String(institution.id),
    fullName: institution.name,
  }));

  const roleItems = [
    { label: "Student", value: "student" },
    { label: "Teacher", value: "teacher" },
  ];

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const selectedInstitution = institutions.find(
      (institution) => String(institution.id) === institutionId,
    );

    const data = {
      institution_id: Number(selectedInstitution?.id),
      role: role.toUpperCase() as "STUDENT" | "TEACHER",
    };

    apply(data, {
      onSuccess: (res) => {
        if (!res.success) {
          triggerToast({
            type: "error",
            title: "Failed to apply",
            description: res.message || "Internal Server error",
          });
        }
        triggerToast({
          type: "success",
          title: "Applied successfully",
          description:
            "Your application has been sent. please wait for an admin to accept your application",
        });
        router.push(`${role.toLowerCase()}`);
      },
      onError: (err: FetchError) => {
        const message = err.data?.message;
        triggerToast({
          type: "error",
          title: "Error while applying",
          description: message || "Internal Server Error",
        });
      },
    });
  };

  return (
    <form className="w-full" onSubmit={(e) => handleSubmit(e)}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="institution">Institution</FieldLabel>
          <Select
            items={institutionItems}
            value={institutionId || null}
            onValueChange={(value) => setInstitutionId(value ?? "")}
          >
            <SelectTrigger
              id="institution"
              className="w-full"
              disabled={isPending || isError || institutions.length === 0}
            >
              <SelectValue placeholder="Select an institution" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Institutions</SelectLabel>
                {institutionItems.map((institution) => (
                  <SelectItem key={institution.value} value={institution.value}>
                    <Tooltip>
                      <TooltipTrigger
                        render={<span className="block max-w-full truncate" />}
                      >
                        {institution.label}
                      </TooltipTrigger>
                      <TooltipContent>{institution.fullName}</TooltipContent>
                    </Tooltip>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {isError && (
            <div className="flex items-center justify-between gap-3">
              <FieldDescription>
                Institutions could not be loaded.
              </FieldDescription>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => refetch()}
              >
                Try again
              </Button>
            </div>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="role">Your role</FieldLabel>
          <Select
            items={roleItems}
            value={role}
            onValueChange={(value) => setRole(value ?? "student")}
          >
            <SelectTrigger id="role" className="w-full">
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Roles</SelectLabel>
                {roleItems.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        <Button
          type="submit"
          disabled={isError || !institutionId}
          className="w-full"
        >
          {isPending && <Spinner />}
          Continue
        </Button>
      </FieldGroup>
    </form>
  );
}
