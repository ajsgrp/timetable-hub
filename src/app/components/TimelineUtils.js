// ==============================
// Get Selected Date
// ==============================

export function getSelectedDate(selectedDate) {
  return selectedDate.toISOString().split("T")[0];
}

// ==============================
// Get Task Starting Hour
// ==============================

export function getTaskStartingAtHour(
  tasks,
  selectedDate,
  hour
) {

  const date = getSelectedDate(selectedDate);

  return tasks.find((task) => {

    const startHour = Number(
      task.startTime.split(":")[0]
    );

    return (
      task.taskDate === date &&
      startHour === hour
    );

  });

}

// ==============================
// Check Occupied Hour
// ==============================

export function isHourOccupied(
  tasks,
  selectedDate,
  hour
) {

  const date = getSelectedDate(selectedDate);

  return tasks.some((task) => {

    if (task.taskDate !== date)
      return false;

    const start = Number(
      task.startTime.split(":")[0]
    );

    const end = Number(
      task.endTime.split(":")[0]
    );

    return hour > start && hour < end;

  });

}

// ==============================
// Should Render Hour
// ==============================

export function shouldRenderHour(
  tasks,
  selectedDate,
  hour
) {

  const date = getSelectedDate(selectedDate);

  for (const task of tasks) {

    if (task.taskDate !== date)
      continue;

    const start = Number(
      task.startTime.split(":")[0]
    );

    const end = Number(
      task.endTime.split(":")[0]
    );

    if (hour === start)
      return true;

    if (hour > start && hour < end)
      return false;

  }

  return true;

}

// ==============================
// Task Height
// ==============================

export function getTaskHeight(task) {

  const start = new Date(
    `2000-01-01T${task.startTime}`
  );

  const end = new Date(
    `2000-01-01T${task.endTime}`
  );

  const diffHours =
    (end - start) /
    (1000 * 60 * 60);

  return Math.max(
    diffHours * 120,
    120
  );

}