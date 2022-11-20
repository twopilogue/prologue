import React from "react";
import styles from "features/dashboard/Dashboard.module.css";
import { Avatar, Box, Stack } from "@mui/material";
import Text from "components/Text";
import Calendar from "./Calendar";
import { rootState } from "app/store";
import { useSelector } from "react-redux";

function DashboardCalendar() {
  const { githubId, githubImage } = useSelector((state: rootState) => state.auth);

  return (
    <div className={`${styles.container} ${styles.calendar}`}>
      <Box width="85%" className={styles.flexColumn}>
        <Avatar sx={{ width: 160, height: 160, mt: 3 }} alt="blogImg" src={githubImage} />
        <p className={`${styles.flexColumn} ${styles.calendarInfoText}`}>
          <Text value={githubId} type="text" />
          <Text value={`github.com/${githubId}`} type="caption" color="blue_4" />
        </p>
        <Stack className={styles.calendarDiv} direction="row" justifyContent="space-between">
          <Text value="포스팅" type="text" />
        </Stack>
        <div className={styles.calendarDiv}>
          <Calendar />
        </div>
      </Box>
    </div>
  );
}

export default DashboardCalendar;
