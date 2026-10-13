import { StatCard } from "../../components/StatCard";
import { mockStats } from "../../data/mockIssues";

const DashboardHome = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
    <p className="text-gray-500">
      Track your campus issues and view resolution progress.
    </p>
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard label="Problems Raised" value={mockStats.raised} />
      <StatCard label="Problems Resolved" value={mockStats.resolved} accent="success" />
      <StatCard label="Pending Issues" value={mockStats.pending} accent="warning" />
    </div>
  </div>
);

export default DashboardHome;


