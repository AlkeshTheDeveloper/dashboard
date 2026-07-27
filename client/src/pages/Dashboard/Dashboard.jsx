import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../../features/auth/authSlice";
import { persistor } from "../../app/store";




const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

const handleLogout = () => {
  dispatch(logout());
  persistor.purge();
  navigate("/");
};

  return (
    <div>
      <h1>Dashboard</h1>

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;