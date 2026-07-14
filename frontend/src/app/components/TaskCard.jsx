"use client";

export default function TaskCard({
  task,
  onEdit,
  onDelete,
}) {
  return (
    <div
      className="rounded-2xl p-5 shadow-xl text-white transition-all duration-300 hover:scale-[1.02]"
      style={{
        backgroundColor: task.color || "#2563eb",
      }}
   >

      <div className="flex justify-between items-start">

        <div>

          <h3 className="text-xl font-bold">
            {task.taskName}
          </h3>

          <p className="text-white/90 text-sm mt-2">
            {task.startTime} - {task.endTime}
          </p>

        </div>

        <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
          {task.priority}
        </span>

      </div>

      <p className="text-white/90 mt-4">
        {task.description}
      </p>

      <div className="flex gap-3 mt-4">

        <button
          onClick={onEdit}
          className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition"
        >
          ✏ Edit
        </button>

        <button
          onClick={onDelete}
          className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition"
        >
          🗑 Delete
        </button>

      </div>

    </div>
  );
}