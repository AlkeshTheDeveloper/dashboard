import { useSelector } from "react-redux";
import Card from "./ui/Card";

const RecentExpenses = () => {
  const { recentExpenses } = useSelector((state) => state.dashboard);

  return (
    <Card title="Recent Expenses">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="border-b">
            <tr>
              <th className="py-3 text-left">Title</th>
              <th className="py-3 text-left">Category</th>
              <th className="py-3 text-left">Amount</th>
              <th className="py-3 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {recentExpenses.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-6 text-center text-gray-500">
                  💰 No expenses yet Start by adding your first expense. [ Add
                  Expense ]{" "}
                </td>
              </tr>
            ) : (
              recentExpenses.map((expense) => (
                <tr key={expense._id} className="border-b hover:bg-gray-50">
                  <td className="py-3">{expense.title}</td>

                  <td className="py-3">{expense.category}</td>

                  <td className="py-3">₹{expense.amount}</td>

                  <td className="py-3">
                    {new Date(expense.expenseDate).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default RecentExpenses;
