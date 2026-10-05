"use client";

import { useForm } from "@tanstack/react-form";
import type { FetchError } from "ofetch";
import {
  FormField,
  getDirtyFields,
  NumberField,
} from "@/components/shared/FormFields";
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
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateDepartment } from "@/hooks";
import { updateDepartmentSchema } from "@/schemas";
import type { Department, UpdateDepartmentPayload } from "@/types";
import triggerToast from "@/utils/triggerToast";

interface DepartmentFormValues {
  name: string;
  code: string;
  department_description: string;
  department_established_year: number | undefined;
}

function getDefaultValues(department: Department): DepartmentFormValues {
  return {
    name: department.name,
    code: department.code,
    department_description: department.department_description,
    department_established_year: department.department_established_year,
  };
}

function toPayload(values: DepartmentFormValues) {
  return {
    name: values.name || undefined,
    code: values.code || undefined,
    department_description: values.department_description || undefined,
    department_established_year:
      values.department_established_year || undefined,
  };
}

export default function UpdateDepartmentModal({
  department,
  open,
  onOpenChange,
}: {
  department: Department;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { mutate: updateDepartment, isPending } = useUpdateDepartment();
  const form = useForm({
    defaultValues: getDefaultValues(department),
    validators: {
      onSubmit: ({ value }) => {
        const result = updateDepartmentSchema.safeParse({
          department_id: department.id,
          ...value,
        });
        return result.success ? undefined : result.error;
      },
    },
    onSubmit: ({ value, formApi }) => {
      const dirtyValues = getDirtyFields(
        toPayload(value),
        (field) => formApi.getFieldMeta(field)?.isDirty ?? false,
      );

      const result = updateDepartmentSchema.safeParse({
        department_id: department.id,
        ...dirtyValues,
      });
      if (!result.success) return;

      const payload: UpdateDepartmentPayload = result.data;

      updateDepartment(payload, {
        onSuccess: (response) => {
          if (!response.success) {
            triggerToast({
              type: "error",
              title: "Department update failed",
              description: response.message || "Please try again.",
            });
            return;
          }

          triggerToast({
            type: "success",
            title: "Department updated",
            description: response.message || "The department was updated.",
          });
          onOpenChange(false);
        },
        onError: (error: FetchError) => {
          triggerToast({
            type: "error",
            title: "Department update failed",
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
        if (isPending && !nextOpen) return;
        if (nextOpen) form.reset(getDefaultValues(department));
        onOpenChange(nextOpen);
      }}
    >
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            form.handleSubmit();
          }}
        >
          <DialogHeader>
            <DialogTitle>Update department</DialogTitle>
            <DialogDescription>
              Update the details for {department.name}.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="grid gap-4 py-5 sm:grid-cols-2">
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
                  <FormField
                    id={field.name}
                    label="Department code"
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
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      rows={5}
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
