"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useCalendar } from "../../context/CalendarContext";

export default function CustomCalendar() {
  const { selectedDate, setSelectedDate } = useCalendar();

  function handleDateClick(info) {

   setSelectedDate(info.date);

  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <h2 className="text-2xl font-bold mb-5">
        📅 Calendar
      </h2>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        initialDate={selectedDate}
        height="auto"
        dateClick={handleDateClick}
      />

    </div>
  );
}