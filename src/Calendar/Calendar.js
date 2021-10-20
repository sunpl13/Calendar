import React from "react";
import "../Scss/calendar.scss";
import moment from "moment";
import { useState } from "react";
import Header from "./Header";
import CalendarBody from "./CalendarBody";

function Calendar() {
  const [state, setstate] = useState(moment());

  return (
    <div className="Calendar">
      <div className="cal_header">
        <Header value={state} setvalue={setstate} />
      </div>
      <div className="cal_body">
        <CalendarBody value={state} setvalue={setstate} />
      </div>
    </div>
  );
}

export default Calendar;
