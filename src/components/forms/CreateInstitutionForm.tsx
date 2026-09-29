"use client";

import { IconBuilding, IconGlobe, IconMapPin } from "@tabler/icons-react";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import type { FetchError } from "ofetch";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { useCreateInstitution } from "@/hooks";
import { createInstitutionSchema } from "@/schemas";
import { Spinner } from "../ui/spinner";

export default function CreateInstitutionForm() {
  const { mutate: create, isPending } = useCreateInstitution();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      code: "",
      description: "",
      established_year: 0,
      website: "",
      address: "",
      city: "",
      contact_email: "",
      contact_number: "",
    },
    validators: {
      onSubmit: createInstitutionSchema,
    },
    onSubmit: ({ value }) => {
      const institution = {
        ...value,
        website: value.website || undefined,
      };

      create(institution, {
        onSuccess: (res) => {
          if (!res.success) {
            toast.add({
              type: "error",
              title: "Failed to create institution",
              description: res.message || "Internal Server error",
            });
          }
          toast.add({
            type: "success",
            title: "Institution created successfully",
            description:
              "Your application has been sent. please wait for an admin to accept your application",
          });
          router.push(`/institution_admin`);
        },
        onError: (err: FetchError) => {
          const message = err.data?.message;
          toast.add({
            type: "error",
            title: "Error while creating institution",
            description: message || "Internal Server Error",
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
      className="space-y-7"
    >
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-border pb-2">
          <IconBuilding className="size-4 text-primary" aria-hidden="true" />
          <h2 className="text-sm font-semibold">Institution details</h2>
        </div>

        <FieldGroup className="grid gap-4 sm:grid-cols-2">
          <form.Field name="name">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid} className="sm:col-span-2">
                  <FieldLabel htmlFor={field.name}>Institution name</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="e.g. Dhaka University of Engineering and Technology"
                    maxLength={255}
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="code">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Institution code</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="e.g. DUET"
                    maxLength={50}
                    aria-invalid={isInvalid}
                  />
                  <FieldDescription>
                    Letters, numbers, hyphens, or underscores.
                  </FieldDescription>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="established_year">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Year established</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="number"
                    inputMode="numeric"
                    min={1000}
                    max={new Date().getFullYear()}
                    step={1}
                    value={field.state.value || ""}
                    onBlur={field.handleBlur}
                    onChange={(event) => {
                      const value = event.target.value;
                      field.handleChange(value ? Number(value) : 0);
                    }}
                    placeholder="e.g. 1980"
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="description">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid} className="sm:col-span-2">
                  <FieldLabel htmlFor={field.name}>
                    About the institution
                  </FieldLabel>
                  <textarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="Share a short description of the institution"
                    rows={4}
                    maxLength={1000}
                    aria-invalid={isInvalid}
                    className="w-full resize-y rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20"
                  />
                  <FieldDescription>10 to 1,000 characters.</FieldDescription>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        </FieldGroup>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-border pb-2">
          <IconMapPin className="size-4 text-primary" aria-hidden="true" />
          <h2 className="text-sm font-semibold">Location and contact</h2>
        </div>
        <FieldGroup className="grid gap-4 sm:grid-cols-2">
          <form.Field name="address">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid} className="sm:col-span-2">
                  <FieldLabel htmlFor={field.name}>Street address</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="Building, street, area"
                    maxLength={255}
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="city">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>City</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="e.g. Gazipur"
                    maxLength={15}
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="website">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Website{" "}
                    <span className="font-normal text-muted-foreground">
                      (optional)
                    </span>
                  </FieldLabel>
                  <div className="relative">
                    <IconGlobe
                      className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <Input
                      id={field.name}
                      name={field.name}
                      type="text"
                      value={field.state.value ?? ""}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      placeholder="https://example.edu"
                      className="pl-9"
                      aria-invalid={isInvalid}
                    />
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="contact_email">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Contact email</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="info@example.edu"
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="contact_number">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Contact number</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="tel"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="+880 2223 344556"
                    maxLength={20}
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        </FieldGroup>
      </section>

      <div className="flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={() => form.reset()}
          className="sm:min-w-32"
        >
          Reset form
        </Button>
        <Button type="submit" disabled={isPending} className="sm:min-w-40">
          {isPending && <Spinner />}
          {isPending ? "Creating.." : "Create institution"}
        </Button>
      </div>
    </form>
  );
}
