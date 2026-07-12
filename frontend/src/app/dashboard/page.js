"use client";

import CustomCalendar from "../components/CustomCalendar";
import Timeline from "../components/Timeline";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}
      <aside className="w-72 bg-blue-700 text-white p-6">

        <h1 className="text-3xl font-bold">
          TimeTable Hub
        </h1>

        <nav className="mt-10 space-y-5">

          <p>🏠 Dashboard</p>
          <p>📅 Calendar</p>
          <p>✅ Tasks</p>
          <p>🎯 Goals</p>
          <p>⚙ Settings</p>

        </nav>

      </aside>

      {/* Main */}
      <main className="flex-1 p-8">

        <div className="bg-white rounded-2xl shadow-md p-6">

          <h2 className="text-4xl font-bold">
            Good Morning 👋
          </h2>

          <p className="text-gray-500">
            Welcome to your personal dashboard.
          </p>

        </div>

        <div className="grid grid-cols-2 gap-8 mt-8">

          <CustomCalendar />

          <div className="bg-white rounded-2xl shadow-md p-6">

            <h2 className="text-2xl font-bold">
              Today's Summary
            </h2>

          </div>

        </div>

        <Timeline />

      </main>

    </div>
  );
}