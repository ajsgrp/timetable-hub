"use client";

import { createContext, useContext, useState } from "react";

const CalendarContext = createContext();

export function CalendarProvider({ children }) {

  const [selectedDate, setSelectedDate] = useState(new Date());

  return (

    <CalendarContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
      }}
    >

      {children}

    </CalendarContext.Provider>

  );

}

export function useCalendar() {
  return useContext(CalendarContext);
}