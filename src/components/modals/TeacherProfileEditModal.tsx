"use client";

import { IconEdit, IconFile, IconFileText, IconX } from "@tabler/icons-react";
import { useForm } from "@tanstack/react-form";
import type { FetchError } from "ofetch";
import { useState } from "react";
import { useUpdateTeacherProfile } from "@/hooks";
import { teacherProfileUpdateSchema } from "@/schemas";
import type {
  Gender,
  TeacherDetails,
  TeacherProfileUpdatePayload,
} from "@/types";
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
import { Textarea } from "../ui/textarea";

interface TeacherFormValues {
  designation: string;
  degree: string;
  specialization: string;
  graduated_from: string;
  graduation_year: number | undefined;
  date_of_birth: string;
  gender: Gender | undefined;
  phone: string;
  address: string;
  joining_year: number | undefined;
  bio: string;
  certificate: File | undefined;
}

function getDefaultValues(teacher: TeacherDetails | null): TeacherFormValues {
  return {
    designation: teacher?.designation ?? "",
    degree: teacher?.degree ?? "",
    specialization: teacher?.specialization ?? "",
    graduated_from: teacher?.graduated_from ?? "",
    graduation_year: teacher?.graduation_year ?? undefined,
    date_of_birth: teacher?.date_of_birth?.slice(0, 10) ?? "",
    gender: teacher?.gender ?? undefined,
    phone: teacher?.phone ?? "",
    address: teacher?.address ?? "",
    joining_year: teacher?.joining_year ?? undefined,
    bio: teacher?.bio ?? "",
    certificate: undefined,
  };
}

function toPayload(values: TeacherFormValues) {
  return {
    designation: values.designation.trim() || undefined,
    degree: values.degree.trim() || undefined,
    specialization: values.specialization.trim() || undefined,
    graduated_from: values.graduated_from.trim() || undefined,
    graduation_year: values.graduation_year,
    date_of_birth: values.date_of_birth || undefined,
    gender: values.gender,
    phone: values.phone.trim() || undefined,
    address: values.address.trim() || undefined,
    joining_year: values.joining_year,
    bio: values.bio.trim() || undefined,
    certificate: values.certificate,
  };
}

