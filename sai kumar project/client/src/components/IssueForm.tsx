export const IssueForm = () => (
  <form className="space-y-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
    <div>
      <label className="text-sm font-medium text-gray-700">Issue Title</label>
      <input
        type="text"
        placeholder="Enter a brief summary of the problem"
        className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-accent focus:outline-none"
      />
    </div>
    <div>
      <label className="text-sm font-medium text-gray-700">Category</label>
      <select className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-accent focus:outline-none">
        <option>Transport</option>
        <option>Wi-Fi</option>
        <option>Lab</option>
        <option>Hostel</option>
        <option>Infrastructure</option>
        <option>Other</option>
      </select>
    </div>
    <div>
      <label className="text-sm font-medium text-gray-700">Description</label>
      <textarea
        rows={4}
        placeholder="Describe the issue in detail"
        className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-accent focus:outline-none"
      />
    </div>
    <div className="grid gap-4 md:grid-cols-2">
      <div>
        <label className="text-sm font-medium text-gray-700">Location</label>
        <input
          type="text"
          placeholder="Building, room number, area"
          className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-accent focus:outline-none"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700">Attachment</label>
        <div className="mt-2 flex h-24 items-center justify-center rounded-lg border border-dashed border-gray-300 text-center text-sm text-gray-500">
          Click to upload or drag & drop
        </div>
      </div>
    </div>
    <p className="text-xs text-gray-500">
      Providing detailed information helps us resolve your issue faster.
    </p>
    <button className="w-full rounded-full bg-brand-accent px-4 py-3 text-sm font-semibold text-white shadow-sm">
      Submit Issue
    </button>
  </form>
);


