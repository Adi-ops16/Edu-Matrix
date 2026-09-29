"use client";
import {
  IconEye,
  IconEyeClosed,
  IconFile,
  IconFileText,
  IconX,
} from "@tabler/icons-react";
import { useForm } from "@tanstack/react-form";
import { cn } from "cn";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FetchError } from "ofetch";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRegister } from "@/hooks";
import { registerSchema } from "@/schemas";
import GoogleAuthButton from "../Buttons/GoogleAuthButton";
import { Spinner } from "../ui/spinner";
import { toast } from "../ui/toast";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(true);

  const { mutate: register, isPending } = useRegister();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      photo: null as File | null,
    },

    validators: {
      onSubmit: registerSchema,
    },

    onSubmit: ({ value, formApi }) => {
      const data = {
        name: value.name,
        email: value.email,
        password: value.confirmPassword,
      };

      register(
        {
          data,
          photo: value.photo,
        },
        {
          onSuccess: (res) => {
            if (!res.success) {
              toast.add({
                type: "error",
                title: "Registration Failure",
                description: res.message || "Internal Server error",
              });
            }
            toast.add({
              type: "success",
              title: "Verify your email",
              description:
                res.message ||
                "Please provide the 6 digit otp sent to your email",
            });
            formApi.reset();
            router.push(`/registration/verify-email?email=${value.email}`);
          },
          onError: (err: FetchError) => {
            const message = err.data?.message;
            toast.add({
              type: "error",
              title: "Error occurred during registration",
              description: message || "Internal Server Error",
            });
          },
        },
      );
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="p-6 md:p-8"
          >
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Create your account</h1>
                <p className="text-sm text-balance text-muted-foreground">
                  Enter your email below to create your account
                </p>
              </div>

              {/* name */}
              <form.Field name="name">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                      <Input
                        name={field.name}
                        id={field.name}
                        type="text"
                        onBlur={field.handleBlur}
                        placeholder="Your name"
                        onChange={(e) => field.handleChange(e.target.value)}
                        value={field.state.value}
                        aria-invalid={isInvalid}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              {/* email */}
              <form.Field name="email">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                      <Input
                        name={field.name}
                        id={field.name}
                        type="email"
                        onBlur={field.handleBlur}
                        placeholder="m@example.com"
                        onChange={(e) => field.handleChange(e.target.value)}
                        value={field.state.value}
                        aria-invalid={isInvalid}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              <Field className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <form.Field name="password">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() =>
                              setShowPassword((visible) => !visible)
                            }
                            className="absolute right-2 translate-y-1.5"
                            aria-label={
                              showPassword ? "Hide password" : "Show password"
                            }
                          >
                            {showPassword ? (
                              <IconEye size={20} />
                            ) : (
                              <IconEyeClosed size={20} />
                            )}
                          </button>
                          <Input
                            name={field.name}
                            id={field.name}
                            type={showPassword ? "text" : "password"}
                            onBlur={field.handleBlur}
                            placeholder="your password"
                            onChange={(e) => field.handleChange(e.target.value)}
                            value={field.state.value}
                            aria-invalid={isInvalid}
                          />
                        </div>
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>

                <form.Field name="confirmPassword">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          Confirm Password
                        </FieldLabel>
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() =>
                              setShowPassword((visible) => !visible)
                            }
                            className="absolute right-2 translate-y-1.5"
                            aria-label={
                              showPassword ? "Hide password" : "Show password"
                            }
                          >
                            {showPassword ? (
                              <IconEye size={20} />
                            ) : (
                              <IconEyeClosed size={20} />
                            )}
                          </button>
                          <Input
                            name={field.name}
                            id={field.name}
                            type={showPassword ? "text" : "password"}
                            onBlur={field.handleBlur}
                            placeholder="confirm password"
                            onChange={(e) => field.handleChange(e.target.value)}
                            value={field.state.value}
                            aria-invalid={isInvalid}
                          />
                        </div>
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>
              </Field>

              <form.Field name="photo">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  const file = field.state.value;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Profile Picture
                      </FieldLabel>
                      <div className="flex flex-wrap items-center gap-3">
                        <Button
                          render={<FieldLabel htmlFor={field.name} />}
                          nativeButton={false}
                          variant="outline"
                        >
                          <IconFile size="4" />
                          select profile picture
                        </Button>
                        <input
                          id={field.name}
                          name={field.name}
                          type="file"
                          className="sr-only"
                          onChange={(e) => {
                            const selectedFile = e.target.files?.[0] ?? null;
                            field.handleChange(selectedFile);
                            e.target.value = "";
                          }}
                        />
                        {file && (
                          <span className="inline-flex max-w-full items-center gap-2 rounded-lg bg-muted px-2.5 py-1 text-sm">
                            <IconFileText className="size-4 shrink-0 text-primary" />
                            <span className="truncate">
                              {" "}
                              {file.name.slice(0, 20)}
                              {file.name.length > 21 && "..."}
                            </span>
                            <button
                              type="button"
                              aria-label="Remove resume"
                              onClick={() => {
                                field.handleChange(null);
                                field.handleBlur();
                              }}
                              className="text-muted-foreground transition-colors hover:text-destructive focus:outline-none"
                            >
                              <IconX className="size-4" />
                            </button>
                          </span>
                        )}
                      </div>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              <Button disabled={isPending} type="submit">
                {isPending && <Spinner />}
                {isPending ? "Registering.." : "Create Account"}
              </Button>

              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or
              </FieldSeparator>

              <GoogleAuthButton isRegister />

              <FieldDescription className="text-center">
                Already have an account? <Link href="/login">Sign in</Link>
              </FieldDescription>
            </FieldGroup>
          </form>

          <div className="relative hidden bg-muted md:block">
            <Image
              width={100}
              height={200}
              src="/registerBanner.png"
              alt="Register form image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.8]"
            />
          </div>
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="/">Terms of Service</a>{" "}
        and <a href="/">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
