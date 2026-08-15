import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import BudgetForm from "./BudgetForm";

const BudgetModal = ({ open, onClose, onSubmit, loading, budget }) => {
  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Set Monthly Budget</DialogTitle>

      <DialogContent dividers>
        <BudgetForm onSubmit={onSubmit} defaultValues={budget} />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>

        <Button
          type="submit"
          form="budget-form"
          variant="contained"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Budget"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BudgetModal;
