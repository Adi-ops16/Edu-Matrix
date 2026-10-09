export type PaymentStatus = "PENDING" | "SUCCESS" | "FAILED" | "REFUNDED";
export type PaymentGateway = "STRIPE" | "SSLCOMMERZ" | "BKASH";

export interface Payment {
  course_details_id: number;
  payment_id: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  payment_gateway: PaymentGateway;
  transaction_id: string | null;
  institution_id: number;
  student_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface PaymentDetailsResponse extends Payment {
  course: {
    title: string;
    batch: string;
    semester: string;
    start_date: Date | null;
    end_date: Date | null;
  };
}
