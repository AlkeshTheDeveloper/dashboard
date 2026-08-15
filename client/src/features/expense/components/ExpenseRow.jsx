const ExpenseRow = ({ expense }) => {
  return (
    <tr>
      <td>{expense.title}</td>

      <td>{expense.category}</td>

      <td>{expense.paymentMethod}</td>

      <td>₹{expense.amount}</td>

      <td>{new Date(expense.expenseDate).toLocaleDateString()}</td>

      <td>
        <button>Edit</button>
      </td>
    </tr>
  );
};

export default ExpenseRow;
