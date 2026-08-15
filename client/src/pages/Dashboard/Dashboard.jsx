import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchDashboard } from "../../features/dashboard/dashboardSlice";
import SummaryCards from "../../features/dashboard/components/SummaryCards";
import MonthlyTrendChart from "../../features/dashboard/components/MonthlyTrendChart";
import CategoryChart from "../../features/dashboard/components/CategoryChart";
import RecentExpenses from "../../features/dashboard/components/RecentExpenses";

import { fetchBudget } from "../../features/budget/budgetSlice";

import BudgetOverview from "../../features/dashboard/components/BudgetOverview";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { summary, loading, error } = useSelector((state) => state.dashboard);

  const { month, year, budget } = useSelector((state) => state.budget);

  useEffect(() => {
    dispatch(fetchDashboard());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchBudget({
        month,
        year,
      }),
    );
  }, [dispatch, month, year]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div className="space-y-6">
      <SummaryCards summary={summary} />

      <BudgetOverview budget={budget} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MonthlyTrendChart />

        <CategoryChart />
      </div>

      <RecentExpenses />
    </div>
  );
};

export default Dashboard;
