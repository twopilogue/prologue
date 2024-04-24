import { useState, useEffect } from "react";
import moment from "moment";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "@emotion/styled";
import palette from "styles/colorPalette";
import { useDispatch, useSelector } from "react-redux";
import { dashboardActions } from "slices/dashboardSlice";
import { rootState } from "app/store";
import { useAuthStore } from "stores/authStore";
import { getMonthPosts } from "apis/api/dashboard";

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
    borderRadius: "50%",
    pointerEvents: "none",
    margin: "1.5px 0px",
  },
  ".react-calendar__navigation": {
    marginBottom: 0,
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
  ".react-calendar__navigation__label": {
    pointerEvents: "none",
  },
  //달력에 오늘 날짜 표시 변경
  ".react-calendar__tile--now": {
    backgroundColor: palette.sky_2,
    color: "black",
    pointerEvents: "none",
    fontWeight: "600",
  },
  ".mark": {
    background: palette.purlue_4,
  },
  ".react-calendar__tile--now.mark": {
    backgroundColor: "#dfc3f9",
    color: "black",
    fontWeight: "600",
  },
}));

function CalenderCustom() {
  const dispatch = useDispatch();

  const accessToken = useAuthStore((state) => state.accessToken);
  const githubId = useAuthStore((state) => state.githubId);

  const { monthPosts } = useSelector((state: rootState) => state.dashboard);
  const [marks, setMark] = useState(monthPosts);

  const getMonthPost = async () => {
    const dateList = await getMonthPosts(accessToken, githubId);
    dispatch(dashboardActions.monthPosts({ monthPosts: dateList }));
    setMark(dateList);
  };

  useEffect(() => {
    getMonthPost();
  }, []);

  return (
    <div>
      <CalendarStyled
        formatDay={(locale, date) => date.toLocaleString("en", { day: "numeric" })}
        selectRange={false}
        next2Label={null}
        prev2Label={null}
        showNeighboringMonth={false}
        calendarType="Hebrew"
        locale="en-EN"
        tileClassName={({ date }) => {
          if (marks.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
            return "mark";
          }
        }}
      />
    </div>
  );
}

export default CalenderCustom;
