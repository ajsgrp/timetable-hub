"use client";

import { useEffect, useMemo, useState } from "react";
import { useCalendar } from "../../context/CalendarContext";
import TaskModal from "./TaskModal";
import TaskCard from "./TaskCard";

export default function Timeline() {

  const { selectedDate } = useCalendar();

  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [editingIndex, setEditingIndex] = useState(null);

  const [defaultStartTime, setDefaultStartTime] =
    useState("00:00");

  const [defaultEndTime, setDefaultEndTime] =
    useState("00:30");

  useEffect(() => {

    const saved =
      localStorage.getItem("tasks");

    if (saved) {

      setTasks(JSON.parse(saved));

    }

  }, []);

  const todayTasks = useMemo(() => {

    const date =
      selectedDate
        .toISOString()
        .split("T")[0];

    return tasks

      .filter(
        (task) =>
          task.taskDate === date
      )

      .sort((a, b) =>
        a.startTime.localeCompare(
          b.startTime
        )
      );

  }, [tasks, selectedDate]);
    function openModal(startTime = "00:00") {

    setEditingIndex(null);

    setDefaultStartTime(startTime);

    const [hour, minute] = startTime
      .split(":")
      .map(Number);

    let endHour = hour;
    let endMinute = minute + 30;

    if (endMinute >= 60) {
      endHour += 1;
      endMinute -= 60;
    }

    const endTime = `${endHour
      .toString()
      .padStart(2, "0")}:${endMinute
      .toString()
      .padStart(2, "0")}`;

    setDefaultEndTime(endTime);

    setShowModal(true);
  }

  function hasTimeConflict(newTask) {

    return tasks.some((task, index) => {

      // Edit karte waqt apne hi task ko ignore karo
      if (editingIndex !== null && index === editingIndex) {
        return false;
      }

      // Sirf same date ke tasks check karo
      if (task.taskDate !== newTask.taskDate) {
        return false;
      }

      return (
        newTask.startTime < task.endTime &&
        newTask.endTime > task.startTime
      );

    });

  }

  function saveTask(task) {
    
    let updated = [...tasks];
      if (hasTimeConflict(task)) {

        alert(
          "⚠️ This time slot is already occupied.\n\nPlease choose another time."
        );

        return;

      }

    if (editingIndex !== null) {

      updated[editingIndex] = {
        ...updated[editingIndex],
        ...task,
      };

    } else {

      updated.push({
        ...task,
        completed: false,
      });

    }

    updated.sort((a, b) =>
      a.startTime.localeCompare(b.startTime)
    );

    setTasks(updated);

    localStorage.setItem(
      "tasks",
      JSON.stringify(updated)
    );

    setShowModal(false);

    setEditingIndex(null);
  }

  function editTask(index) {

    console.log(tasks[index]); // Debug

    setEditingIndex(index);

    setDefaultStartTime(tasks[index].startTime);
    setDefaultEndTime(tasks[index].endTime);

    setShowModal(true);

  }

  function deleteTask(index) {

    const updated = tasks.filter(
      (_, i) => i !== index
    );

    setTasks(updated);

    localStorage.setItem(
      "tasks",
      JSON.stringify(updated)
    );

  }

  function completeTask(index) {

    const updated = [...tasks];

    updated[index].completed =
      !updated[index].completed;

    setTasks(updated);

    localStorage.setItem(
      "tasks",
      JSON.stringify(updated)
    );

  }

  const nextStartTime =
    todayTasks.length > 0
      ? todayTasks[todayTasks.length - 1].endTime
      : "00:00";
        return (

    <>

      <div className="bg-white rounded-2xl shadow-md p-6 mb-6">

        <div className="flex justify-between items-center">

          <div>

            <h2 className="text-3xl font-bold">
              📅 Daily Schedule
            </h2>

            <p className="text-gray-500 mt-2">
              {selectedDate.toDateString()}
            </p>

          </div>

          <div className="text-right">

            <h3 className="text-xl font-bold text-blue-600">
              {todayTasks.length}
            </h3>

            <p className="text-gray-500">
              Tasks Today
            </p>

          </div>

        </div>

      </div>

      <div className="space-y-5">

        {todayTasks.length === 0 ? (

          <div
            onClick={() => openModal("00:00")}
            className="border-2 border-dashed border-blue-300 rounded-2xl p-10 text-center cursor-pointer hover:bg-blue-50 transition"
          >

            <h2 className="text-2xl font-bold">
              ➕ Add First Task
            </h2>

            <p className="text-gray-500 mt-3">
              Start planning your day.
            </p>

          </div>

        ) : (
          <>
            {todayTasks.map((task) => {

              const index = tasks.findIndex(
                (t) =>
                  t.startTime === task.startTime &&
                  t.taskDate === task.taskDate &&
                  t.taskName === task.taskName
              );

              return (

                <div
                  key={index}
                  className={`rounded-2xl border ${
                    task.completed
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 bg-white"
                  } p-4 shadow-sm`}
                >

                  <TaskCard
                    task={task}
                    onEdit={() => editTask(index)}
                    onDelete={() => deleteTask(index)}
                  />

                  <button
                    onClick={() => completeTask(index)}
                    className={`mt-4 px-5 py-2 rounded-lg text-white ${
                      task.completed
                        ? "bg-green-600"
                        : "bg-blue-600"
                    }`}
                  >
                    {task.completed
                      ? "✔ Completed"
                      : "Mark Complete"}
                  </button>

                </div>

              );

            })}

            <div
              onClick={() => openModal(nextStartTime)}
              className="border-2 border-dashed border-blue-300 rounded-2xl p-8 text-center cursor-pointer hover:bg-blue-50 transition"
            >

              <h2 className="text-xl font-bold">
                ➕ Add Next Task
              </h2>

              <p className="text-gray-500 mt-2">
                Starts from {nextStartTime}
              </p>

            </div>

          </>

        )}

      </div>

      <TaskModal
        isOpen={showModal}
        onClose={() => {
         setEditingIndex(null);
         setShowModal(false);
       }}
        onSave={saveTask}
        selectedDate={selectedDate}
        editingTask={
          editingIndex !== null
            ? tasks[editingIndex]
            : null
        }
        defaultStartTime={defaultStartTime}
        defaultEndTime={defaultEndTime}
      />

    </>

  );

}