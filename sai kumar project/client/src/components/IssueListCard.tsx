type IssueItem = {
  title: string;
  location: string;
  date: string;
  status: string;
};

type Props = {
  items: IssueItem[];
  ctaLabel?: string;
};

export const IssueListCard = ({ items, ctaLabel = "View Details" }: Props) => (
  <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
    <div className="mb-4 flex items-center justify-between">
      <h3 className="text-lg font-semibold text-gray-900">My Raised Issues</h3>
      <button className="text-sm font-medium text-brand-accent hover:underline">
        Filter ▾
      </button>
    </div>
    <div className="space-y-4">
      {items.map((issue) => (
        <div
          key={issue.title}
          className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-4 py-3"
        >
          <div>
            <p className="font-semibold text-gray-900">{issue.title}</p>
            <p className="text-sm text-gray-500">{issue.location}</p>
          </div>
          <div className="flex items-center gap-4 text-right">
            <div className="text-sm text-gray-500">
              <p>{issue.date}</p>
              <p className="font-medium text-gray-900">{issue.status}</p>
            </div>
            <button className="rounded-full border border-gray-900 px-4 py-2 text-sm font-medium text-gray-900">
              {ctaLabel}
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);


