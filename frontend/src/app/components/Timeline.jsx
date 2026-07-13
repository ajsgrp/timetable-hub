"use client";

import { useEffect, useState } from "react";
import { useCalendar } from "../../context/CalendarContext";
import TaskModal from "./TaskModal";
import TaskCard from "./TaskCard";

export default function Timeline() {

  const { selectedDate } = useCalendar();
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("tasks");

    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }, []);

  function openModal(hour) {

    setEditingIndex(null);

    setStartTime(
      `${hour.toString().padStart(2, "0")}:00`
    );

    setEndTime(
      `${hour.toString().padStart(2, "0")}:30`
    );

    setShowModal(true);

  }

  function saveTask(task) {

    let updated = [...tasks];

    if (editingIndex !== null) {

      updated[editingIndex] = {
        ...task,
        completed:
          updated[editingIndex].completed,
      };

    } else {

     updated.push({

      ...task,

      taskDate:
      selectedDate.toISOString().split("T")[0],

      completed:false,

});

    }

    setTasks(updated);

    localStorage.setItem(
      "tasks",
      JSON.stringify(updated)
    );

    setShowModal(false);

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

  function editTask(index) {

    setEditingIndex(index);

    setStartTime(tasks[index].startTime);

    setEndTime(tasks[index].endTime);

    setShowModal(true);

  }

  return (

    <>

      <div className="bg-white rounded-2xl shadow-md p-5 mb-6">

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

          <div>

            <h2 className="text-3xl font-bold text-gray-800">
              ⏰ Daily Timeline
            </h2>

            <p className="text-gray-500 mt-1">
              Plan your day with smart scheduling.
            </p>

          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-3">

            <p className="text-sm text-gray-500">
              Selected Date
            </p>

            <h3 className="text-xl font-bold text-blue-700">
              {selectedDate.toDateString()}
            </h3>

          </div>

        </div>

      </div>

        <div className="bg-white rounded-2xl shadow-md p-5 space-y-4">

          {Array.from({ length: 24 }).map((_, hour) => {

            const hourString =
              hour.toString().padStart(2, "0");

            const selectedDateString =
                selectedDate.toISOString().split("T")[0];

             const hourTasks = tasks.filter(
                (task) =>

                task.startTime.startsWith(hourString)

                  &&
                task.taskDate === selectedDateString

                 );
            return (

              <div
                key={hour}
                className="flex flex-col md:flex-row gap-4 border-b border-gray-200 py-4"
              >

                <div className="w-20 font-bold text-blue-700 pt-3">

                  {hourString}:00

                </div>

                <div className="flex-1"></div>
                     {hourTasks.length === 0 ? (

                    <div
                      onClick={() => openModal(hour)}
                       className="border-2 border-dashed border-blue-300 rounded-xl p-5 text-center text-gray-400 cursor-pointer hover:bg-blue-50 hover:border-blue-500 hover:text-blue-700 transition-all duration-300 rounded-2xl"
                      
                    >
                      + Click to Add Task
                    </div>

                  ) : (

                    <div className="space-y-3">

                      {hourTasks.map((task) => {

                        const index = tasks.indexOf(task);

                        return (

                          <div
                            key={index}
                            className={`rounded-xl p-3 ${
                              task.completed
                                ? "bg-green-100 border border-green-500"
                                : "bg-white border"
                            }`}
                          >

                            <TaskCard
                              task={task}
                              onEdit={() => editTask(index)}
                              onDelete={() => deleteTask(index)}
                            />

                            <button
                              onClick={() =>
                                completeTask(index)
                              }
                              className={`mt-3 px-4 py-2 rounded-lg text-white ${
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

                      <button
                        onClick={() => openModal(hour)}
                        className="text-blue-600 font-semibold"
                      >
                        + Add Another Task
                      </button>

                    </div>

                  )}

                </div>

            );

          })}

        </div>

      <TaskModal
        isOpen={showModal}
        onClose={() => {
          setEditingIndex(null);
          setShowModal(false);
        }}
        onSave={saveTask}
        defaultStartTime={startTime}
        defaultEndTime={endTime}
         editingTask={
           editingIndex !== null ? tasks[editingIndex] : null
        }
      />

    </>

  );

}