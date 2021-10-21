import React, { useState } from "react";
import "../Scss/calendar.scss";

function Header(props) {
  const { value, setvalue, moment } = props; //비구조할당
  const [state, setstate] = useState(false);
  const [searchDay, setsearchDay] = useState(moment().format("YYYY-MM-DD")); //찾고자 하는 값을 저장할 state

  //searchDay onchange
  const onchange = (e) => {
    setsearchDay(e.target.value);
  };

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
        <div
          className="prev"
          onClick={() => {
            setvalue(prevMonth());
            setstate(false); //오작동 방지
          }}
        >
          <span className="active">&lt; </span>
        </div>
        {state ? (
          <input type="date" onChange={onchange} />
        ) : (
          <div className="current" onClick={() => setstate(!state)}>
            {currentYear()}년 {currentMonth()}월
          </div>
        )}
        <div
          className="next"
          onClick={() => {
            setvalue(nextMonth());
            setstate(false); //오작동 방지
          }}
        >
          &gt;
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div
          className={state ? "return_btn" : "none"}
          onClick={() => {
            setvalue(moment(searchDay));
            setstate(!state);
          }}
        >
          {searchDay === moment().format("YYYY-MM-DD") ? "Cancel" : "Search"}
        </div>
        <div
          className="return_btn"
          onClick={() => {
            setvalue(moment());
            setstate(false); //오작동 방지
          }}
        >
          Today
        </div>
      </div>
    </div>
  );
}

export default Header;
