import {
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";

const formatCurrency = (amount = 0) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

const BudgetSummary = ({ budget }) => {
  if (!budget) {
    return null;
  }

  const { salary = 0, budgetAmount = 0, spent = 0, remaining = 0 } = budget;

  const percentage =
    budgetAmount > 0 ? Math.min((spent / budgetAmount) * 100, 100) : 0;

  const isOverBudget = spent > budgetAmount;

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            elevation={0}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 3,
            }}
          >
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Monthly Salary
              </Typography>

              <Typography variant="h5" fontWeight={700} mt={1}>
                {formatCurrency(salary)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            elevation={0}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 3,
            }}
          >
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Monthly Budget
              </Typography>

              <Typography variant="h5" fontWeight={700} mt={1}>
                {formatCurrency(budgetAmount)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            elevation={0}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 3,
            }}
          >
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Spent
              </Typography>

              <Typography variant="h5" fontWeight={700} mt={1}>
                {formatCurrency(spent)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            elevation={0}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 3,
            }}
          >
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Remaining
              </Typography>

              <Typography
                variant="h5"
                fontWeight={700}
                mt={1}
                color={remaining >= 0 ? "success.main" : "error.main"}
              >
                {formatCurrency(remaining)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
          mt: 3,
        }}
      >
        <CardContent>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography fontWeight={600}>Budget Usage</Typography>

            <Typography variant="body2" color="text.secondary">
              {Math.round(percentage)}%
            </Typography>
          </Box>

          <LinearProgress
            variant="determinate"
            value={percentage}
            color={isOverBudget ? "error" : "primary"}
            sx={{
              height: 10,
              borderRadius: 5,
            }}
          />

          {isOverBudget && (
            <Typography color="error" fontWeight={600} mt={2}>
              You have exceeded your monthly budget by{" "}
              {formatCurrency(Math.abs(remaining))}
            </Typography>
          )}

          <Typography variant="body2" color="text.secondary" mt={1}>
            {formatCurrency(spent)} spent of {formatCurrency(budgetAmount)}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BudgetSummary;
