"use client";

import { useEffect, useState } from "react";

export default function TaskModal({
  isOpen,
  onClose,
  onSave,
  defaultStartTime = "",
  defaultEndTime = "",
}) {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState(defaultStartTime);
  const [endTime, setEndTime] = useState(defaultEndTime);
  const [category, setCategory] = useState("Personal");
  const [priority, setPriority] = useState("Medium");
  const [taskDate, setTaskDate] = useState(
  new Date().toISOString().split("T")[0]
);
  useEffect(() => {
  if (isOpen) {
    setStartTime(defaultStartTime);
    setEndTime(defaultEndTime); 
    setStartTime("");
    setEndTime("");
  }
}, [defaultStartTime, defaultEndTime, isOpen]);

  if (!isOpen) return null;

  function handleSave() {
    if (taskName.trim() === "") {
      alert("Please enter task name.");
      return;
    }

   onSave({
     taskName,
     description,
     taskDate,
     startTime,
     endTime,
     category,
     priority,
   });

    setTaskName("");
    setDescription("");
    setCategory("Personal");
    setPriority("Medium");

    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl p-6 w-[500px]">

        <h2 className="text-2xl font-bold mb-5">
          Add New Task
        </h2>

        <label className="font-medium">
          Task Name
        </label>

        <input
          className="w-full border rounded-lg p-3 mt-2 mb-4"
          placeholder="Example : Java Practice"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />

        <label className="font-medium">
          Description
        </label>

        <textarea
          className="w-full border rounded-lg p-3 mt-2 mb-4 h-28 resize-none"
          placeholder="Write complete task details..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label className="font-medium mt-4 block">
             Task Date
         </label>

             <input
               type="date"
               className="w-full border rounded-lg p-3 mt-2 mb-4"
               value={taskDate}
               onChange={(e) => setTaskDate(e.target.value)}
            /> 

        <div className="grid grid-cols-2 gap-4">

          <div>

            <label className="font-medium">
              Start Time
            </label>

            <input
              type="time"
              className="w-full border rounded-lg p-3 mt-2"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />

          </div>

          <div>

            <label className="font-medium">
              End Time
            </label>

            <input
              type="time"
              className="w-full border rounded-lg p-3 mt-2"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />

          </div>

        </div>

        <div className="grid grid-cols-2 gap-4 mt-5">

          <div>

            <label className="font-medium">
              Category
            </label>

            <select
              className="w-full border rounded-lg p-3 mt-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Study</option>
              <option>Work</option>
              <option>Personal</option>
              <option>Sleep</option>
              <option>Gym</option>
              <option>Meeting</option>
            </select>

          </div>

          <div>

            <label className="font-medium">
              Priority
            </label>

            <select
              className="w-full border rounded-lg p-3 mt-2"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>

          </div>

        </div>

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={onClose}
            className="border px-5 py-2 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            Save Task
          </button>

        </div>

      </div>

    </div>
  );
}