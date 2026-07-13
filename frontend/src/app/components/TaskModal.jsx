"use client";

import CustomCalendar from "../components/CustomCalendar";
import Timeline from "../components/Timeline";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



export default function TaskModal({
  isOpen,
  onClose,
  onSave,
  defaultStartTime = "",
  defaultEndTime = "",
  selectedDate,
  editingTask = null,
}) {

  // ==========================
  // States
  // ==========================

  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [shortGoal, setShortGoal] = useState("");
  const [longGoal, setLongGoal] = useState("");
  const [notes, setNotes] = useState("");
  const [startTime, setStartTime] = useState(defaultStartTime);
  const [endTime, setEndTime] = useState(defaultEndTime);
  const [duration, setDuration] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [category, setCategory] = useState("Personal");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("Pending");
  const [color, setColor] = useState("#2563eb");


  // ==========================
  // Open Modal
  // ==========================

  useEffect(() => {

    if (!isOpen) return;

    if (editingTask) {

      setTaskName(editingTask.taskName || "");
      setDescription(editingTask.description || "");

      setShortGoal(editingTask.shortGoal || "");
      setLongGoal(editingTask.longGoal || "");

      setNotes(editingTask.notes || "");

      setTaskDate(editingTask.taskDate || "");

      setStartTime(editingTask.startTime || "");
      setEndTime(editingTask.endTime || "");

      setCategory(editingTask.category || "Personal");
      setPriority(editingTask.priority || "Medium");

      setStatus(editingTask.status || "Pending");

      setColor(editingTask.color || "#2563eb");

    } else {

      setTaskName("");
      setDescription("");

      setShortGoal("");
      setLongGoal("");

      setNotes("");

      setTaskDate(
        selectedDate
          ? selectedDate.toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0]
      );

      setStartTime(defaultStartTime);
      setEndTime(defaultEndTime);

      setCategory("Personal");
      setPriority("Medium");

      setStatus("Pending");

      setColor("#2563eb");

    }

  }, [
    isOpen,
    editingTask,
    selectedDate,
    defaultStartTime,
    defaultEndTime,
  ]);



  // ==========================
  // Auto Duration
  // ==========================

  useEffect(() => {

    if (!startTime || !endTime) {

      setDuration("");

      return;

    }

    const start = new Date(`2000-01-01T${startTime}`);

    const end = new Date(`2000-01-01T${endTime}`);

    if (end <= start) {

      setDuration("Invalid Time");

      return;

    }

    const diff = end - start;

    const hrs = Math.floor(
      diff / (1000 * 60 * 60)
    );

    const mins = Math.floor(
      (diff % (1000 * 60 * 60)) /
      (1000 * 60)
    );

    setDuration(`${hrs} hr ${mins} min`);

  }, [startTime, endTime]);



  // ==========================
  // Save Task
  // ==========================

  function handleSave() {

    if (!taskName.trim()) {

      alert("Please enter task name.");

      return;

    }

    if (duration === "Invalid Time") {

      alert(
        "End Time must be after Start Time."
      );

      return;

    }

    onSave({

      taskName,

      description,

      shortGoal,

      longGoal,

      notes,

      taskDate,

      startTime,

      endTime,

      duration,

      category,

      priority,

      status,

      color,

    });

    onClose();

  }

  if (!isOpen) return null;
    return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">

      <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl">

        {/* Header */}

        <div className="border-b p-6">

          <h2 className="text-3xl font-bold text-blue-700">

            📅 Add New Task

          </h2>

          <p className="mt-1 text-gray-500">

            Plan your day efficiently.

          </p>

        </div>

        {/* Body */}

        <div className="p-6 space-y-6">

          {/* Task Name */}

          <div>

            <label className="font-semibold">

              📌 Task Name

            </label>

            <input

              type="text"

              placeholder="Example : Study React"

              value={taskName}

              onChange={(e)=>setTaskName(e.target.value)}

              className="mt-2 w-full rounded-xl border p-3 focus:border-blue-600 focus:outline-none"

            />

          </div>

          {/* Description */}

          <div>

            <label className="font-semibold">

              📝 Description

            </label>

            <textarea

              rows={4}

              placeholder="Describe your task..."

              value={description}

              onChange={(e)=>setDescription(e.target.value)}

              className="mt-2 w-full rounded-xl border p-3 resize-none focus:border-blue-600 focus:outline-none"

            />

          </div>

          {/* Goals */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>

              <label className="font-semibold">

                🎯 Short Goal

              </label>

              <input

                type="text"

                value={shortGoal}

                onChange={(e)=>setShortGoal(e.target.value)}

                placeholder="Finish Chapter 4"

                className="mt-2 w-full rounded-xl border p-3"

              />

            </div>

            <div>

              <label className="font-semibold">

                🏆 Long Goal

              </label>

              <input

                type="text"

                value={longGoal}

                onChange={(e)=>setLongGoal(e.target.value)}

                placeholder="Crack CMA"

                className="mt-2 w-full rounded-xl border p-3"

              />

            </div>

          </div>

          {/* Date & Time */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            <div>

              <label className="font-semibold">

                📅 Date

              </label>

              <input

                type="date"

                value={taskDate}

                onChange={(e)=>setTaskDate(e.target.value)}

                className="mt-2 w-full rounded-xl border p-3"

              />

            </div>

            <div>

              <label className="font-semibold">

                🕒 Start Time

              </label>

              <input

                type="time"

                value={startTime}

                onChange={(e)=>setStartTime(e.target.value)}

                className="mt-2 w-full rounded-xl border p-3"

              />

            </div>

            <div>

              <label className="font-semibold">

                🕓 End Time

              </label>

              <input

                type="time"

                value={endTime}

                onChange={(e)=>setEndTime(e.target.value)}

                className="mt-2 w-full rounded-xl border p-3"

              />

            </div>

          </div>

          {/* Duration */}

          <div>

            <label className="font-semibold">

              ⏱ Duration

            </label>

            <input

              value={duration}

              readOnly

              className="mt-2 w-full rounded-xl border bg-gray-100 p-3 font-semibold"

            />

          </div>

          {/* Category + Priority + Status */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            <div>

              <label className="font-semibold">

                📂 Category

              </label>

              <select

                value={category}

                onChange={(e)=>setCategory(e.target.value)}

                className="mt-2 w-full rounded-xl border p-3"

              >

                <option>📚 Study</option>

                <option>💼 Work</option>

                <option>👤 Personal</option>

                <option>🏋 Gym</option>

                <option>😴 Sleep</option>

                <option>🤝 Meeting</option>

              </select>

            </div>

            <div>

              <label className="font-semibold">

                ⭐ Priority

              </label>

              <select

                value={priority}

                onChange={(e)=>setPriority(e.target.value)}

                className="mt-2 w-full rounded-xl border p-3"

              >

                <option>High</option>

                <option>Medium</option>

                <option>Low</option>

              </select>

            </div>

            <div>

              <label className="font-semibold">

                📊 Status

              </label>

              <select

                value={status}

                onChange={(e)=>setStatus(e.target.value)}

                className="mt-2 w-full rounded-xl border p-3"

              >

                <option>Pending</option>

                <option>In Progress</option>

                <option>Completed</option>

              </select>

            </div>

          </div>
                    {/* Task Color */}

          <div>

            <label className="font-semibold">
              🎨 Task Color
            </label>

            <div className="mt-3 flex flex-wrap gap-3">

              {[
                "#2563eb",
                "#16a34a",
                "#dc2626",
                "#ca8a04",
                "#9333ea",
                "#ec4899",
              ].map((item) => (

                <button
                  key={item}
                  type="button"
                  onClick={() => setColor(item)}
                  className={`h-10 w-10 rounded-full border-4 transition ${
                    color === item
                      ? "border-black scale-110"
                      : "border-white"
                  }`}
                  style={{
                    backgroundColor: item,
                  }}
                />

              ))}

            </div>

          </div>

          {/* Notes */}

          <div>

            <label className="font-semibold">
              📝 Notes
            </label>

            <textarea
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Write extra notes..."
              className="mt-2 w-full rounded-xl border p-3 resize-none focus:border-blue-600 focus:outline-none"
            />

          </div>

        </div>

        {/* Footer */}

        <div className="flex flex-col-reverse gap-3 border-t p-6 md:flex-row md:justify-end">

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-gray-300 px-6 py-3 font-semibold hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 transition"
          >
            💾 Save Task
          </button>

        </div>

      </div>

    </div>

  );

}