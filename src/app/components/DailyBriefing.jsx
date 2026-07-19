"use client";

import { useState } from "react";

export default function DailyBriefing({
  isOpen,
  onClose,
  tasks = [],
  user,
}) {

  const [summaryType, setSummaryType] = useState("today");
  
  if (!isOpen) return null;

  // ==========================
  // Today's Statistics
  // ==========================

  const today = new Date().toISOString().split("T")[0];

  const summaryTasks =
    summaryType === "today"
      ? tasks.filter(task => task.taskDate === today)
      : tasks;

  console.log("All Tasks:", tasks);
  console.log("Today's Tasks:", summaryTasks);

  const completedTasks = summaryTasks.filter(
    (task) => task.completed
  );

  const pendingTasks = summaryTasks.filter(
    (task) => !task.completed
  );

  const progress =
    summaryTasks.length === 0
      ? 0
      : Math.round(
          (completedTasks.length / summaryTasks.length) * 100
        );
   console.log("DailyBriefing Tasks:", tasks);
   console.log("Today:", today);
   console.log("Today Tasks:", summaryTasks);
   console.log("All Tasks:", tasks);

  const nextTask = pendingTasks
    .sort((a, b) => a.startTime.localeCompare(b.startTime))[0];

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">

      <div className="w-full max-w-2xl max-h-[95vh] overflow-y-auto rounded-3xl bg-white shadow-2xl">

        {/* Header */}

        <div className="bg-blue-600 text-white p-4 sm:p-6">

          <div className="flex justify-between items-start">

            <div>

              <h2 className="text-2xl sm:text-3xl font-bold">
                🌅 Good Morning
              </h2>

              <p className="mt-2 text-sm sm:text-base text-blue-100">
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
          <div className="flex justify-center mb-5">
            <div className="flex w-full sm:w-auto bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setSummaryType("today")}
                className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 rounded-lg font-semibold transition ${
                  summaryType === "today" ? "bg-blue-600 text-white" : "text-gray-700"
                }`}
              >
                Today
              </button>
              <button
                onClick={() => setSummaryType("overall")}
                className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 rounded-lg font-semibold transition ${
                  summaryType === "overall" ? "bg-blue-600 text-white" : "text-gray-700"
                }`}
              >
                Overall
              </button>
            </div>
          </div>

          <div className="flex justify-between mb-2">
            <h3 className="font-bold text-base sm:text-lg">Today's Progress</h3>
            <span className="font-bold text-blue-700">{progress}%</span>
          </div>

          <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600" style={{ width: `${progress}%` }} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="rounded-xl bg-blue-50 p-4 text-center">
              <h3 className="text-2xl sm:text-3xl font-bold text-blue-700">{summaryTasks.length}</h3>
              <p>Total</p>
            </div>
            <div className="rounded-xl bg-green-50 p-4 text-center">
              <h3 className="text-2xl sm:text-3xl font-bold text-green-700">{completedTasks.length}</h3>
              <p>Completed</p>
            </div>
            <div className="rounded-xl bg-orange-50 p-4 text-center">
              <h3 className="text-2xl sm:text-3xl font-bold text-orange-700">{pendingTasks.length}</h3>
              <p>Pending</p>
            </div>
          </div>

          <div className="rounded-2xl border p-4 sm:p-5">
            <h3 className="font-bold text-lg sm:text-xl mb-3">⏰ Next Task</h3>
            {nextTask ? (
              <div>
                <p className="font-semibold text-base sm:text-lg break-words">{nextTask.taskName}</p>
                <p className="text-gray-500 mt-1">
                  {nextTask.startTime} - {nextTask.endTime}
                </p>
              </div>
            ) : (
              <p className="text-gray-500">🎉 No pending tasks today.</p>
            )}
          </div>

          <button
            onClick={onClose}
            className="w-full rounded-2xl bg-blue-600 py-3 sm:py-4 text-white font-bold text-sm sm:text-base hover:bg-blue-700 transition"
          >
            Continue Working →
          </button>
        </div>

      </div>

    </div>

  );

}