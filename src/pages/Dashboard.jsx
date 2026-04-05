import SummaryCards from "../components/dashboard/SummaryCards";
import Charts from "../components/dashboard/Charts";
import Transactions from "../components/transactions/Transactions";
import Insights from "../components/insights/Insights";
import { useStore } from "../store/useStore";

export default function Dashboard() {
  const { role, setRole } = useStore();

  return (
    <div className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen text-white">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        
        {/* Title */}
        <div>
          <h1 className="text-2xl font-bold">Finance Dashboard</h1>
          <p className="text-sm text-gray-400">
            Track your income and expenses efficiently
          </p>
        </div>

        {/* Role Switch */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="bg-gray-800 p-2 rounded"
        >
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Summary */}
      <SummaryCards />

      {/* Charts */}
      <Charts />

      {/* Main Layout */}
      <div className="grid lg:grid-cols-3 gap-6 mt-6">
        
        {/* Transactions (Wider Section) */}
        <div className="lg:col-span-2">
          <Transactions />
        </div>

        {/* Insights (Side Panel) */}
        <div>
          <Insights />
        </div>

      </div>

    </div>
  );
}