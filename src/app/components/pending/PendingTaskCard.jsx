export default function PendingTaskCard({
  task,
  onComplete,
  onEdit,
  onDelete,
}) {

  const priorityColor = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-green-100 text-green-700",
  };

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-lg">

      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

        <div className="flex-1">

          <h2 className="text-xl font-bold text-gray-800">
            {task.taskName}
          </h2>

          <div className="mt-3 space-y-1 text-gray-600">

            <p>📅 {task.taskDate}</p>

            <p>
              🕒 {task.startTime} - {task.endTime}
            </p>

          </div>

        </div>

        <span
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            priorityColor[task.priority] ||
            "bg-gray-100 text-gray-700"
          }`}
        >
          {task.priority || "No Priority"}
        </span>

      </div>

      {/* Buttons */}

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">

        <button
          onClick={() => onComplete(task)}
          className="rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700"
        >
          ✅ Complete
        </button>

        <button
          onClick={() => onEdit(task)}
          className="rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          ✏ Edit
        </button>

        <button
          onClick={() => onDelete(task)}
          className="rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
        >
          🗑 Delete
        </button>

      </div>

    </div>
  );
}