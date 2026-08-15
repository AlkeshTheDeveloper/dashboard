import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Button, Stack, Typography } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import {
  addExpense,
  fetchExpenses,
  updateExpense,
} from "../../features/expense/expenseSlice";

import ExpenseTable from "../../features/expense/components/ExpenseTable";
import ExpenseFilters from "../../features/expense/components/ExpenseFilters";
import Pagination from "../../features/expense/components/Pagination";
import ExpenseModal from "../../features/expense/components/ExpenseModal";
import { showSnackbar } from "../../features/ui/uiSlice";

import { fetchDashboard } from "../../features/dashboard/dashboardSlice";
import { fetchBudget } from "../../features/budget/budgetSlice";

const Expenses = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const { expenses, pagination, filters, loading, error } = useSelector(
    (state) => state.expense,
  );

  const handleEditExpense = (expense) => {
    setSelectedExpense(expense);
    setOpen(true);
  };

  useEffect(() => {
    dispatch(fetchExpenses(filters));
  }, [dispatch, filters]);

  const getExpenseMonthYear = (date) => {
    const expenseDate = new Date(date);

    return {
      month: expenseDate.getMonth() + 1,
      year: expenseDate.getFullYear(),
    };
  };

  const handleExpenseSubmit = async (data) => {
    try {
      if (selectedExpense) {
        await dispatch(
          updateExpense({
            id: selectedExpense._id,
            data,
          }),
        ).unwrap();

        dispatch(
          showSnackbar({
            message: "Expense updated successfully",
            severity: "success",
          }),
        );
      } else {
        await dispatch(addExpense(data)).unwrap();
        dispatch(
          showSnackbar({
            message: "Expense added successfully",
            severity: "success",
          }),
        );
      }

      const expenseDate = data.expenseDate || selectedExpense?.expenseDate;

      const { month, year } = getExpenseMonthYear(expenseDate);

      setOpen(false);
      setSelectedExpense(null);

      dispatch(fetchExpenses(filters));
      dispatch(fetchDashboard());
      dispatch(
        fetchBudget({
          month,
          year,
        }),
      );
    } catch (error) {
      dispatch(
        showSnackbar({
          message: error || "Failed to save expense",
          severity: "error",
        }),
      );
    }
  };

  if (loading && expenses.length === 0) {
    return (
      <Box>
        <Typography variant="h5">Loading expenses...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Typography variant="h5" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Stack spacing={3}>
      {/* Page Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
      >
        <Box>
          <Typography variant="h4" fontWeight={700}>
            Expenses
          </Typography>

          <Typography variant="body2" color="text.secondary" mt={0.5}>
            Track and manage your daily expenses
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setSelectedExpense(null);
            setOpen(true);
          }}
          sx={{
            borderRadius: 2,
            px: 2.5,
          }}
        >
          Add Expense
        </Button>
      </Box>

      {/* Filters */}
      <ExpenseFilters />

      {/* Expense Table */}
      <ExpenseTable expenses={expenses} onEdit={handleEditExpense} />

      {/* Pagination */}
      <Pagination pagination={pagination} />

      {/* Add Expense Modal */}
      <ExpenseModal
        loading={loading}
        open={open}
        onClose={() => {
          setOpen(false);
          setSelectedExpense(null);
        }}
        mode={selectedExpense ? "edit" : "add"}
        expense={selectedExpense}
        onSubmit={handleExpenseSubmit}
      />
    </Stack>
  );
};

export default Expenses;
