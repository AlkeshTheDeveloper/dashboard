import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  IconButton,
  Tooltip,
  Box,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";

const formatCurrency = (amount = 0) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (date) => {
  if (!date) {
    return "-";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
};

const getCategoryColor = (category) => {
  switch (category) {
    case "Food":
      return "warning";

    case "Bills":
      return "primary";

    case "Shopping":
      return "secondary";

    case "Transport":
      return "info";

    case "Health":
      return "error";

    case "Entertainment":
      return "success";

    default:
      return "default";
  }
};

const ExpenseTable = ({ expenses = [], onEdit }) => {
  if (!expenses.length) {
    return (
      <Paper
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
          p: 5,
          textAlign: "center",
        }}
      >
        <Typography variant="h6" color="text.secondary">
          No expenses found
        </Typography>

        <Typography variant="body2" color="text.secondary" mt={1}>
          Add your first expense to get started.
        </Typography>
      </Paper>
    );
  }

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        overflowX: "auto",
      }}
    >
      <Table>
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "grey.50",
            }}
          >
            <TableCell
              sx={{
                fontWeight: 700,
              }}
            >
              Title
            </TableCell>

            <TableCell
              sx={{
                fontWeight: 700,
              }}
            >
              Category
            </TableCell>

            <TableCell
              sx={{
                fontWeight: 700,
              }}
            >
              Payment
            </TableCell>

            <TableCell
              align="right"
              sx={{
                fontWeight: 700,
              }}
            >
              Amount
            </TableCell>

            <TableCell
              sx={{
                fontWeight: 700,
              }}
            >
              Date
            </TableCell>

            <TableCell
              align="center"
              sx={{
                fontWeight: 700,
              }}
            >
              Action
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {expenses.map((expense) => (
            <TableRow
              key={expense._id}
              hover
              sx={{
                "&:last-child td, &:last-child th": {
                  border: 0,
                },
              }}
            >
              <TableCell>
                <Typography
                  fontWeight={600}
                  noWrap
                  sx={{
                    maxWidth: 250,
                  }}
                >
                  {expense.title}
                </Typography>
              </TableCell>

              <TableCell>
                <Chip
                  label={expense.category}
                  color={getCategoryColor(expense.category)}
                  size="small"
                />
              </TableCell>

              <TableCell>
                <Chip
                  label={expense.paymentMethod}
                  variant="outlined"
                  size="small"
                />
              </TableCell>

              <TableCell align="right">
                <Typography fontWeight={700} color="text.primary">
                  {formatCurrency(expense.amount)}
                </Typography>
              </TableCell>

              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  {formatDate(expense.expenseDate)}
                </Typography>
              </TableCell>

              <TableCell align="center">
                <Box display="flex" justifyContent="center">
                  <Tooltip title="Edit expense">
                    <IconButton
                      color="primary"
                      size="small"
                      onClick={() => onEdit?.(expense)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExpenseTable;
