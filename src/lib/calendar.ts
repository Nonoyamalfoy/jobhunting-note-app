import dayjs from "dayjs"

export const createCalendar = (day: dayjs.Dayjs) => {
  const firstDay = day.startOf("month");
  const firstdayIndex = firstDay.day();
  const array = Array(42)
    .fill(0)
    .map((_, i) =>{
      const diffFromFirstDay = i - firstdayIndex;
      const day = firstDay.add(diffFromFirstDay, "day");
      return day;
    });
  return array
};

export const isFirstDay = (day: dayjs.Dayjs) => day.date() === 1;

export const isSameDay = (d1: dayjs.Dayjs, d2: dayjs.Dayjs) => {
  const format = "YYYYMMDD";
  return d1.format(format) === d2.format(format);
};

export const isSameMonth = (m1: dayjs.Dayjs, m2: dayjs.Dayjs) => {
  const format = "YYYYMM";
  return m1.format(format) === m2.format(format);
};

export const getNextMonth = (day: dayjs.Dayjs) => {
  const nextMonthDay = day.add(1, "month");
  return nextMonthDay
};

export const getPreviousMonth = (day: dayjs.Dayjs) => {
  const previousMonthDay = day.add(-1, "month");
  return previousMonthDay; 
};