import { useStore } from "../../store/useStore";
import Card from "../ui/Card";

export default function Insights() {
  const { transactions } = useStore();

  const expenses = transactions.filter((t) => t.type === "expense");

  if (expenses.length === 0) {
    return (
      <Card className="mt-6">
        <p className="text-gray-400">No insights available</p>
      </Card>
    );
  }

  const categoryMap = {};

  expenses.forEach((t) => {
    categoryMap[t.category] =
      (categoryMap[t.category] || 0) + t.amount;
  });

  const topCategory = Object.keys(categoryMap).reduce((a, b) =>
    categoryMap[a] > categoryMap[b] ? a : b
  );

  const totalExpense = expenses.reduce((a, b) => a + b.amount, 0);

  const message =
    totalExpense > 10000
      ? "⚠️ High spending this month"
      : "✅ Spending under control";

  return (
    <Card className="mt-6">
      <h3 className="mb-4">Insights</h3>

      <p>🏆 Top Category: {topCategory}</p>
      <p className="mt-2">{message}</p>
    </Card>
  );
}