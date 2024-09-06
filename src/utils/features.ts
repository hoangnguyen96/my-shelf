import { BookType } from "@app/models";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormClearErrors,
} from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

/**
 * Clear error message when the users typing
 */
export const clearErrorOnChange = <T extends FieldValues>(
  fieldName: Path<T>,
  errors: FieldErrors<T>,
  clearErrorFunc: UseFormClearErrors<T>
): void => {
  errors[fieldName]?.message && clearErrorFunc(fieldName);
};

export const generateSevenDigitUUID = () => {
  const uuid = uuidv4().replace(/\D/g, "");
  return uuid.slice(0, 7);
};

export const getThreeTopBook = (data: BookType[]) =>
  data
    .sort((a, b) => {
      return (
        new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
      );
    })
    .slice(0, 3);

export const formatDate = (date: Date) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} ${formattedHours}:${formattedMinutes} ${period}`;
};

export const dividePaginationBooks = (list: BookType[]) => {
  return list.reduce((acc: BookType[][], _, i, self) => {
    if (!(i % 12)) {
      return [...acc, self.slice(i, i + 12)];
    }
    return acc;
  }, []);
};

export const getTwelveItemData = (list: BookType[]) => list.slice(0, 12);

export const getFirstPath = (value: string) => {
  const parts = value.split("/");
  const basePath = `/${parts[1]}`;

  return basePath;
};

export const getTwoPath = (value: string) => {
  const parts = value.split("/");
  const basePath = `/${parts[1]}/${parts[2]}`;

  return basePath;
};
