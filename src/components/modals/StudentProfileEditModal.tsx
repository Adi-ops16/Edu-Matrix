"use client";

import { IconEdit } from "@tabler/icons-react";
import { useForm } from "@tanstack/react-form";
import type { FetchError } from "ofetch";
import { useState } from "react";
import { useUpdateStudentProfile } from "@/hooks";
import { studentProfileUpdateSchema } from "@/schemas";
import type { Gender, StudentDetails } from "@/types";
import { genderOptions } from "@/utils/formUtils";
import triggerToast from "@/utils/triggerToast";
import { FormField, getDirtyFields, NumberField } from "../shared/FormFields";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Spinner } from "../ui/spinner";

interface StudentFormValues {
  admission_year: number | undefined;
  graduation_year: number | undefined;
  date_of_birth: string;
  gender: Gender | undefined;
  phone: string;
  address: string;
}

function getDefaultValues(student: StudentDetails | null): StudentFormValues {
  return {
    admission_year: student?.admission_year ?? undefined,
    graduation_year: student?.graduation_year ?? undefined,
    date_of_birth: student?.date_of_birth?.slice(0, 10) ?? "",
    gender: student?.gender ?? undefined,
    phone: student?.phone ?? "",
    address: student?.address ?? "",
  };
}

function toPayload(values: StudentFormValues) {
  return {
    admission_year: values.admission_year,
    graduation_year: values.graduation_year,
    date_of_birth: values.date_of_birth || undefined,
    gender: values.gender,
    phone: values.phone.trim() || undefined,
    address: values.address.trim() || undefined,
  };
}

export default function StudentProfileEditModal({
  student,
}: {
  student: StudentDetails | null;
}) {
  const [open, setOpen] = useState(false);
  const { mutate: update, isPending } = useUpdateStudentProfile();

  const form = useForm({
    defaultValues: getDefaultValues(student),
    validators: {
      onSubmit: ({ value }) => {
        const result = studentProfileUpdateSchema.safeParse(toPayload(value));
        return result.success ? undefined : result.error;
      },
    },
    onSubmit: ({ value, formApi }) => {
      const dirtyValues = getDirtyFields(
        toPayload(value),
        (field) => formApi.getFieldMeta(field)?.isDirty ?? false,
      );
      const result = studentProfileUpdateSchema.safeParse(dirtyValues);
      if (!result.success) return;

      update(result.data, {
        onSuccess: (response) => {
          if (!response.success) {
            triggerToast({
              type: "error",
              title: "Student profile update failed",
              description: response.message || "Please try again.",
            });
            return;
          }

          triggerToast({
            type: "success",
            title: "Student profile updated",
            description: response.message || "Your profile has been updated.",
          });
          setOpen(false);
        },
        onError: (error: FetchError) => {
          triggerToast({
            type: "error",
            title: "Student profile update failed",
            description: error.data?.message || "Internal Server Error",
          });
        },
      });
    },
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) form.reset();
        setOpen(nextOpen);
      }}
    >
      <DialogTrigger
        render={
          <Button type="button" variant="outline" size="sm">
            <IconEdit aria-hidden="true" />
            Edit
          </Button>
        }
      />
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            form.handleSubmit();
          }}
        >
          <DialogHeader>
            <DialogTitle>Edit student details</DialogTitle>
            <DialogDescription>
              Update your academic and personal information.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="py-5">
            <section className="space-y-3">
              <h3 className="border-b pb-2 text-sm font-medium">Academic</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <form.Field name="admission_year">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <NumberField
                        id={field.name}
                        label="Admission year"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={field.handleChange}
                        isInvalid={isInvalid}
                        errors={field.state.meta.errors}
                        disabled={isPending}
                      />
                    );
                  }}
                </form.Field>
                <form.Field name="graduation_year">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <NumberField
                        id={field.name}
                        label="Graduation year"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={field.handleChange}
                        isInvalid={isInvalid}
                        errors={field.state.meta.errors}
                        disabled={isPending}
                      />
                    );
                  }}
                </form.Field>
              </div>
            </section>

            <section className="space-y-3">
              <h3 className="border-b pb-2 text-sm font-medium">Personal</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <form.Field name="date_of_birth">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <FormField
                        id={field.name}
                        label="Date of birth"
                        type="date"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={field.handleChange}
                        isInvalid={isInvalid}
                        errors={field.state.meta.errors}
                        disabled={isPending}
                      />
                    );
                  }}
                </form.Field>
                <form.Field name="gender">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Gender</FieldLabel>
                        <Select
                          value={field.state.value ?? null}
                          onValueChange={(value) =>
                            field.handleChange(
                              (value as Gender | null) ?? undefined,
                            )
                          }
                          disabled={isPending}
                        >
                          <SelectTrigger
                            id={field.name}
                            className="w-full"
                            aria-invalid={isInvalid}
                          >
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Gender</SelectLabel>
                              {genderOptions.map((option) => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>
                <form.Field name="phone">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <FormField
                        id={field.name}
                        label="Phone"
                        type="tel"
                        autoComplete="tel"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={field.handleChange}
                        isInvalid={isInvalid}
                        errors={field.state.meta.errors}
                        disabled={isPending}
                      />
                    );
                  }}
                </form.Field>
                <form.Field name="address">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <FormField
                        id={field.name}
                        label="Address"
                        autoComplete="street-address"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={field.handleChange}
                        isInvalid={isInvalid}
                        errors={field.state.meta.errors}
                        disabled={isPending}
                        className="sm:col-span-2"
                      />
                    );
                  }}
                </form.Field>
              </div>
            </section>
          </FieldGroup>
          <DialogFooter>
            <DialogClose
              render={
                <Button variant="outline" disabled={isPending}>
                  Cancel
                </Button>
              }
            />
            <form.Subscribe
              selector={(state) => [state.isDefaultValue, state.canSubmit]}
            >
              {([isDefaultValue, canSubmit]) => (
                <Button
                  type="submit"
                  disabled={isPending || isDefaultValue || !canSubmit}
                >
                  {isPending && <Spinner />}
                  {isPending ? "Saving..." : "Save changes"}
                </Button>
              )}
            </form.Subscribe>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
