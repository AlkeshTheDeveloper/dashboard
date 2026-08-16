import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SavingsIcon from "@mui/icons-material/Savings";

import { useNavigate } from "react-router-dom";

const SIDEBAR_WIDTH = 240;

const Sidebar = ({ mobileOpen, onClose }) => {
  const navigate = useNavigate();

  const menuItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: <DashboardIcon />,
    },
    {
      label: "Expenses",
      path: "/expenses",
      icon: <ReceiptLongIcon />,
    },
    {
      label: "Profile",
      path: "/profile",
      icon: <AccountCircleIcon />,
    },
    {
      label: "Budget",
      path: "/budget",
      icon: <SavingsIcon />,
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  const drawerContent = (
    <Box sx={{ width: SIDEBAR_WIDTH }}>
      <List sx={{ pt: 8 }}>
        {menuItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              onClick={() => handleNavigation(item.path)}
              sx={{
                minHeight: 56,
                px: 2,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                }}
              >
                {item.icon}
              </ListItemIcon>

              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {/* Desktop */}
      <Drawer
        variant="permanent"
        sx={{
          display: {
            xs: "none",
            md: "block",
          },

          "& .MuiDrawer-paper": {
            width: SIDEBAR_WIDTH,
            boxSizing: "border-box",
            top: 0,
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>

      {/* Mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: {
            xs: "block",
            md: "none",
          },

          "& .MuiDrawer-paper": {
            width: SIDEBAR_WIDTH,
            boxSizing: "border-box",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;