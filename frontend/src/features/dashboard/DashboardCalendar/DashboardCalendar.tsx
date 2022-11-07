import React from "react";
import styles from "features/dashboard/Dashboard.module.css";
import { Avatar, Box } from "@mui/material";
import Text from "components/Text";
import Calendar from "./Calendar";

function DashboardCalendar() {
  return (
    <div className={`${styles.container} ${styles.calendar}`}>
      <Box width="85%" className={styles.flexColumn}>
        <Avatar sx={{ width: 160, height: 160, mt: 3 }} alt="blogImg" src="" />
        <p className={`${styles.flexColumn} ${styles.calendarInfoText}`}>
          <Text value="yeonsu-k" type="text" />
          <Text value="github.com/yeonsu-k" type="caption" color="blue_4" />
        </p>
        <div className={styles.calendarDiv}>
          <Text value="달력" type="text" />
        </div>
        <div className={styles.calendarDiv}>
          <Calendar />
        </div>
      </Box>
    </div>
  );
}

export default DashboardCalendar;
