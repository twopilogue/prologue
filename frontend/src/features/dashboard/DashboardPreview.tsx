import React from "react";
import styles from "features/dashboard/Dashboard.module.css";
import Text from "components/Text";
import IconButton from "@mui/material/IconButton";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Box, Link } from "@mui/material";
import { rootState } from "app/store";
import { useSelector } from "react-redux";

function DashboardPreview() {
  const { accessToken, githubId } = useSelector((state: rootState) => state.auth);

  const blogLink = `https://${githubId}.github.io/`;

  return (
    <div className={styles.container}>
      <Box className={styles.preview}>
        <Link href={blogLink} underline="none">
          <div className={styles.previewIframe} />
          <iframe src={blogLink} scrolling="no" />
        </Link>
        <div className={styles.previewInfo}>
          <div className={styles.flexRow}>
            <Link href={blogLink} underline="none" color="black">
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
