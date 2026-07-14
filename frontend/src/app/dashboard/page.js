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

        <div className="flex items-center justify-between">

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
            onClick={() => setSidebarOpen(false)}
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

            <h2 className="text-2xl font-bold">

              Today's Summary

            </h2>

            <p className="mt-3 text-gray-500">

              Dashboard analytics will appear here.

            </p>

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