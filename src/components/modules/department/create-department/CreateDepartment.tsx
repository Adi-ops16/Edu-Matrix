"use client";

import { useForm } from "@tanstack/react-form";
import Link from "next/link";
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
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useCreateDepartment } from "@/hooks";
import { createDepartmentSchema } from "@/schemas";
import triggerToast from "@/utils/triggerToast";

export default function CreateDepartment() {
  const router = useRouter();
  const { mutate: createDepartment, isPending } = useCreateDepartment();

  const form = useForm({
    defaultValues: {
      name: "",
      code: "",
      department_description: "",
      department_established_year: undefined as number | undefined,
    },
    validators: {
      onSubmit: ({ value }) => {
        const result = createDepartmentSchema.safeParse(value);
        return result.success ? undefined : result.error;
      },
    },
    onSubmit: ({ value }) => {
      const result = createDepartmentSchema.safeParse(value);
      if (!result.success) return;

      createDepartment(result.data, {
        onSuccess: (response) => {
          if (!response.success) {
            triggerToast({
              type: "error",
              title: "Department creation failed",
              description: response.message || "Please try again.",
            });
            return;
          }

          triggerToast({
            type: "success",
            title: "Department created",
            description: response.message || "The department was created.",
          });
          router.push("/institution_admin/departments");
        },
        onError: (error: FetchError) => {
          triggerToast({
            type: "error",
            title: "Department creation failed",
            description: error.data?.message || "Internal Server Error",
          });
        },
      });
    },
  });

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <header>
        <Link
          href="/institution_admin/departments"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Departments
        </Link>
        <h1 className="mt-2 font-heading text-2xl font-semibold sm:text-3xl">
          Create department
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Add a department to your institution.
        </p>
      </header>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-6 rounded-lg border bg-card p-5 sm:p-6"
      >
        <FieldGroup className="grid gap-5 sm:grid-cols-2">
          <form.Field name="name">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <FormField
                  id={field.name}
                  label="Department name"
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
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Department code</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    maxLength={5}
                    disabled={isPending}
                    aria-invalid={isInvalid}
                  />
                  <FieldDescription>Up to 5 characters.</FieldDescription>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="department_established_year">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <NumberField
                  id={field.name}
                  label="Established year"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={field.handleChange}
                  isInvalid={isInvalid}
                  errors={field.state.meta.errors}
                  disabled={isPending}
                  min={1000}
                  step={1}
                />
              );
            }}
          </form.Field>

          <form.Field name="department_description">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid} className="sm:col-span-2">
                  <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                  <Textarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    rows={5}
                    disabled={isPending}
                    aria-invalid={isInvalid}
                    placeholder="Describe the department"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        </FieldGroup>

        <div className="flex justify-end gap-2 border-t pt-4">
          <Button
            type="button"
            variant="outline"
            disabled={isPending}
            onClick={() => router.push("/institution_admin/departments")}
          >
            Cancel
          </Button>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isDefaultValue]}
          >
            {([canSubmit, isDefaultValue]) => (
              <Button
                type="submit"
                disabled={isPending || !canSubmit || isDefaultValue}
              >
                {isPending && <Spinner />}
                {isPending ? "Creating..." : "Create department"}
              </Button>
            )}
          </form.Subscribe>
        </div>
      </form>
    </section>
  );
}
