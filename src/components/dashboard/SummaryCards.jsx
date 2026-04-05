import { useStore } from "../../store/useStore";
import Card from "../ui/Card";
import { ArrowUp, ArrowDown } from "lucide-react";

const format = (num) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(num);

export default function SummaryCards() {
  const { transactions } = useStore();

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const balance = income - expenses;

  const Item = ({ title, value, icon, color }) => (
    <Card>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-400">{title}</p>
          <h2
            className={`text-2xl font-bold ${
              title === "Balance"
                ? value < 0
                  ? "text-red-400"
                  : "text-green-400"
                : ""
            }`}
          >
            {format(value)}
          </h2>
        </div>
        <div className={`p-3 rounded-xl ${color}`}>{icon}</div>
      </div>
    </Card>
  );

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <Item
        title="Balance"
        value={balance}
        icon={<ArrowUp />}
        color="bg-blue-500/20"
      />
      <Item
        title="Income"
        value={income}
        icon={<ArrowUp />}
        color="bg-green-500/20"
      />
      <Item
        title="Expenses"
        value={expenses}
        icon={<ArrowDown />}
        color="bg-red-500/20"
      />
    </div>
  );
}