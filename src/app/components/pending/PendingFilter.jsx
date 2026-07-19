export default function PendingFilter({
  search,
  setSearch,
  filter,
  setFilter,
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center">

      {/* Search Box */}

      <input
        type="text"
        placeholder="🔍 Search pending task..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 lg:flex-1"
      />

      {/* Filter */}

      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 lg:w-56"
      >
        <option value="all">📋 All Tasks</option>
        <option value="today">📅 Today</option>
        <option value="week">🗓 This Week</option>
        <option value="month">📆 This Month</option>
      </select>

    </div>
  );
}