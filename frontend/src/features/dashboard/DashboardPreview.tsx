import React, { useEffect, useState } from "react";
import styles from "features/dashboard/Dashboard.module.css";
import Text from "components/Text";
import IconButton from "@mui/material/IconButton";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Box, Link, Tooltip } from "@mui/material";
import { rootState } from "app/store";
import { useSelector } from "react-redux";
import Axios from "api/JsonAxios";
import api from "api/Api";

function DashboardPreview() {
  const { accessToken, githubId } = useSelector((state: rootState) => state.auth);

  const [bildState, setBildState] = useState(false);

  const blogLink = `https://${githubId}.github.io/`;

  useEffect(() => {
    getBildState();
  }, [bildState]);

  async function getBildState() {
    await Axios.get(api.dashboard.getBildState(accessToken, githubId)).then((res) => {
      setBildState(res.data.buildState === "progress");
    });
  }

  return (
    <div className={styles.container}>
      <Box className={styles.preview}>
        {bildState && (
          <Tooltip title="블로그 배포는 최소 3분 걸립니다" arrow followCursor>
            <Box className={styles.bildProgress}>
              <span>P</span>
              <span>r</span>
              <span>o</span>
              <span>g</span>
              <span>r</span>
              <span>e</span>
              <span>s</span>
              <span>s</span>
            </Box>
          </Tooltip>
        )}
        <Link href={blogLink} target="_blank">
          <div className={styles.previewIframe} />
          <iframe src={blogLink} scrolling="no" />
        </Link>
        <div className={styles.previewInfo}>
          <div className={styles.flexRow}>
            <Link href={blogLink} underline="none" color="black" target="_blank">
              <Text value={`${githubId}.github.io`} bold />
            </Link>
            <IconButton href="/setting">
              <SettingsOutlinedIcon fontSize="small" sx={{ color: "#424242", fontSize: "1.2rem" }} />
            </IconButton>
          </div>
        </div>
      </Box>
    </div>
  );
}

export default DashboardPreview;
