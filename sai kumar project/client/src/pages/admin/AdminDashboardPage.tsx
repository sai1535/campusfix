import { StatCard } from "../../components/StatCard";

const problems = [
  {
    id: "#1",
    problem: "Broken AC in Library",
    category: "Facilities",
    status: "Pending",
    priority: "High",
    date: "2025-01-15",
    reporter: "John Doe",
  },
  {
    id: "#2",
    problem: "WiFi issues in Dorm B",
    category: "Technology",
    status: "In Progress",
    priority: "Medium",
    date: "2025-01-14",
    reporter: "Jane Smith",
  },
];

const AdminDashboardPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      <p className="text-gray-500">
        Manage campus issues and track resolution progress.
      </p>
    </div>
    <div className="grid gap-4 md:grid-cols-4">
      <StatCard label="Total Problems" value={7} />
      <StatCard label="Pending" value={4} accent="warning" />
      <StatCard label="In Progress" value={2} />
      <StatCard label="Completed" value={1} accent="success" />
    </div>
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Recent Problems</h2>
        <div className="flex gap-2">
          <button className="rounded-full border border-gray-200 px-4 py-2 text-sm">
            Add New Problem
          </button>
          <button className="rounded-full border border-gray-200 px-4 py-2 text-sm">
            Export Data
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-gray-500">
              <th className="py-2 font-medium">ID</th>
              <th className="py-2 font-medium">Problem</th>
              <th className="py-2 font-medium">Category</th>
              <th className="py-2 font-medium">Status</th>
              <th className="py-2 font-medium">Priority</th>
              <th className="py-2 font-medium">Date</th>
              <th className="py-2 font-medium">Reporter</th>
              <th className="py-2 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {problems.map((problem) => (
              <tr key={problem.id} className="text-gray-900">
                <td className="py-3">{problem.id}</td>
                <td className="py-3">{problem.problem}</td>
                <td className="py-3">{problem.category}</td>
                <td className="py-3">
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-900">
                    {problem.status}
                  </span>
                </td>
                <td className="py-3">{problem.priority}</td>
                <td className="py-3">{problem.date}</td>
                <td className="py-3">{problem.reporter}</td>
                <td className="py-3 text-right">
                  <button className="rounded-full border border-gray-200 px-3 py-1 text-xs">
                    Start
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default AdminDashboardPage;


