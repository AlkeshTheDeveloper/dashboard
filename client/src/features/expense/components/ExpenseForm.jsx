import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { TextField, MenuItem, Stack } from "@mui/material";

import { expenseSchema } from "../expenseValidation";

import { useEffect } from "react";

const ExpenseForm = ({ onSubmit, defaultValues }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(expenseSchema),

    defaultValues: defaultValues || {
      title: "",
      amount: "",
      category: "",
      paymentMethod: "",
      expenseDate: new Date().toISOString().split("T")[0],
      notes: "",
    },
  });

  useEffect(() => {
    if (!defaultValues) {
      return;
    }

    reset({
      title: defaultValues.title || "",

      amount: defaultValues.amount ?? "",

      category: defaultValues.category || "",

      paymentMethod: defaultValues.paymentMethod || "",

      expenseDate: defaultValues.expenseDate
        ? new Date(defaultValues.expenseDate).toISOString().split("T")[0]
        : "",

      notes: defaultValues.notes || "",
    });
  }, [defaultValues, reset]);

  const submitHandler = (data) => {
    onSubmit(data);

    reset();
  };

  return (
    <form id="expense-form" onSubmit={handleSubmit(submitHandler)}>
      <Stack spacing={3}>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Expense Title"
              fullWidth
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          )}
        />
        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Amount"
              type="number"
              fullWidth
              error={!!errors.amount}
              helperText={errors.amount?.message}
            />
          )}
        />
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Category"
              fullWidth
              error={!!errors.category}
              helperText={errors.category?.message}
            >
              <MenuItem value="Food">Food</MenuItem>
              <MenuItem value="Bills">Bills</MenuItem>
              <MenuItem value="Shopping">Shopping</MenuItem>
              <MenuItem value="Transport">Transport</MenuItem>
              <MenuItem value="Health">Health</MenuItem>
              <MenuItem value="Entertainment">Entertainment</MenuItem>
              <MenuItem value="Education">Education</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
          )}
        />
        <Controller
          name="paymentMethod"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Payment Method"
              fullWidth
              error={!!errors.paymentMethod}
              helperText={errors.paymentMethod?.message}
            >
              <MenuItem value="Cash">Cash</MenuItem>
              <MenuItem value="UPI">UPI</MenuItem>
              <MenuItem value="Credit Card">Credit Card</MenuItem>
              <MenuItem value="Debit Card">Debit Card</MenuItem>
              <MenuItem value="Net Banking">Net Banking</MenuItem>
            </TextField>
          )}
        />
        <Controller
          name="expenseDate"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              label="Expense Date"
              error={!!errors.expenseDate}
              helperText={errors.expenseDate?.message}
            />
          )}
        />
        <Controller
          name="notes"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Notes"
              multiline
              rows={4}
              fullWidth
              error={!!errors.notes}
              helperText={errors.notes?.message}
            />
          )}
        />{" "}
      </Stack>
    </form>
  );
};

export default ExpenseForm;
