import { IconCheck, IconX } from "@tabler/icons-react";
import type { FetchError } from "ofetch";
import { Button } from "@/components/ui/button";
import { useReviewInstitution } from "@/hooks";
import type { Institution } from "@/types";
import triggerToast from "@/utils/triggerToast";

export default function ActionButtons({
  application,
}: {
  application: Institution;
}) {
  const { mutate: review, isPending } = useReviewInstitution();

  function handleReview(membershipStatus: "APPROVED" | "REJECTED") {
    review(
      {
        institution_id: application.id,
        status: membershipStatus,
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
                ? "Institution approved"
                : "Institution rejected",
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
    <div className="flex items-center gap-2">
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
        onClick={() => handleReview("REJECTED")}
        disabled={isPending}
      >
        <IconX aria-hidden="true" />
        Reject
      </Button>
    </div>
  );
}