export default function TeacherProfileEditModal({
  teacher,
}: {
  teacher: TeacherDetails | null;
}) {
  const [open, setOpen] = useState(false);
  const { mutate: update, isPending } = useUpdateTeacherProfile();

  const form = useForm({
    defaultValues: getDefaultValues(teacher),
    validators: {
      onSubmit: ({ value }) => {
        const result = teacherProfileUpdateSchema.safeParse(toPayload(value));
        return result.success ? undefined : result.error;
      },
    },
    onSubmit: ({ value, formApi }) => {
      const dirtyValues = getDirtyFields(
        toPayload(value),
        (field) => formApi.getFieldMeta(field)?.isDirty ?? false,
      );
      const result = teacherProfileUpdateSchema.safeParse(dirtyValues);
      if (!result.success) return;

      const payload: TeacherProfileUpdatePayload = result.data;
      update(payload, {
        onSuccess: (response) => {
          if (!response.success) {
            triggerToast({
              type: "error",
              title: "Teacher profile update failed",
              description: response.message || "Please try again.",
            });
            return;
          }

          triggerToast({
            type: "success",
            title: "Teacher profile updated",
            description: response.message || "Your profile has been updated.",
          });
          setOpen(false);
        },
        onError: (error: FetchError) => {
          triggerToast({
            type: "error",
            title: "Teacher profile update failed",
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
        if (nextOpen) form.reset(getDefaultValues(teacher));
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
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            form.handleSubmit();
          }}
        >
          <DialogHeader>
            <DialogTitle>Edit teaching details</DialogTitle>
            <DialogDescription>
              Update your professional and personal information.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="py-5">
            <section className="space-y-3">
              <h3 className="border-b pb-2 text-sm font-medium">
                Professional
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <form.Field name="designation">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <FormField
                        id={field.name}
                        label="Designation"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={field.handleChange}
                        disabled={isPending}
                        isInvalid={isInvalid}
                        errors={field.state.meta.errors}
                      />
                    );
                  }}
                </form.Field>
                <form.Field name="degree">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <FormField
                        id={field.name}
                        label="Degree"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={field.handleChange}
                        disabled={isPending}
                        isInvalid={isInvalid}
                        errors={field.state.meta.errors}
                      />
                    );
                  }}
                </form.Field>
                <form.Field name="specialization">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <FormField
                        id={field.name}
                        label="Specialization"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={field.handleChange}
                        disabled={isPending}
                        isInvalid={isInvalid}
                        errors={field.state.meta.errors}
                      />
                    );
                  }}
                </form.Field>
                <form.Field name="graduated_from">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <FormField
                        id={field.name}
                        label="Graduated from"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={field.handleChange}
                        disabled={isPending}
                        isInvalid={isInvalid}
                        errors={field.state.meta.errors}
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
                        disabled={isPending}
                        isInvalid={isInvalid}
                        errors={field.state.meta.errors}
                      />
                    );
                  }}
                </form.Field>
                <form.Field name="joining_year">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <NumberField
                        id={field.name}
                        label="Joining year"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={field.handleChange}
                        disabled={isPending}
                        isInvalid={isInvalid}
                        errors={field.state.meta.errors}
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
                        disabled={isPending}
                        isInvalid={isInvalid}
                        errors={field.state.meta.errors}
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
                        disabled={isPending}
                        isInvalid={isInvalid}
                        errors={field.state.meta.errors}
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
                        disabled={isPending}
                        isInvalid={isInvalid}
                        errors={field.state.meta.errors}
                      />
                    );
                  }}
                </form.Field>
                <form.Field name="bio">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid} className="sm:col-span-2">
                        <FieldLabel htmlFor={field.name}>About</FieldLabel>
                        <Textarea
                          id={field.name}
                          name={field.name}
                          rows={4}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(event) =>
                            field.handleChange(event.target.value)
                          }
                          aria-invalid={isInvalid}
                          disabled={isPending}
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>
              </div>
            </section>

            <section className="space-y-3">
              <h3 className="border-b pb-2 text-sm font-medium">Certificate</h3>
              <form.Field name="certificate">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  const file = field.state.value;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Professional document
                      </FieldLabel>
                      <div className="flex flex-wrap items-center gap-3">
                        <Button
                          render={<FieldLabel htmlFor={field.name} />}
                          nativeButton={false}
                          variant="outline"
                          disabled={isPending}
                        >
                          <IconFile aria-hidden="true" />
                          Select document
                        </Button>
                        <input
                          id={field.name}
                          name={field.name}
                          type="file"
                          accept="image/png,image/jpeg,application/pdf"
                          className="sr-only"
                          disabled={isPending}
                          onChange={(event) => {
                            field.handleChange(event.currentTarget.files?.[0]);
                            event.currentTarget.value = "";
                          }}
                        />
                        {file && (
                          <span className="inline-flex max-w-full items-center gap-2 rounded-lg bg-muted px-2.5 py-1 text-sm">
                            <IconFileText
                              className="size-4 shrink-0 text-primary"
                              aria-hidden="true"
                            />
                            <span className="truncate">
                              {file.name.slice(0, 20)}
                              {file.name.length > 21 && "..."}
                            </span>
                            <button
                              type="button"
                              aria-label="Remove selected document"
                              disabled={isPending}
                              onClick={() => {
                                field.handleChange(undefined);
                                field.handleBlur();
                              }}
                              className="text-muted-foreground transition-colors hover:text-destructive focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                            >
                              <IconX className="size-4" aria-hidden="true" />
                            </button>
                          </span>
                        )}
                      </div>
                      {teacher?.certificate_url && !file && (
                        <a
                          className="text-sm text-primary underline-offset-4 hover:underline"
                          href={teacher.certificate_url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          View current certificate
                        </a>
                      )}
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
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
