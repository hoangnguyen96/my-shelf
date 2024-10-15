import { MONTHS, TIME_PERIODS } from "@app/constants";

export const formatDate = (date: Date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? TIME_PERIODS.PM : TIME_PERIODS.AM;
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()} ${formattedHours}:${formattedMinutes} ${period}`;
};
