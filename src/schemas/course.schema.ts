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

export const assignTeacherToCourseSchema = z.object({
  course_details_id: z
    .number("Course details id should be a number")
    .int("Course details id must be an integer")
    .min(1, "Course details id must be provided"),
  teacher_id: z
    .array(z.uuid("Invalid teacher ID"))
    .min(1, "At least one teacher must be provided"),
});
