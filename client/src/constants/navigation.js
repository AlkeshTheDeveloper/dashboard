import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SavingsIcon from "@mui/icons-material/Savings";

export const navigationItems = [
  {
    label: "Dashboard",
    icon: DashboardIcon,
    path: "/dashboard",
  },
  {
    label: "Expenses",
    icon: ReceiptLongIcon,
    path: "/expenses",
  },
  {
    label: "Profile",
    icon: AccountCircleIcon,
    path: "/profile",
  },
  {
    label: "Budget",
    icon: SavingsIcon,
    path: "/budget",
  },
];
