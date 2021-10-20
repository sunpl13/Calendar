import React from "react";
import "../Scss/calendar.scss";

function Header(props) {
  const { value, setvalue, moment } = props; //비구조할당

  function currentMonth() {
    //이번달
    return value.format("MM");
  }
  function currentYear() {
    //올해
    return value.format("YYYY");
  }
  function prevMonth() {
    //버튼 눌렀을 때 지난 달
    return value.clone().subtract(1, "month");
  }
  function nextMonth() {
    //버튼 눌렀을 때 다음 달
    return value.clone().add(1, "month");
  }

  return (
    <div className="Header">
      <div className="info">
        <div className="prev" onClick={() => setvalue(prevMonth())}>
          <span className="active">&lt; </span>
        </div>
        <div className="current">
          {currentYear()}년 {currentMonth()}월
        </div>
        <div className="next" onClick={() => setvalue(nextMonth())}>
          &gt;
        </div>
      </div>
      <div className="return_btn">
        <button onClick={() => setvalue(moment())}>오늘</button>
      </div>
    </div>
  );
}

export default Header;
