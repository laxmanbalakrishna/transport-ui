import { z } from "zod";

export const registrationSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    username: z.string().min(3, "Username must be at least 3 characters long"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    contactNumber: z
      .string()
      .nonempty("Contact number is required") // Ensures it's treated as required without `min`
      .regex(/^\+?[1-9]\d{1,14}$/, "Invalid contact number format"), // Format validation with or without '+'
    userType: z.string().nonempty({ message: "UserType is required" }),
    branch: z.string().optional(), // Branch can be optional for Admin
    salaryDetails: z.preprocess((value) => {
      if (value === "") return undefined;
      const parsed = parseFloat(value as string);
      return isNaN(parsed) ? undefined : parsed;
    }, z.number().positive("Salary must be a positive number").optional()), // Coerce to number if valid
  })
  .refine(
    (data) => {
      // Branch is required for non-Admin users
      return data.userType === "Admin" || Boolean(data.branch);
    },
    {
      path: ["branch"], // Attach error to branch field
      message: "Branch is required for non-Admin users",
    }
  );
