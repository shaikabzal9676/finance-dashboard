import { useStore } from "../../store/useStore";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";
import Card from "../ui/Card";

export default function Charts() {
  const { transactions } = useStore();

  // ❗ Empty state
  if (transactions.length === 0) {
    return <p className="mt-6 text-gray-400">No data to display 📊</p>;
  }

  // ✅ Correct Trend Logic (CUMULATIVE)
  const trendMap = {};

  transactions.forEach((t) => {
    const value = t.type === "income" ? t.amount : -t.amount;
    trendMap[t.date] = (trendMap[t.date] || 0) + value;
  });

  const sortedDates = Object.keys(trendMap).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  let runningBalance = 0;

  const trendData = sortedDates.map((date) => {
    runningBalance += trendMap[date];
    return { date, balance: runningBalance };
  });

  // ✅ Pie Data (ONLY EXPENSES)
  const categoryMap = {};

  transactions.forEach((t) => {
    if (t.type === "expense") {
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + t.amount;
    }
  });

  const pieData = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
  }));

  const COLORS = ["#22c55e", "#ef4444", "#3b82f6", "#f59e0b"];

  return (
    <div className="grid lg:grid-cols-2 gap-6 mt-6">
      {/* Line Chart */}
      <Card className="hover:scale-[1.02] transition-all">
        <h3 className="mb-4">Balance Trend</h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
            <XAxis dataKey="date" />
            <Tooltip />
            <Line type="monotone" dataKey="balance" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Pie Chart */}
      <Card className="hover:scale-[1.02] transition-all">
        <h3 className="mb-4">Spending Breakdown</h3>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={pieData} dataKey="value">
              {pieData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}