import z from "zod";

export const createCourseSchema = z
  .object({
    title: z.string().min(1, "Course title is required").max(100),
    code: z
      .string("Code should be a string")
      .min(1, "Course code is required")
      .max(10, "Course code must be less than 10 characters"),
    description: z.string().optional(),
    learning_outcomes: z
      .array(z.string())
      .transform((arr) => arr.map((item) => item.trim()).filter(Boolean))
      .pipe(
        z
          .array(z.string().min(1))
          .min(1, "At least one learning outcome is required"),
      ),
    department_id: z.uuid("Invalid department ID"),

    // Flat fields for your form state
    include_details: z.boolean(),
    semester: z.string().optional(),
    batch: z.string().optional(),
    start_date: z.string().optional(),
    end_date: z.string().optional(),
    price: z.number().optional(),
    currency: z.string().optional(),
    status: z.enum(["UPCOMING", "ONGOING", "COMPLETED"]).optional(),
  })
  .refine(
    (data) => {
      // If user toggled radio to include details, ensure required detail fields are present
      if (data.include_details) {
        return Boolean(
          data.semester && data.batch && data.start_date && data.end_date,
        );
      }
      return true;
    },
    {
      message:
        "Semester, batch, and price are required when course details are included",
      path: ["semester"],
    },
  );
