import React, { useEffect, useState } from "react";
import Build from "./Build";

function CalendarBody(props) {
  const { value, setvalue } = props;
  const [calendar, setcalendar] = useState([]); //달력 몸체 배열 생성
  const date = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  useEffect(() => {
    setcalendar(Build(value));
  }, [value]);

  console.log(calendar);

  const calendarbody = calendar.map(
    //한 달짜리 배열
    (week, id) => (
      <div className="month" key={id}>
        {/* 일로 바꾸기 */}
        {week.map((item, idx) => (
          <div key={idx} className="day_container">
            <div className="day">{item.format("D").toString()}</div>
          </div>
        ))}
      </div>
    )
  );

  return (
    <div className="Calendar_Body">
      <div className="weekName">
        {date.map((item) => {
          return <div>{item}</div>;
        })}
      </div>
      {calendarbody}
    </div>
  );
}

export default CalendarBody;
