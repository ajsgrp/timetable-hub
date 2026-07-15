"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import DailyBriefing from "../components/DailyBriefing";
import CustomCalendar from "../components/CustomCalendar";
import Timeline from "../components/Timeline";

import { supabase } from "../lib/supabase";

export default function Dashboard() {

  const router = useRouter();

  // ==========================
  // States
  // ==========================

  const [user, setUser] = useState(null);

  const [tasks, setTasks] = useState([]);

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
          (completedTasks.length /
            todayTasks.length) *
            100
        );

  const nextTask =
    pendingTasks.length > 0
      ? pendingTasks.sort((a, b) =>
          a.startTime.localeCompare(b.startTime)
        )[0]
      : null;
  const totalFocusMinutes = todayTasks.reduce((total, task) => {

    const [startHour, startMinute] =
      task.startTime.split(":").map(Number);

    const [endHour, endMinute] =
      task.endTime.split(":").map(Number);

    const start = startHour * 60 + startMinute;
    const end = endHour * 60 + endMinute;

    return total + (end - start);

  }, 0);

  const focusHours = Math.floor(totalFocusMinutes / 60);

  const focusMinutes = totalFocusMinutes % 60;

  const productivity =
    progress >= 90
      ? "Excellent 🔥"
      : progress >= 70
      ? "Very Good 💪"
      : progress >= 50
      ? "Good 🙂"
      : progress >= 25
      ? "Average 😐"
      : "Needs Improvement 🚀";

  const [showBriefing, setShowBriefing] =
    useState(false);

  // Mobile Sidebar

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  // ==========================
  // Load User
  // ==========================

  useEffect(() => {

    async function getUser() {

      const {

        data: { user },

      } = await supabase.auth.getUser();

      if (!user) {

        router.push("/login");

        return;

      }

      setUser(user);

      setShowBriefing(true);

    }

    getUser();

  }, [router]);

  // ==========================
  // Load Tasks
  // ==========================

  useEffect(() => {

    const savedTasks =
      localStorage.getItem("tasks");

    if (savedTasks) {

      setTasks(JSON.parse(savedTasks));

    }

  }, []);

  // ==========================
  // Logout
  // ==========================

 async function handleLogout() {

   const { error } = await supabase.auth.signOut();

   if (error) {
     alert(error.message);
     return;
   }

   window.location.href = "/login";

 }

  return (

    <div className="min-h-screen bg-gray-100 flex">

      {/* ==========================
          Mobile Overlay
      ========================== */}

      {sidebarOpen && (

        <div
          onClick={() =>
            setSidebarOpen(false)
          }
          className="fixed inset-0 bg-black/40 z-40 lg:hidden transition-opacity"
        />

      )}

      {/* ==========================
          Sidebar
      ========================== */}

      <aside
        className={`
          fixed
          lg:static
          top-0
          left-0
          z-50
          h-screen
          w-72
          bg-blue-700
          text-white
          p-6
          transform
          transition-transform
          duration-300
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* Header */}

        <div className="flex items-start justify-between gap-3">

          <h1 className="text-3xl font-bold">TimeTable Hub</h1>

          {/* Mobile Close */}

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-3xl font-bold"
          >
            ✕
          </button>

        </div>

        {/* Navigation */}

        <nav className="mt-10 space-y-3">

          <button
            onClick={() => setSidebarOpen(false)}
            className="w-full rounded-xl px-4 py-3 text-left hover:bg-blue-600 transition"
          >
            🏠 Dashboard
          </button>

          <button
            onClick={() => {
              setSidebarOpen(false);
              router.push("/dashboard/calendar");
            }}
            className="w-full rounded-xl px-4 py-3 text-left hover:bg-blue-600 transition"
          >
            📅 Calendar
          </button>

          <button
            onClick={() => setSidebarOpen(false)}
            className="w-full rounded-xl px-4 py-3 text-left hover:bg-blue-600 transition"
          >
            ✅ Tasks
          </button>

          <button
            onClick={() => setSidebarOpen(false)}
            className="w-full rounded-xl px-4 py-3 text-left hover:bg-blue-600 transition"
          >
            🎯 Goals
          </button>

          <button
            onClick={() => setSidebarOpen(false)}
            className="w-full rounded-xl px-4 py-3 text-left hover:bg-blue-600 transition"
          >
            ⚙ Settings
          </button>

        </nav>

        {/* User */}

        <div className="absolute bottom-0 left-0 w-full border-t border-blue-500 p-6">

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl font-bold text-blue-700">

              {(user?.user_metadata?.full_name ||
                user?.email ||
                "U")
                .charAt(0)
                .toUpperCase()}

            </div>

            <div className="flex-1">

              <h3 className="font-bold">

                {user?.user_metadata?.full_name || "User"}

              </h3>

              <p className="break-all text-xs text-blue-100">

                {user?.email}

              </p>

              <p className="mt-1 text-xs text-green-300">

                🟢 Online

              </p>

            </div>

          </div>

          <button
            onClick={handleLogout}
            className="mt-5 w-full rounded-xl bg-red-500 py-3 font-semibold transition hover:bg-red-600"
          >
            🚪 Logout
          </button>

        </div>

      </aside>

      {/* ==========================
          Main Content
      ========================== */}

      <main className="flex-1 lg:ml-0 p-4 md:p-6 lg:p-8">

        {/* Mobile Header */}

        <div className="mb-6 flex items-center justify-between lg:hidden">

          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-xl bg-blue-600 p-3 text-white shadow-md transition hover:bg-blue-700"
          >
            ☰
          </button>

          <h1 className="text-xl font-bold text-gray-800">
            TimeTable Hub
          </h1>

          <div className="w-12"></div>

        </div>

        {/* Welcome Card */}

        <div className="rounded-2xl bg-white p-5 shadow-md md:p-6">

          <h2 className="text-2xl font-bold md:text-4xl">

            Good Morning 👋

          </h2>

          <p className="mt-2 text-gray-500">

            Welcome to your personal dashboard.

          </p>

       </div>

        {/* Calendar + Summary */}

        <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">

          <CustomCalendar />
          
          <div className="rounded-2xl bg-white p-6 shadow-md">

            <h2 className="text-2xl font-bold mb-6">

              📊 Today's Summary

            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4 mb-6">

              {/* Total */}

              <div className="rounded-2xl bg-blue-50 border border-blue-200 p-3 sm:p-5">

                <p className="text-gray-600 text-xs sm:text-sm">

                  📋 Total Tasks

                </p>

                <h2 className="mt-2 text-4xl font-bold text-blue-700">

                  {todayTasks.length}

                </h2>

              </div>

              {/* Completed */}

              <div className="rounded-2xl bg-green-50 border border-green-200 p-3 sm:p-5">

                <p className="text-gray-600 text-xs sm:text-sm">

                  ✅ Completed

                </p>

                <h2 className="mt-2 text-2xl sm:text-4xl font-bold text-green-600">

                  {completedTasks.length}

                </h2>

              </div>

              {/* Pending */}

              <div className="rounded-2xl bg-yellow-50 border border-yellow-200 p-3 sm:p-5">

                <p className="text-gray-600 text-xs sm:text-sm"> 

                  ⏳ Pending

                </p>

                <h2 className="mt-2 text-2xl sm:text-4xl font-bold text-yellow-600">

                   {pendingTasks.length}

                </h2>

              </div>

              {/* Progress */}

              <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-3 sm:p-5 text-white">

                <div className="flex items-center justify-between">

                  <p className="text-xs sm:text-sm">

                    📈 Progress

                  </p>

                  <h2 className="text-2xl sm:text-3xl font-bold">

                    {progress}%

                  </h2>

                </div>

                <div className="mt-4 h-3 rounded-full bg-white/30 overflow-hidden">

                  <div
                    className="h-full rounded-full bg-white transition-all duration-700"
                    style={{
                      width: `${progress}%`,
                    }}
                   />

                </div>

              </div>  

              {/* Next Task */}

              <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4 sm:p-5 mt-6">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-gray-500 text-sm">

                      ⏰ Next Task

                    </p>

                    <h3 className="mt-2 text-lg sm:text-xl font-bold text-blue-700 break-words">

                      {nextTask
                        ? nextTask.taskName
                        : "No Pending Task"}

                    </h3>

                    <p className="text-gray-500 mt-1">

                      {nextTask
                        ? nextTask.startTime
                         : "Enjoy your day 🎉"}

                    </p>

                  </div>

                </div>

              </div>
             {/* Focus Time */}

              <div className="rounded-2xl border border-red-200 bg-red-50 p-4 sm:p-5 mt-6">
               <div className="flex items-center justify-between">

                 <span className="text-gray-600">

                  ⏱ Focus Time

                </span>

                <span className="font-bold text-blue-700 break-words">

                  {focusHours} hr {focusMinutes} min

                </span>
                <div className="text-3xl sm:text-5xl">

                    ⏰

                  </div>

              </div>

            </div>

            {/* Productivity */}

            <div className="border-t pt-4">

              <div className="flex justify-between">

                <span className="text-gray-600">

                  🔥 Productivity

                </span>

                <span className="font-bold text-green-600 break-words">

                  {productivity}

                </span>

              </div>

            </div>

            {/* Today's Date */}

            <div className="border-t pt-4">

              <div className="flex justify-between">

                <span className="text-gray-600">

                  📅 Today

                </span>

                <span className="font-bold">

                  {new Date().toISOString().split("T")[0]}

                </span>

              </div>

            </div>

          </div>

        </div>

        </div>

        {/* Timeline */}

        <div className="mt-6">

          <Timeline />

        </div>

        {/* Daily Briefing */}

        <DailyBriefing
          isOpen={showBriefing}
          onClose={() => setShowBriefing(false)}
          tasks={tasks}
          user={user}
        />

      </main>

    </div>

  );

}