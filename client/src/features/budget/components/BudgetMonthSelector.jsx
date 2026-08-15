import { Box, IconButton, Typography } from "@mui/material";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { useDispatch, useSelector } from "react-redux";
import { setBudgetMonth } from "../budgetSlice";

const BudgetMonthSelector = () => {
  const dispatch = useDispatch();

  const { month, year } = useSelector((state) => state.budget);

  const currentDate = new Date(year, month - 1, 1);

  const formattedMonth = new Intl.DateTimeFormat("en-IN", {
    month: "long",
    year: "numeric",
  }).format(currentDate);

  const handlePrevious = () => {
    const date = new Date(year, month - 2, 1);

    dispatch(
      setBudgetMonth({
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      }),
    );
  };

  const handleNext = () => {
    const date = new Date(year, month, 1);

    dispatch(
      setBudgetMonth({
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      }),
    );
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap={2}
      mb={3}
    >
      <IconButton onClick={handlePrevious}>
        <ChevronLeftIcon />
      </IconButton>

      <span>
        <Typography
          variant="h6"
          fontWeight={600}
          sx={{
            minWidth: 160,
            textAlign: "center",
          }}
        >
          {formattedMonth}
        </Typography>
      </span>

      <IconButton onClick={handleNext}>
        <ChevronRightIcon />
      </IconButton>
    </Box>
  );
};

export default BudgetMonthSelector;
