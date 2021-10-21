import React, { useEffect, useState } from "react";
import Build from "./Build";

function CalendarBody(props) {
  const { value, setvalue, moment } = props;
  const [calendar, setcalendar] = useState([]); //달력 몸체 배열 생성
  const date = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = value.format("YYYYMMDD");

  useEffect(() => {
    setcalendar(Build(value));
  }, [value]);

  //클래스명 지정을 위한 함수 (토,일 색칠하기)
  const name = (idx) => {
    if (idx === 0) {
      return " sun";
    } else if (idx === 6) {
      return " sat";
    } else {
      return "";
    }
  };

  const findToday = (day) => {
    if (day === moment().format("YYYYMMDD")) {
      return " today";
    } else {
      return "";
    }
  };

  const calendarbody = calendar.map(
    //한 달짜리 배열
    (week, id) => {
      return (
        <div className="month" key={id}>
          {/* 일로 바꾸기 */}
          {week.map((item, idx) => {
            //내가 선택한 날
            if (today === item.format("YYYYMMDD")) {
              return (
                <div
                  key={idx}
                  className="selected"
                  onClick={() => {
                    setvalue(item);
                  }}
                >
                  <div
                    className={
                      "day" + name(idx) + findToday(item.format("YYYYMMDD"))
                    }
                  >
                    <span>{item.format("D").toString()}</span>
                  </div>
                </div>
              );
            } else if (value.format("MM") !== item.format("MM")) {
              //이번달에 있는 날짜가 아니라면 색을 회색으로
              return (
                <div
                  key={idx}
                  className="day_container"
                  onClick={() => {
                    setvalue(item);
                  }}
                >
                  <div
                    className={
                      "day not_day" +
                      name(idx) +
                      findToday(item.format("YYYYMMDD"))
                    }
                  >
                    <span>{item.format("D").toString()}</span>
                  </div>
                </div>
              );
            } else {
              return (
                <div
                  key={idx}
                  className="day_container"
                  onClick={() => {
                    setvalue(item);
                  }}
                >
                  <div
                    className={
                      "day" + name(idx) + findToday(item.format("YYYYMMDD"))
                    }
                  >
                    <span> {item.format("D").toString()}</span>
                  </div>
                </div>
              );
            }
          })}
        </div>
      );
    }
  );

  return (
    <div className="Calendar_Body">
      <div className="weekName">
        {date.map((item, idx) => {
          return (
            <div key={idx} className={name(idx)}>
              {item}
            </div>
          );
        })}
      </div>
      {calendarbody}
    </div>
  );
}

export default CalendarBody;
