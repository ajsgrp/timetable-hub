"use client";

export default function DailyBriefing({
  isOpen,
  onClose,
  tasks = [],
  user,
}) {

  if (!isOpen) return null;

  // ==========================
  // Today's Statistics
  // ==========================

  const today = new Date().toISOString().split("T")[0];

  const todayTasks = tasks.filter(
    (task) => task.taskDate === today
  );

  const completedTasks = todayTasks.filter(
    (task) => task.completed
  );

  const pendingTasks = todayTasks.filter(
    (task) => !task.completed
  );

  const progress =
    todayTasks.length === 0
      ? 0
      : Math.round(
          (completedTasks.length / todayTasks.length) * 100
        );

  const nextTask = pendingTasks
    .sort((a, b) => a.startTime.localeCompare(b.startTime))[0];

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">

      <div className="w-full max-w-xl rounded-3xl overflow-hidden bg-white shadow-2xl">

        {/* Header */}

        <div className="bg-blue-600 text-white p-6">

          <div className="flex justify-between items-start">

            <div>

              <h2 className="text-3xl font-bold">
                🌅 Good Morning
              </h2>

              <p className="mt-2 text-blue-100">
                Welcome back,
                {" "}
                {user?.user_metadata?.full_name || "User"}
              </p>

            </div>

            <button
              onClick={onClose}
              className="text-3xl hover:scale-110 transition"
            >
              ✕
            </button>

          </div>

        </div>

        {/* Body */}

        <div className="p-6 space-y-6">

          {/* Progress */}

          <div>

            <div className="flex justify-between mb-2">

              <h3 className="font-bold text-lg">
                Today's Progress
              </h3>

              <span className="font-bold text-blue-700">
                {progress}%
              </span>

            </div>

            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">

              <div
                className="h-full bg-blue-600"
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>

          </div>

          {/* Stats */}

          <div className="grid grid-cols-3 gap-4">

            <div className="rounded-xl bg-blue-50 p-4 text-center">

              <h3 className="text-3xl font-bold text-blue-700">
                {todayTasks.length}
              </h3>

              <p>Total</p>

            </div>

            <div className="rounded-xl bg-green-50 p-4 text-center">

              <h3 className="text-3xl font-bold text-green-700">
                {completedTasks.length}
              </h3>

              <p>Completed</p>

            </div>

            <div className="rounded-xl bg-orange-50 p-4 text-center">

              <h3 className="text-3xl font-bold text-orange-700">
                {pendingTasks.length}
              </h3>

              <p>Pending</p>

            </div>

          </div>

          {/* Next Task */}

          <div className="rounded-2xl border p-5">

            <h3 className="font-bold text-xl mb-3">
              ⏰ Next Task
            </h3>

            {nextTask ? (

              <>

                <p className="font-semibold text-lg">
                  {nextTask.taskName}
                </p>

                <p className="text-gray-500 mt-1">
                  {nextTask.startTime} - {nextTask.endTime}
                </p>

              </>

            ) : (

              <p className="text-gray-500">
                🎉 No pending tasks today.
              </p>

            )}

          </div>

          <button
            onClick={onClose}
            className="w-full rounded-2xl bg-blue-600 py-4 text-white font-bold hover:bg-blue-700 transition"
          >
            Continue Working →
          </button>

        </div>

      </div>

    </div>

  );

}