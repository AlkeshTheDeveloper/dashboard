import { z } from "zod";

export const expenseSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters"),

  amount: z.coerce.number().positive("Amount must be greater than 0"),

  category: z.string().min(1, "Category is required"),

  paymentMethod: z.string().min(1, "Payment method is required"),

  expenseDate: z.string().min(1, "Expense date is required"),

  notes: z.string().max(500, "Notes cannot exceed 500 characters").optional(),
});
