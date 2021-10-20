export default function Build(value) {
  const startDay = value.clone().startOf("month").startOf("week"); //시작일
  console.log(startDay);
  const endDay = value.clone().endOf("month").endOf("week"); //마지막일
  console.log(endDay);

  const day = startDay.clone().subtract(1, "day");
  console.log(day);
  const calendar = [];

  while (day.isBefore(endDay, "day")) {
    calendar.push(
      Array(7)
        .fill(0)
        .map(() => day.add(1, "day").clone())
    );
  }
  return calendar;
}
