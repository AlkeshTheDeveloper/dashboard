import { Grid } from "@mui/material";

import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

import StatCard from "../components/ui/StatCard";
import { formatCurrency } from "../../../utils/currency";

const SummaryCards = ({ summary }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <StatCard
          title="Total Expense"
          value={formatCurrency(summary?.totalExpense)}
          icon={<CurrencyRupeeIcon />}
          color="error.main"
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <StatCard
          title="Transactions"
          value={summary?.expenseCount ?? 0}
          icon={<ReceiptLongIcon />}
          color="primary.main"
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <StatCard
          title="Average Expense"
          value={formatCurrency(summary?.averageExpense)}
          icon={<TrendingUpIcon />}
          color="success.main"
        />
      </Grid>
    </Grid>
  );
};

export default SummaryCards;
