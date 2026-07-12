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

      <div className="flex justify-between items-center mb-6">

           <h2 className="text-2xl font-bold">
                ⏰ 24 Hour Timeline
           </h2>

            <div className="text-blue-700 font-bold text-lg">

                   📅 {selectedDate.toDateString()}

            </div>

        </div>

        <div className="space-y-5">

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
                className="flex gap-5 border-b pb-5"
              >

                <div className="w-20 font-bold text-blue-700 pt-3">

                  {hourString}:00

                </div>

                <div className="flex-1"></div>
                     {hourTasks.length === 0 ? (

                    <div
                      onClick={() => openModal(hour)}
                      className="border-2 border-dashed rounded-xl p-4 text-center text-gray-400 cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition"
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
      />

    </>

  );

}