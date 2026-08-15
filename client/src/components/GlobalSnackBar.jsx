import { Alert, Snackbar } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { hideSnackbar } from "../features/ui/uiSlice";

const GlobalSnackbar = () => {
  const dispatch = useDispatch();

  const { open, message, severity } = useSelector((state) => state.ui.snackbar);

  const handleClose = () => {
    dispatch(hideSnackbar());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3500}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalSnackbar;
