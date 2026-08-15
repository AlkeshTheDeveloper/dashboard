import { Box, IconButton, Typography, Select, MenuItem } from "@mui/material";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../expenseSlice";

const Pagination = ({ pagination }) => {
  const dispatch = useDispatch();

  const { filters } = useSelector((state) => state.expense);

  if (!pagination) {
    return null;
  }

  const { page = 1, limit = 10, totalPages = 1, totalRecords = 0 } = pagination;

  const handlePrevious = () => {
    if (page <= 1) {
      return;
    }

    dispatch(
      setFilters({
        page: page - 1,
      }),
    );
  };

  const handleNext = () => {
    if (page >= totalPages) {
      return;
    }

    dispatch(
      setFilters({
        page: page + 1,
      }),
    );
  };

  const handleLimitChange = (event) => {
    dispatch(
      setFilters({
        page: 1,
        limit: Number(event.target.value),
      }),
    );
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexWrap="wrap"
      gap={2}
      mt={2}
    >
      {/* Total */}
      <Typography variant="body2" color="text.secondary">
        {totalRecords} {totalRecords === 1 ? "expense" : "expenses"}
      </Typography>

      {/* Page Controls */}
      <Box display="flex" alignItems="center" gap={1}>
        <IconButton size="small" onClick={handlePrevious} disabled={page <= 1}>
          <ChevronLeftIcon />
        </IconButton>

        <Typography
          variant="body2"
          sx={{
            minWidth: 80,
            textAlign: "center",
          }}
        >
          Page {page} of {totalPages}
        </Typography>

        <IconButton
          size="small"
          onClick={handleNext}
          disabled={page >= totalPages}
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>

      {/* Page Size */}
      <Box display="flex" alignItems="center" gap={1}>
        <Typography variant="body2" color="text.secondary">
          Rows
        </Typography>

        <Select
          size="small"
          value={filters.limit || limit}
          onChange={handleLimitChange}
          sx={{
            minWidth: 80,
          }}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
      </Box>
    </Box>
  );
};

export default Pagination;
