export default function PendingStats({ pendingTasks }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

      <div className="rounded-2xl bg-blue-50 border border-blue-200 p-5 shadow-sm">
        <p className="text-sm text-gray-500">Total Pending</p>

        <h2 className="text-3xl font-bold text-blue-700 mt-2">
          {pendingTasks.length}
        </h2>
      </div>

      <div className="rounded-2xl bg-red-50 border border-red-200 p-5 shadow-sm">
        <p className="text-sm text-gray-500">High Priority</p>

        <h2 className="text-3xl font-bold text-red-600 mt-2">
          {
            pendingTasks.filter(
              (task) => task.priority === "High"
            ).length
          }
        </h2>
      </div>

      <div className="rounded-2xl bg-yellow-50 border border-yellow-200 p-5 shadow-sm">
        <p className="text-sm text-gray-500">Medium Priority</p>

        <h2 className="text-3xl font-bold text-yellow-600 mt-2">
          {
            pendingTasks.filter(
              (task) => task.priority === "Medium"
            ).length
          }
        </h2>
      </div>

      <div className="rounded-2xl bg-green-50 border border-green-200 p-5 shadow-sm">
        <p className="text-sm text-gray-500">Low Priority</p>

        <h2 className="text-3xl font-bold text-green-600 mt-2">
          {
            pendingTasks.filter(
              (task) => task.priority === "Low"
            ).length
          }
        </h2>
      </div>

    </div>
  );
}