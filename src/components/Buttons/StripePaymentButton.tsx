"use client";
import { IconCreditCard } from "@tabler/icons-react";
import type { FetchError } from "ofetch";
import { useCreateStripeCheckout } from "@/hooks";
import type { CourseDetails } from "@/types";
import triggerToast from "@/utils/triggerToast";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

export default function StripePaymentButton({
  courseDetails,
}: {
  courseDetails: CourseDetails;
}) {
  const { mutate: create, isPending } = useCreateStripeCheckout();
  const handlePayment = () => {
    create(courseDetails.id, {
      onSuccess: (res) => {
        const url = res?.data?.stripe_checkout_url;
        console.log(res);
        if (!url || !res.success) {
          triggerToast({
            type: "error",
            title: "Payment Failed",
            description: res.message || "Internal server error",
          });
          return;
        }

        window.location.assign(url);
      },
      onError: (err: FetchError) => {
        const message = err.data.message;
        triggerToast({
          type: "error",
          title: "Payment Failed",
          description: message || "Internal server error",
        });
      },
    });
  };

  return (
    <Button
      type="button"
      className="w-full md:col-span-2 xl:col-span-1"
      disabled={!courseDetails || isPending}
      onClick={handlePayment}
    >
      {isPending && <Spinner />}
      <IconCreditCard aria-hidden="true" /> Pay with Stripe
    </Button>
  );
}
