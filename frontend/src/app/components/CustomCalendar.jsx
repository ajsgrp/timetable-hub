"use client";

import { useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useCalendar } from "../../context/CalendarContext";

export default function CustomCalendar() {
  const { selectedDate, setSelectedDate } = useCalendar();

  // Today's Date
  const today = useMemo(() => new Date(), []);

  // Selected Date Text
  const selectedDateText = useMemo(() => {
    return selectedDate.toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, [selectedDate]);

  // Click Date
  function handleDateClick(info) {
    setSelectedDate(info.date);
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      {/* Heading */}
      <h2 className="text-2xl font-bold mb-5">
        📅 Calendar
      </h2>

      {/* Selected Date */}
      <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-4">

        <p className="text-sm text-gray-500">
          Selected Date
        </p>

        <h3 className="text-xl font-bold text-blue-700">
          {selectedDateText}
        </h3>

      </div>

      {/* Calendar */}
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}

        initialView="dayGridMonth"

        initialDate={selectedDate}

        height="auto"

        dateClick={handleDateClick}

        selectable={true}

        nowIndicator={true}

        dayMaxEvents={true}

        fixedWeekCount={false}

        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "",
        }}

        dayCellClassNames={(arg) => {
          const isSelected =
            arg.date.toDateString() ===
            selectedDate.toDateString();

          const isToday =
            arg.date.toDateString() ===
            today.toDateString();

          if (isSelected) return ["selected-day"];

          if (isToday) return ["today-day"];

          return [];
        }}
      />
    </div>
  );
}