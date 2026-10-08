"use client";

import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import type { FetchError } from "ofetch";
import type z from "zod";
import { FormField, NumberField } from "@/components/shared/FormFields";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { useCreateCourseDetails } from "@/hooks";
import { createCourseDetailsSchema } from "@/schemas";
import triggerToast from "@/utils/triggerToast";

type CourseDetailsFormValues = z.input<typeof createCourseDetailsSchema>;

export default function CreateCourseDetailsForm({
  courseId,
}: {
  courseId: string;
}) {
  const router = useRouter();
  const { mutate: createCourseDetails, isPending } = useCreateCourseDetails();

  const form = useForm({
    defaultValues: {
      semester: "",
      batch: "",
      start_date: "",
      end_date: "",
      price: undefined,
      currency: "USD",
      status: "UPCOMING",
    } as CourseDetailsFormValues,
    validators: {
      onSubmit: createCourseDetailsSchema,
    },
    onSubmit: ({ value }) => {
      const payload = {
        course_id: courseId,
        details: {
          ...value,
          price: value.price as number,
          start_date: value.start_date || undefined,
          end_date: value.end_date || undefined,
          currency: value.currency.toUpperCase(),
        },
      };

      createCourseDetails(payload, {
        onSuccess: (response) => {
          if (!response.success) {
            triggerToast({
              type: "error",
              title: "Course offering creation failed",
              description: response.message || "Please try again.",
            });
            return;
          }

          triggerToast({
            type: "success",
            title: "Course offering created",
            description: response.message || "The course offering was created.",
          });
          router.push(`/institution_admin/courses/${courseId}`);
        },
        onError: (error: FetchError) => {
          triggerToast({
            type: "error",
            title: "Course offering creation failed",
            description: error.data?.message || "Internal Server Error",
          });
        },
      });
    },
  });

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-6 rounded-lg border bg-card p-5 sm:p-6"
    >
      <FieldGroup className="grid gap-5 sm:grid-cols-2">
        <form.Field name="semester">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <FormField
                id={field.name}
                label="Semester"
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

        <form.Field name="batch">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <FormField
                id={field.name}
                label="Batch"
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

        <form.Field name="start_date">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <FormField
                id={field.name}
                label="Start date"
                type="date"
                value={field.state.value ?? ""}
                onBlur={field.handleBlur}
                onChange={field.handleChange}
                isInvalid={isInvalid}
                errors={field.state.meta.errors}
                disabled={isPending}
              />
            );
          }}
        </form.Field>

        <form.Field name="end_date">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <FormField
                id={field.name}
                label="End date"
                type="date"
                value={field.state.value ?? ""}
                onBlur={field.handleBlur}
                onChange={field.handleChange}
                isInvalid={isInvalid}
                errors={field.state.meta.errors}
                disabled={isPending}
              />
            );
          }}
        </form.Field>

        <form.Field name="price">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <NumberField
                id={field.name}
                label="Price"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(value) => field.handleChange(value)}
                isInvalid={isInvalid}
                errors={field.state.meta.errors}
                disabled={isPending}
              />
            );
          }}
        </form.Field>

        <form.Field name="currency">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Currency</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  maxLength={3}
                  disabled={isPending}
                  aria-invalid={isInvalid}
                  placeholder="USD"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="status">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Status</FieldLabel>
              <Select
                items={[
                  { value: "UPCOMING", label: "Upcoming" },
                  { value: "ONGOING", label: "Ongoing" },
                ]}
                value={field.state.value}
                onValueChange={(value) => {
                  if (value === "UPCOMING" || value === "ONGOING") {
                    field.handleChange(value);
                  }
                }}
              >
                <SelectTrigger
                  id={field.name}
                  className="w-full"
                  disabled={isPending}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UPCOMING">Upcoming</SelectItem>
                  <SelectItem value="ONGOING">Ongoing</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          )}
        </form.Field>
      </FieldGroup>

      <div className="flex justify-end gap-2 border-t pt-4">
        <Button
          type="button"
          variant="outline"
          disabled={isPending}
          onClick={() => router.push(`/institution_admin/courses/${courseId}`)}
        >
          Cancel
        </Button>
        <form.Subscribe selector={(state) => state.canSubmit}>
          {(canSubmit) => (
            <Button type="submit" disabled={isPending || !canSubmit}>
              {isPending && <Spinner />}
              {isPending ? "Creating..." : "Create offering"}
            </Button>
          )}
        </form.Subscribe>
      </div>
    </form>
  );
}
