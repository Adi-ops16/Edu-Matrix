import { IconCheck, IconX } from "@tabler/icons-react";
import type { FetchError } from "ofetch";
import { Button } from "@/components/ui/button";
import { useReviewJoiningApplications } from "@/hooks";
import type { User } from "@/types";
import triggerToast from "@/utils/triggerToast";

export default function ActionButtons({ user }: { user: User }) {
  const { mutate: review, isPending } = useReviewJoiningApplications();

  function handleReview(membershipStatus: "APPROVED" | "DECLINED") {
    review(
      {
        user_id: user.id,
        membership_status: membershipStatus,
      },
      {
        onSuccess: (response) => {
          if (!response.success) {
            triggerToast({
              type: "error",
              title: "Review failed",
              description: response.message || "Please try again.",
            });
            return;
          }

          triggerToast({
            type: "success",
            title:
              membershipStatus === "APPROVED"
                ? "Application approved"
                : "Application rejected",
            description:
              response.message || "The application status was updated.",
          });
        },
        onError: (error: FetchError) => {
          triggerToast({
            type: "error",
            title: "Review failed",
            description: error.data?.message || "Internal Server Error",
          });
        },
      },
    );
  }

  return (
    <div className="flex items-center justify-self-end gap-2">
      <Button
        type="button"
        size="sm"
        onClick={() => handleReview("APPROVED")}
        disabled={isPending}
      >
        <IconCheck aria-hidden="true" />
        Approve
      </Button>
      <Button
        type="button"
        size="sm"
        variant="destructive"
        onClick={() => handleReview("DECLINED")}
        disabled={isPending}
      >
        <IconX aria-hidden="true" />
        Reject
      </Button>
    </div>
  );
}
