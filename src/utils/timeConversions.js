// Helper function to convert 12-hour time to 24-hour time
export const to24HourFormat = (timeStr) => {
  const [time, period] = timeStr.split(/(am|pm)/);
  let [hours, minutes] = time.split(":").map(Number);

  if (period === "pm" && hours !== 12) hours += 12;
  if (period === "am" && hours === 12) hours = 0;

  return { hours, minutes };
};

// Function to get start and end Date objects
export const getStartAndEndDates = (date, timeRange) => {
  const [startTimeStr, endTimeStr] = timeRange
    .split("-")
    .map((time) => time.trim());
  const startTime = to24HourFormat(startTimeStr);
  const endTime = to24HourFormat(endTimeStr);

  const start = new Date(
    `${date}T${String(startTime.hours).padStart(2, "0")}:${String(
      startTime.minutes
    ).padStart(2, "0")}:00`
  );
  const end = new Date(
    `${date}T${String(endTime.hours).padStart(2, "0")}:${String(
      endTime.minutes
    ).padStart(2, "0")}:00`
  );

  return { start, end };
};
