"use client";

export default function TaskCard({
  task,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-blue-100 border-l-4 border-blue-600 rounded-xl p-4 shadow-sm">

      <div className="flex justify-between items-start">

        <div>

          <h3 className="font-bold text-lg text-blue-900">
            {task.taskName}
          </h3>

          <p className="text-sm text-gray-600 mt-1">
            {task.startTime} - {task.endTime}
          </p>

        </div>

        <span className="text-xs bg-white px-3 py-1 rounded-full">
          {task.priority}
        </span>

      </div>

      <p className="text-gray-700 mt-3">
        {task.description}
      </p>

      <div className="flex gap-3 mt-4">

        <button
          onClick={onEdit}
          className="px-3 py-2 bg-yellow-400 rounded-lg text-sm"
        >
          ✏ Edit
        </button>

        <button
          onClick={onDelete}
          className="px-3 py-2 bg-red-500 text-white rounded-lg text-sm"
        >
          🗑 Delete
        </button>

      </div>

    </div>
  );
}