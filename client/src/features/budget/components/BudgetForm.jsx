import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Stack } from "@mui/material";
import { z } from "zod";

const budgetSchema = z.object({
  salary: z.coerce.number().min(0, "Salary cannot be negative"),

  budgetAmount: z.coerce.number().positive("Budget must be greater than 0"),
});

const BudgetForm = ({ onSubmit, defaultValues }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(budgetSchema),

    defaultValues: {
      salary: defaultValues?.salary ?? "",
      budgetAmount: defaultValues?.budgetAmount ?? "",
    },
  });

  return (
    <form id="budget-form" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Controller
          name="salary"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Monthly Salary"
              type="number"
              fullWidth
              error={!!errors.salary}
              helperText={errors.salary?.message}
            />
          )}
        />

        <Controller
          name="budgetAmount"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Monthly Budget"
              type="number"
              fullWidth
              error={!!errors.budgetAmount}
              helperText={errors.budgetAmount?.message}
            />
          )}
        />
      </Stack>
    </form>
  );
};

export default BudgetForm;
