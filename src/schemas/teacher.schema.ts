import z from "zod";

export const teacherProfileUpdateSchema = z.object({
  designation: z.string("Designation must be a string").optional(),
  degree: z.string("Degree must be a string").optional(),
  specialization: z.string("Specialization must be a string").optional(),
  graduated_from: z.string("Graduated from must be a string").optional(),
  graduation_year: z
    .number("Graduation year should be a number")
    .int("Graduation year must be an integer")
    .positive("Graduation year must be a positive number")
    .optional(),
  date_of_birth: z.coerce
    .date("Invalid date format for date of birth")
    .optional(),
  gender: z
    .enum(["FEMALE", "MALE", "KINDER", "OTHER"], "Gender enum doesn't match")
    .optional(),
  phone: z
    .string("Phone must be text")
    .min(5, "Phone number is too short")
    .max(15, "Phone number is too long")
    .optional(),

  address: z.string("Address must be text").optional(),
  bio: z.string("Bio must be a string").optional(),
  joining_year: z
    .number("Joining year should be a number")
    .int("Joining year must be an integer")
    .positive("Joining year must be a positive number")
    .optional(),

  certificate: z
    .file("Certificate must be a file")
    .max(5000000, "File cannot exceed 5MB")
    .mime(["image/png", "image/jpeg", "application/pdf"], {
      message: "Only PNG, JPEG, and PDF files are allowed",
    })
    .optional(),
});
