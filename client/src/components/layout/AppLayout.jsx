import { Outlet } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const AppLayout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Navbar />

      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: "30px",

          "&.active": {
            backgroundColor: "#E3F2FD",
            color: "#1976D2",

            "& .MuiListItemIcon-root": {
              color: "#1976D2",
            },
          },
        }}
      >
        <Toolbar />

        <Outlet />
      </Box>
    </Box>
  );
};

export default AppLayout;
