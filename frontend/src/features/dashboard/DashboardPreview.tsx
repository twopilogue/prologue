import React from "react";
import styles from "features/dashboard/Dashboard.module.css";
import Text from "components/Text";
import IconButton from "@mui/material/IconButton";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Link } from "@mui/material";

function DashboardPreview() {
  const blogLink = "https://yeonsu-k.github.io/";

  return (
    <div className={styles.container}>
      <div className={styles.preview}>
        <Link href={blogLink} underline="none">
          <div className={styles.previewIframe} />
          <iframe src={blogLink} scrolling="no" />
        </Link>
        <div className={styles.previewInfo}>
          <div className={styles.flexRow}>
            <Link href={blogLink} underline="none" color="black">
              <Text value="yeonsu-k.github.io" bold />
            </Link>
            <IconButton href="/setting">
              <SettingsOutlinedIcon
                fontSize="small"
                sx={{ color: "#424242", fontSize: "1.2rem" }}
              />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPreview;
