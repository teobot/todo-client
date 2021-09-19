import { format, isThisWeek, isToday, isYesterday, getDay } from "date-fns";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const formatDateToText = (dd) => {
  let givenDate = new Date(dd);
  let currentDate = new Date();

  if (!isThisWeek(givenDate)) {
    // given date is more than 7 days ago
    return format(givenDate, "dd/MM/yyyy");
  } else {
    if (isToday(givenDate)) {
      // date is today
      return "Today";
    } else if (isYesterday(givenDate)) {
      // date is yesterday
      return "Yesterday";
    }

    return daysOfWeek[getDay(givenDate, currentDate)];
  }
};
