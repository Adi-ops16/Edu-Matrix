import apiClient from "@/lib/ofetch";
import type { ApiResponse, PaymentDetailsResponse } from "@/types";

const prefix = "/payment";

export const createStripeCheckout = (course_details_id: number) => {
  return apiClient<ApiResponse<{ stripe_checkout_url: string }>>(
    `${prefix}/create-stripe-checkout-session`,
    {
      method: "POST",
      body: { course_details_id },
    },
  );
};

export const getPaymentHistory = () => {
  return apiClient<ApiResponse<PaymentDetailsResponse[]>>(`${prefix}`);
};
