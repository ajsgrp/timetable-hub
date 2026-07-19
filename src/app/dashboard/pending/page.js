"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import PendingStats from "@/app/components/pending/PendingStats";
import PendingFilter from "@/app/components/pending/PendingFilter";
import PendingTaskCard from "@/app/components/pending/PendingTaskCard";

export default function PendingPage() {

  const router = useRouter();

  const [tasks, setTasks] = useState([]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("pending");
  
  useEffect(() => {

     function loadTasks() {

       const saved = localStorage.getItem("tasks");

       if (saved) {
         setTasks(JSON.parse(saved));
       } else {
         setTasks([]);
       }

     }

     loadTasks();

     window.addEventListener("tasksUpdated", loadTasks);

     return () => {
       window.removeEventListener("tasksUpdated", loadTasks);
     };

   }, []);

  const filteredTasks = useMemo(() => {

    const today = new Date();

    return tasks
      .filter((task) => {

        if (activeTab === "pending") {
          return !task.completed;
        }

        return task.completed;

      })

      .filter((task) => {

        if (
          search &&
          !task.taskName.toLowerCase().includes(search.toLowerCase())
        ) {
          return false;
        }

        if (filter === "today") {

          return (
            new Date(task.taskDate).toDateString() ===
            today.toDateString()
          );

        }

        if (filter === "week") {

          const diff =
            (new Date(task.taskDate) - today) /
            (1000 * 60 * 60 * 24);

          return diff >= 0 && diff <= 7;

        }

        if (filter === "month") {

          return (
            new Date(task.taskDate).getMonth() ===
            today.getMonth()
          );

        }

         return true;

      })

      .sort((a, b) => {

        if (taskDateCompare(a.taskDate, b.taskDate) !== 0) {
          return taskDateCompare(a.taskDate, b.taskDate);
        }

        return a.startTime.localeCompare(b.startTime);

      });

  }, [tasks, search, filter, activeTab]);

 
  function handleDelete(task) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    const updatedTasks = tasks.filter((t) => t.id !== task.id);

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    window.dispatchEvent(new Event("tasksUpdated"));
  }

  function handleComplete(task) {

    const updatedTasks = tasks.map((t) =>
      t.id === task.id
        ? { ...t, completed: true }
        : t
    );

    setTasks(updatedTasks);

    localStorage.setItem(
      "tasks",
      JSON.stringify(updatedTasks)
    );

    window.dispatchEvent(new Event("tasksUpdated"));

  }

  function handleEdit(task) {
    alert(`Edit feature coming soon.\n\nTask: ${task.taskName}`);
  }

  function taskDateCompare(date1, date2) {

    return new Date(date1) - new Date(date2);

  }

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-6xl mx-auto">

        <div className="flex items-center justify-between mb-8">

          <h1 className="text-4xl font-bold">
            📋 All Task
          </h1>

          <button
            onClick={() => router.push("/dashboard")}
            className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700"
          >
            ← Dashboard
          </button>

        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <PendingFilter
              search={search}
              setSearch={setSearch}
              filter={filter}
              setFilter={setFilter}
            />
            <div className="flex gap-3 mb-6">

              <button
                 onClick={() => setActiveTab("pending")}
                 className={`px-6 py-3 rounded-xl font-semibold transition ${
                   activeTab === "pending"
                      ? "bg-yellow-500 text-white"
                      : "bg-gray-200 text-gray-700"
                 }`}
              >
                 🟡 Pending
              </button>

              <button
                 onClick={() => setActiveTab("completed")}
                 className={`px-6 py-3 rounded-xl font-semibold transition ${
                   activeTab === "completed"
                       ? "bg-green-600 text-white"
                       : "bg-gray-200 text-gray-700"
                }`}
              >
                ✅ Completed
              </button>

            </div>

            <PendingStats
              pendingTasks={filteredTasks}
            />

          </div>

          {filteredTasks.length === 0 ? (

            <div className="text-center py-20">

              <h2 className="text-3xl font-bold">
                🎉 No Pending Tasks
              </h2>

              <p className="text-gray-500 mt-3">

                All your tasks are completed.

              </p>

            </div>

          ) : (

            <div className="space-y-5">

              {filteredTasks.map((task, index) => (
                <PendingTaskCard
                   key={task.id}
                   task={task}
                   onComplete={handleComplete}
                   onEdit={handleEdit}
                   onDelete={handleDelete}
                />
              ))}

            </div>

          )}

        </div>

      </div>

    </div>

  );

}