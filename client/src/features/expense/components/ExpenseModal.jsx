import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

import ExpenseForm from "./ExpenseForm";

const ExpenseModal = ({
  open,
  onClose,
  onSubmit,
  loading,
  mode = "add",
  expense = null,
}) => {
  const isEdit = mode === "edit";

  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>{isEdit ? "Edit Expense" : "Add Expense"}</DialogTitle>

      <DialogContent dividers>
        <ExpenseForm onSubmit={onSubmit} defaultValues={expense} />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>

        <Button
          type="submit"
          form="expense-form"
          variant="contained"
          disabled={loading}
        >
          {loading ? "Saving..." : isEdit ? "Update Expense" : "Save Expense"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExpenseModal;
