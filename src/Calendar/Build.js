export default function Build(value) {
  const startDay = value.clone().startOf("month").startOf("week"); //매월 1일 주의 시작일
  const endDay = value.clone().endOf("month").endOf("week"); //한 달 마지막주의 마지말 날

  const day = startDay.clone().subtract(1, "day");
  const calendar = [];
  const nextWeek = [];

  //시작일부터 끝일까지 배열에 담기
  while (day.isBefore(endDay, "day")) {
    calendar.push(
      Array(7)
        .fill(0)
        .map(() => day.add(1, "day").clone())
    );
  }

  //6주로 맞추기
  if (calendar.length < 6) {
    for (let i = 0; i < 7; i++) {
      nextWeek[i] = endDay.clone().add(i + 1, "days");
    }

    calendar.push(nextWeek);
  }
  return calendar;
}
