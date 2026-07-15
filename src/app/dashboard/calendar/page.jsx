"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useRouter } from "next/navigation";

export default function CalendarPage() {

  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState(new Date());

  return (

    <div className="min-h-screen bg-slate-100">

      {/* Header */}

      <div className="border-b bg-white shadow-sm">

        <div className="mx-auto flex max-w-7xl items-center justify-between p-5">

          <div>

            <button
              onClick={() => router.push("/dashboard")}
              className="mb-3 rounded-lg bg-gray-100 px-4 py-2 hover:bg-gray-200"
            >
              ← Dashboard
            </button>

            <h1 className="text-3xl font-bold">

              📅 Smart Calendar

            </h1>

            <p className="mt-2 text-gray-500">

              Plan your work smarter.

            </p>

          </div>

          <button

            onClick={() => setSelectedDate(new Date())}

            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"

          >

            Today

          </button>

        </div>

      </div>

      {/* Content */}

      <div className="mx-auto grid max-w-7xl gap-8 p-5 lg:grid-cols-3">

        {/* Calendar */}

        <div className="rounded-3xl bg-white p-6 shadow-lg lg:col-span-2">

          <DayPicker

            mode="single"

            selected={selectedDate}

            onSelect={setSelectedDate}

            showOutsideDays

          />

        </div>

        {/* Right Panel */}

        <div className="rounded-3xl bg-white p-6 shadow-lg">

          <h2 className="text-2xl font-bold">

            Selected Date

          </h2>

          <div className="mt-6 rounded-2xl bg-blue-50 p-5">

            <p className="text-gray-500">

              Date

            </p>

            <h3 className="mt-2 text-2xl font-bold text-blue-700">

              {selectedDate.toDateString()}

            </h3>

          </div>

          <button

            className="mt-6 w-full rounded-xl bg-blue-600 py-4 font-bold text-white hover:bg-blue-700"

          >

            ➕ Add Task

          </button>

        </div>

      </div>

    </div>

  );

}