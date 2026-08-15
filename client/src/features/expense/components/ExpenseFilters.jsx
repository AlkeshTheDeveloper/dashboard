import { useEffect, useState } from "react";
import { Box, MenuItem, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../expenseSlice";

const ExpenseFilters = () => {
  const dispatch = useDispatch();

  const { filters } = useSelector((state) => state.expense);

  const [search, setSearch] = useState(filters.search || "");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search !== filters.search) {
        dispatch(
          setFilters({
            search,
            page: 1,
          }),
        );
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [search, filters.search, dispatch]);

  const handleCategoryChange = (event) => {
    dispatch(
      setFilters({
        category: event.target.value,
        page: 1,
      }),
    );
  };

  const handlePaymentChange = (event) => {
    dispatch(
      setFilters({
        paymentMethod: event.target.value,
        page: 1,
      }),
    );
  };

  return (
    <Box display="flex" gap={2} flexWrap="wrap">
      <TextField
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search expenses..."
        size="small"
        sx={{
          minWidth: 280,
          flex: 1,
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        select
        size="small"
        label="Category"
        value={filters.category || ""}
        onChange={handleCategoryChange}
        sx={{ minWidth: 180 }}
      >
        <MenuItem value="">All Categories</MenuItem>

        <MenuItem value="Food">Food</MenuItem>

        <MenuItem value="Bills">Bills</MenuItem>

        <MenuItem value="Shopping">Shopping</MenuItem>

        <MenuItem value="Transport">Transport</MenuItem>

        <MenuItem value="Health">Health</MenuItem>

        <MenuItem value="Entertainment">Entertainment</MenuItem>

        <MenuItem value="Education">Education</MenuItem>

        <MenuItem value="Other">Other</MenuItem>
      </TextField>

      <TextField
        select
        size="small"
        label="Payment"
        value={filters.paymentMethod || ""}
        onChange={handlePaymentChange}
        sx={{ minWidth: 180 }}
      >
        <MenuItem value="">All Payments</MenuItem>

        <MenuItem value="Cash">Cash</MenuItem>

        <MenuItem value="UPI">UPI</MenuItem>

        <MenuItem value="Credit Card">Credit Card</MenuItem>

        <MenuItem value="Debit Card">Debit Card</MenuItem>

        <MenuItem value="Net Banking">Net Banking</MenuItem>
      </TextField>
    </Box>
  );
};

export default ExpenseFilters;
