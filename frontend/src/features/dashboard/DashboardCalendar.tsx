import React, { useEffect } from "react";
import styles from "features/dashboard/Dashboard.module.css";
import { Avatar } from "@mui/material";
import Text from "components/Text";

function DashboardCalendar() {

  return (
    <div className={`${styles.container} ${styles.calendar}`}>
      <Avatar className={styles.avatarImg} alt="blogImg" src="" />
      <Text value="yeonsu-k" type="text" />
      <Text value="github.com/yeonsu-k" type="caption" color="blue_4" />
    </div>
  );
}

export default DashboardCalendar;
