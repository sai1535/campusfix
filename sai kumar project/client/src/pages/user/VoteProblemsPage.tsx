import { voteIssues } from "../../data/mockIssues";

const VoteProblemsPage = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-semibold text-gray-900">Vote Problems</h1>
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center gap-4">
        <input
          type="search"
          placeholder="Search issues..."
          className="flex-1 rounded-full border border-gray-200 px-4 py-2 text-sm focus:border-brand-accent focus:outline-none"
        />
        <select className="rounded-full border border-gray-200 px-4 py-2 text-sm">
          <option>All Status</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
        <select className="rounded-full border border-gray-200 px-4 py-2 text-sm">
          <option>All Categories</option>
        </select>
      </div>
      <div className="mt-6 space-y-4">
        {voteIssues.map((issue) => (
          <div
            key={issue.title}
            className="rounded-2xl border border-gray-100 bg-gray-50 p-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-lg font-semibold text-gray-900">
                  {issue.title}
                </p>
                <p className="text-sm text-gray-500">{issue.description}</p>
                <p className="text-xs text-gray-400">{issue.location}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white">
                  {issue.status}
                </span>
                <button className="rounded-full border border-gray-900 px-4 py-2 text-sm font-medium text-gray-900">
                  Vote ({issue.votes})
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default VoteProblemsPage;


