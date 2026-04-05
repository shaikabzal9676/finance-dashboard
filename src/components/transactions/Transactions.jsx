import { useState } from "react";
import { useStore } from "../../store/useStore";
import Card from "../ui/Card";

export default function Transactions() {
  const { transactions, addTransaction, deleteTransaction, role } = useStore();

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sort, setSort] = useState("");

  const [form, setForm] = useState({
    date: "",
    amount: "",
    category: "",
    type: "expense",
  });

  // Filtering
  const filtered = transactions
    .filter((t) =>
      t.category.toLowerCase().includes(search.toLowerCase())
    )
    .filter((t) => (typeFilter ? t.type === typeFilter : true));

  // Sorting
  const sorted = [...filtered].sort((a, b) => {
    if (sort === "amount") return b.amount - a.amount;
    if (sort === "date") return new Date(b.date) - new Date(a.date);
    return 0;
  });

  const handleAdd = () => {
    if (!form.date || !form.amount || !form.category) return;

    addTransaction({
      ...form,
      amount: Number(form.amount),
    });

    setForm({ date: "", amount: "", category: "", type: "expense" });
  };

  return (
    <Card className="mt-6">
      <h3 className="mb-4">Transactions</h3>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <input
          placeholder="Search by category..."
          className="p-2 rounded bg-gray-800"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="p-2 rounded bg-gray-800"
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          className="p-2 rounded bg-gray-800"
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort</option>
          <option value="amount">Amount</option>
          <option value="date">Date</option>
        </select>
      </div>

      {/* Admin Form */}
      {role === "admin" && (
        <div className="flex gap-2 mb-4">
          <input
            type="date"
            className="p-2 bg-gray-800 rounded"
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
          <input
            placeholder="Amount"
            className="p-2 bg-gray-800 rounded"
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />
          <input
            placeholder="Category"
            className="p-2 bg-gray-800 rounded"
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
          <select
            className="p-2 bg-gray-800 rounded"
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <button
            onClick={handleAdd}
            className="bg-blue-500 px-4 rounded"
          >
            Add
          </button>
        </div>
      )}

      {/* Table */}
      {sorted.length === 0 ? (
        <p className="text-gray-400">No transactions yet 🚀</p>
      ) : (
        <>
          <div className="grid grid-cols-5 text-gray-400 font-semibold mb-2">
            <span>Date</span>
            <span>Category</span>
            <span>Type</span>
            <span>Amount</span>
            <span>Action</span>
          </div>

          {sorted.map((t) => (
            <div
              key={t.id}
              className="grid grid-cols-5 py-2 border-b"
            >
              <span>{t.date}</span>
              <span>{t.category}</span>
              <span>{t.type}</span>
              <span
                className={
                  t.type === "income"
                    ? "text-green-400"
                    : "text-red-400"
                }
              >
                ₹{t.amount}
              </span>

              {role === "admin" ? (
                <button
                  onClick={() => deleteTransaction(t.id)}
                  className="text-red-400"
                >
                  Delete
                </button>
              ) : (
                <span>-</span>
              )}
            </div>
          ))}
        </>
      )}
    </Card>
  );
}