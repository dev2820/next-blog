import { getMonth, getYear } from "date-fns";

// 날짜가 특정 월에 속하는지 확인하는 함수
export const isDateInYear = (date: Date, year: number): boolean => {
  return getYear(date) === year;
};

// 날짜가 특정 월에 속하는지 확인하는 함수
export const isDateInMonth = (
  date: Date,
  year: number,
  month: number
): boolean => {
  return isDateInYear(date, year) && getMonth(date) === month - 1;
};
