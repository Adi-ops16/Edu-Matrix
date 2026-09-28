"use client";

import { IconShieldCheck } from "@tabler/icons-react";
import { useEffect } from "react";
import Logo from "@/components/shared/Logo";

const dashboardRoles = new Set([
  "student",
  "teacher",
  "super_admin",
  "institution_admin",
]);

export default function OAuthProgressPage() {
  useEffect(() => {
    const role = new URLSearchParams(window.location.search)
      .get("role")
      ?.toLowerCase();
    const destination =
      role && dashboardRoles.has(role) ? `/${role}` : "/select-institution";

    const timer = window.setTimeout(() => {
      window.location.replace(destination);
    }, 2000);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className="relative flex min-h-svh items-center justify-center overflow-hidden px-5 py-12 text-[#18221f]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[url('/progress-banner.svg')] bg-cover bg-center"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-black/35"
      />

      <div className="relative z-10 flex w-full max-w-md flex-col items-center">
        <div className="mb-8 [&_span]:text-[#146c52]">
          <Logo />
        </div>

        <section
          aria-labelledby="oauth-progress-title"
          aria-live="polite"
          className="w-full rounded-2xl border border-[#e4e9e6] bg-white px-7 py-9 text-center shadow-[0_24px_80px_-36px_rgba(20,50,38,0.28)] sm:px-10"
        >
          <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-[#eaf5ef] text-[#087653]">
            <IconShieldCheck size={30} stroke={1.7} aria-hidden="true" />
          </div>

          <h1
            id="oauth-progress-title"
            className="text-xl font-semibold tracking-normal"
          >
            Securing your account
          </h1>
          <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-[#66736d]">
            Your Google sign-in is complete. We’re preparing your Edu-Matrix
            workspace.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3 rounded-lg bg-[#f7faf8] px-4 py-3.5 text-left">
            <span
              aria-hidden="true"
              className="size-5 shrink-0 animate-spin rounded-full border-2 border-[#c8ded3] border-t-[#087653]"
            />
            <span className="text-sm font-medium text-[#34463d]">
              Finishing sign-in and redirecting...
            </span>
          </div>

          <p className="mt-5 text-xs text-[#87928c]">
            Please keep this page open for a moment.
          </p>
        </section>
      </div>
    </main>
  );
}
