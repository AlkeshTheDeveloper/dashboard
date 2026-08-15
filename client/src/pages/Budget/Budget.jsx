import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Button, Typography } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";

import { fetchBudget, saveBudget } from "../../features/budget/budgetSlice";

import BudgetSummary from "../../features/budget/components/BudgetSummary";
import BudgetModal from "../../features/budget/components/BudgetModal";
import BudgetMonthSelector from "../../features/budget/components/BudgetMonthSelector";
import { showSnackbar } from "../../features/ui/uiSlice";

const Budget = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const { budget, month, year, loading, saving, error } = useSelector(
    (state) => state.budget,
  );

  useEffect(() => {
    dispatch(
      fetchBudget({
        month,
        year,
      }),
    );
  }, [dispatch, month, year]);

  const handleSaveBudget = async (data) => {
    try {
      await dispatch(
        saveBudget({
          ...data,
          month,
          year,
        }),
      ).unwrap();

      setOpen(false);

      dispatch(
        showSnackbar({
          message: "Budget saved successfully",
          severity: "success",
        }),
      );
    } catch (error) {
      dispatch(
        showSnackbar({
          message: error || "Failed to save budget",
          severity: "error",
        }),
      );
    }
  };

  if (loading) {
    return <Typography>Loading budget...</Typography>;
  }

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
        mb={4}
      >
        <Box>
          <Typography variant="h4" fontWeight={700}>
            Budget
          </Typography>

          <Typography variant="body2" color="text.secondary" mt={0.5}>
            Manage your monthly salary and spending limit
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={() => setOpen(true)}
        >
          {budget ? "Edit Budget" : "Set Budget"}
        </Button>
      </Box>
      <BudgetMonthSelector />

      {!budget ? (
        <Box textAlign="center" py={8}>
          <Typography variant="h6" fontWeight={600}>
            No budget set for this month
          </Typography>

          <Typography color="text.secondary" mt={1} mb={3}>
            Set your monthly salary and budget to start tracking your spending.
          </Typography>

          <Button variant="contained" onClick={() => setOpen(true)}>
            Set Budget
          </Button>
        </Box>
      ) : (
        <BudgetSummary budget={budget} />
      )}

      <BudgetModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSaveBudget}
        loading={saving}
        budget={budget}
      />
    </Box>
  );
};

export default Budget;
