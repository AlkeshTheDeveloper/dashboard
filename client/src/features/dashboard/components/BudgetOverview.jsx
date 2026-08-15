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

const BudgetOverview = ({ budget }) => {
  if (!budget) {
    return (
      <Card
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
        }}
      >
        <CardContent>
          <Typography variant="h6" fontWeight={700}>
            Monthly Budget
          </Typography>

          <Typography variant="body2" color="text.secondary" mt={1}>
            No budget has been set for this month.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const { salary = 0, budgetAmount = 0, spent = 0, remaining = 0 } = budget;

  const usage = budgetAmount > 0 ? (spent / budgetAmount) * 100 : 0;

  const progress = Math.min(usage, 100);

  const isOverBudget = spent > budgetAmount;

  return (
    <Box>
      <Box mb={2}>
        <Typography variant="h6" fontWeight={700}>
          Monthly Budget
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Current month spending overview
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            elevation={0}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 3,
              height: "100%",
            }}
          >
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Salary
              </Typography>

              <Typography variant="h6" fontWeight={700} mt={1}>
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
              height: "100%",
            }}
          >
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Budget
              </Typography>

              <Typography variant="h6" fontWeight={700} mt={1}>
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
              height: "100%",
            }}
          >
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Spent
              </Typography>

              <Typography variant="h6" fontWeight={700} mt={1}>
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
              borderColor: isOverBudget ? "error.main" : "divider",
              borderRadius: 3,
              height: "100%",
            }}
          >
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Remaining
              </Typography>

              <Typography
                variant="h6"
                fontWeight={700}
                mt={1}
                color={isOverBudget ? "error.main" : "success.main"}
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
          mt: 2,
        }}
      >
        <CardContent>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography fontWeight={600}>Budget Usage</Typography>

            <Typography
              variant="body2"
              color={isOverBudget ? "error.main" : "text.secondary"}
              fontWeight={600}
            >
              {Math.round(usage)}%
            </Typography>
          </Box>

          <LinearProgress
            variant="determinate"
            value={progress}
            color={isOverBudget ? "error" : "primary"}
            sx={{
              height: 9,
              borderRadius: 5,
            }}
          />

          {isOverBudget && (
            <Typography
              variant="body2"
              color="error.main"
              fontWeight={600}
              mt={1.5}
            >
              You have exceeded your budget by{" "}
              {formatCurrency(Math.abs(remaining))}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default BudgetOverview;
