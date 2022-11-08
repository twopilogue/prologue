import React, { useState, useEffect } from "react";
import moment from "moment";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "@emotion/styled";
import palette from "styles/colorPalette";
import { useSelector } from "react-redux";
import { rootState } from "app/store";
import api from "api/Api";
import Axios from "api/JsonAxios";

const CalendarStyled = styled(Calendar)(() => ({
  backgroundColor: "transparent",
  fontFamily: "Pretendard-Regular",
  fontSize: "0.8rem",
  border: "0px",
  //달력 년/월 표시 글씨 커스텀
  ".react-calendar__navigation__label > span": {
    fontWeight: 600,
    fontSize: "1rem",
    color: "white",
  },
  //요일 section 커스텀 하기
  ".react-calendar__month-view__weekdays": {
    abbr: {
      textDecoration: "none",
    },
  },
  // day 타일 한개 한개 모양 커스텀하기
  ".react-calendar__tile": {
    color: "#DFDFDF",
    border: "1px solid #DFDFDF",
    borderRadius: "50px",
    pointerEvents: "none",
  },
  ".react-calendar__navigation button": {
    color: "white",
    "&:enabled:hover": {
      backgroundColor: "transparent",
    },
    "&:enabled:focus": {
      backgroundColor: "transparent",
    },
  },
  //달력에 오늘 날짜 표시 변경
  ".react-calendar__tile--now": {
    backgroundColor: palette.sky_2,
    color: "black",
    pointerEvents: "none",
  },
  ".mark": {
    background: palette.purlue_4,
  },
}));

function CalenderCustom() {
  const { accessToken, githubId } = useSelector((state: rootState) => state.auth);

  const [value, onChange] = useState(new Date());
  const [marks, setMark] = useState(["2022-10-30", "2022-11-01", "2022-11-04", "2022-11-10", "2022-11-21"]);

  useEffect(() => {
    getMonthPosts();
  }, []);

  async function getMonthPosts() {
    await Axios.get(api.dashboard.getMonthPosts(accessToken, githubId))
      .then((res) => {
        console.log("날짜 받기", res.data);
      })
      .catch((err) => [console.error("포스팅 일자 받기 실패", err)]);
  }

  return (
    <div>
      <CalendarStyled
        onChange={onChange}
        formatDay={(locale, date) => date.toLocaleString("en", { day: "numeric" })}
        selectRange={false}
        next2Label={null}
        prev2Label={null}
        showNeighboringMonth={false}
        calendarType="Hebrew"
        locale="en-EN"
        tileClassName={({ date, view }) => {
          if (marks.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
            return "mark";
          }
        }}
      />
    </div>
  );
}

export default CalenderCustom;
