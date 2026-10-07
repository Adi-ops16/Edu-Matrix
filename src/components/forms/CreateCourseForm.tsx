"use client";

import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import type { FetchError } from "ofetch";
import { FormField, NumberField } from "@/components/shared/FormFields";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
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
import { Textarea } from "@/components/ui/textarea";
import { useCreateCourse, useGetDepartments } from "@/hooks";
import { createCourseSchema } from "@/schemas";
import type { TCreateCoursePayload } from "@/types";
import triggerToast from "@/utils/triggerToast";

function toPayload(values: TCreateCoursePayload) {
  const payload = {
    title: values.title,
    code: values.code,
    description: values.description || undefined,
    learning_outcomes: values.learning_outcomes,
    department_id: values.department_id,
    ...(values.include_details && {
      course_details: {
        semester: values.semester,
        batch: values.batch,
        start_date: values.start_date || undefined,
        end_date: values.end_date || undefined,
        price: values.price ?? 0,
        currency: values.currency,
        status: values.status,
      },
    }),
  };

  return payload;
}

export default function CreateCourseForm() {
  const router = useRouter();
  const { data: departmentResponse } = useGetDepartments();
  const departments = departmentResponse.data?.departments ?? [];
  const { mutate: createCourse, isPending } = useCreateCourse();

  const form = useForm({
    defaultValues: {
      title: "",
      code: "",
      description: "",
      learning_outcomes: [],
      department_id: departments[0]?.id ?? "",
      include_details: false,
      semester: "",
      batch: "",
      start_date: "",
      end_date: "",
      price: 0,
      currency: "USD",
      status: "UPCOMING",
    } as TCreateCoursePayload,
    validators: {
      onSubmit: createCourseSchema,
    },
    onSubmit: ({ value }) => {
      const payload = toPayload(value);

      createCourse(payload, {
        onSuccess: (response) => {
          if (!response.success) {
            triggerToast({
              type: "error",
              title: "Course creation failed",
              description: response.message || "Please try again.",
            });
            return;
          }

          triggerToast({
            type: "success",
            title: "Course created",
            description: response.message || "The course was created.",
          });
          router.push("/institution_admin/courses");
        },
        onError: (error: FetchError) => {
          triggerToast({
            type: "error",
            title: "Course creation failed",
            description: error.data?.message || "Internal Server Error",
          });
        },
      });
    },
  });

  if (departments.length === 0) {
    return (
      <div className="rounded-lg border bg-card px-6 py-10 text-center">
        <p className="text-sm text-muted-foreground">
          You need to create a department before adding a course.
        </p>
        <Button
          type="button"
          className="mt-4"
          onClick={() => router.push("/institution_admin/create-department")}
        >
          Create department
        </Button>
      </div>
    );
  }

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
        <form.Field name="title">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <FormField
                id={field.name}
                label="Course title"
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

        <form.Field name="code">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <FormField
                id={field.name}
                label="Course code"
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

        <form.Field name="department_id">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Department</FieldLabel>
                <Select
                  items={departments.map((department) => ({
                    value: department.id,
                    label: `${department.name} (${department.code})`,
                  }))}
                  value={field.state.value}
                  onValueChange={(value) => field.handleChange(value ?? "")}
                >
                  <SelectTrigger
                    id={field.name}
                    className="w-full"
                    disabled={isPending}
                    aria-invalid={isInvalid}
                  >
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((department) => (
                      <SelectItem key={department.id} value={department.id}>
                        {department.name} ({department.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="include_details">
          {(field) => (
            <Field className="sm:col-span-2">
              <label
                htmlFor="include-course-details"
                className="flex items-center gap-2 text-sm font-medium"
              >
                <Input
                  id="include-course-details"
                  type="checkbox"
                  checked={field.state.value}
                  onChange={(event) => field.handleChange(event.target.checked)}
                  disabled={isPending}
                  className="size-4 cursor-pointer"
                />
                Add course schedule and pricing
              </label>
            </Field>
          )}
        </form.Field>

        <form.Field name="description">
          {(field) => (
            <Field className="sm:col-span-2">
              <FieldLabel htmlFor={field.name}>Description</FieldLabel>
              <Textarea
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                rows={4}
                disabled={isPending}
                placeholder="Describe the course"
              />
            </Field>
          )}
        </form.Field>

        <form.Field name="learning_outcomes">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            const stringValue = Array.isArray(field.state.value)
              ? field.state.value.join("\n")
              : "";
            return (
              <Field data-invalid={isInvalid} className="sm:col-span-2">
                <FieldLabel htmlFor={field.name}>Learning outcomes</FieldLabel>
                <Textarea
                  id={field.name}
                  name={field.name}
                  value={stringValue}
                  onBlur={field.handleBlur}
                  onChange={(event) => {
                    const lines = event.target.value.split("\n");
                    field.handleChange(lines);
                  }}
                  rows={4}
                  disabled={isPending}
                  aria-invalid={isInvalid}
                  placeholder="Enter one learning outcome per line"
                />
                <FieldDescription>
                  Add at least one outcome, with each outcome on its own line.
                </FieldDescription>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Subscribe selector={(state) => state.values.include_details}>
          {(includeDetails) =>
            includeDetails ? (
              <>
                <form.Field name="semester">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <FormField
                        id={field.name}
                        label="Semester"
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

                <form.Field name="batch">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <FormField
                        id={field.name}
                        label="Batch"
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

                <form.Field name="start_date">
                  {(field) => (
                    <FormField
                      id={field.name}
                      label="Start date"
                      type="date"
                      value={field.state.value ?? ""}
                      onBlur={field.handleBlur}
                      onChange={field.handleChange}
                      isInvalid={false}
                      disabled={isPending}
                    />
                  )}
                </form.Field>

                <form.Field name="end_date">
                  {(field) => (
                    <FormField
                      id={field.name}
                      label="End date"
                      type="date"
                      value={field.state.value ?? ""}
                      onBlur={field.handleBlur}
                      onChange={field.handleChange}
                      isInvalid={false}
                      disabled={isPending}
                    />
                  )}
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
                        onChange={field.handleChange}
                        isInvalid={isInvalid}
                        errors={field.state.meta.errors}
                        disabled={isPending}
                        min={0}
                        step="0.01"
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
                          onChange={(event) =>
                            field.handleChange(event.target.value)
                          }
                          maxLength={3}
                          disabled={isPending}
                          aria-invalid={isInvalid}
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
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
              </>
            ) : null
          }
        </form.Subscribe>
      </FieldGroup>

      <div className="flex justify-end gap-2 border-t pt-4">
        <Button
          type="button"
          variant="outline"
          disabled={isPending}
          onClick={() => router.push("/institution_admin/courses")}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending && <Spinner />}
          {isPending ? "Creating..." : "Create course"}
        </Button>
      </div>
    </form>
  );
}
