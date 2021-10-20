import React from "react";
import "../Scss/calendar.scss";

function Header(props) {
  const { value, setvalue } = props; //비구조할당
  const date = new Date();

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

  function thisMonth() {
    return value.isSame(date, "month");
  }

  return (
    <div className="Header">
      <div className="prev" onClick={() => setvalue(prevMonth())}>
        {!thisMonth() ? (
          <span class="active">&lt; </span>
        ) : (
          <span class="deactive">&lt; </span>
        )}
      </div>
      <div className="current">
        {currentYear()}년 {currentMonth()}월
      </div>
      <div className="next" onClick={() => setvalue(nextMonth())}>
        {" "}
        &gt;
      </div>
    </div>
  );
}

export default Header;
