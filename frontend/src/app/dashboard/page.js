"use client";

import CustomCalendar from "../components/CustomCalendar";
import Timeline from "../components/Timeline";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState(null);

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
      }

      getUser();

    }, []);

    async function handleLogout() {

      await supabase.auth.signOut();

      router.push("/login");

     }

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
          <div className="mt-auto pt-8 border-t border-blue-400">

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-full bg-white text-blue-700 flex items-center justify-center text-xl font-bold">

               {(user?.user_metadata?.full_name ||
                 user?.email ||
                  "U")
                 .charAt(0)
                  .toUpperCase()}

              </div>

              <div className="flex-1">

                <h3 className="text-white font-bold">
                  {user?.user_metadata?.full_name || "User"}
                </h3>

                <p className="text-blue-100 text-sm break-all">
                 {user?.email}
                </p>

                <p className="text-green-300 text-xs mt-1">
                  🟢 Online
                </p>

             </div>

            </div>

            <button
              onClick={handleLogout}
              className="mt-6 w-full bg-red-500 hover:bg-red-600 rounded-xl py-3 font-semibold transition"
            >
             🚪 Logout
            </button>

          </div>

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