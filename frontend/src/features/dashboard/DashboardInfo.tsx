import React from "react";
import styles from "features/dashboard/Dashboard.module.css";
import Text from "components/Text";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Tooltip from "@mui/material/Tooltip";

function DashboardInfo() {
  return (
    <div className={`${styles.container} ${styles.info}`}>
      <div className={styles.infoOne}>
        <div>
          <div className={styles.infoGroup}>
            <div>
              <div className={`${styles.flexColumn} ${styles.infoTitle}`}>
                <Text value="게시글 수" bold />
              </div>
              <div className={styles.infoValue}>
                <Text value={String(7)} type="pageTitle" bold />
              </div>
            </div>
            <div>
              <div className={`${styles.flexColumn} ${styles.infoTitle}`}>
                <Text value="방문자 수" bold />
              </div>
              <div className={styles.infoValue}>
                <Text value={String(21)} type="pageTitle" bold />
              </div>
            </div>
            <div>
              <div className={`${styles.flexColumn} ${styles.infoTitle}`}>
                <Text value="마지막 방문일자" bold />
              </div>
              <div className={`${styles.infoValue}`}>
                {/* <span>
                  <Text value={"2022"} type="text" bold />
                </span> */}
                <span>
                  <Text value={"12/10"} type="pageTitle" bold />
                </span>
              </div>
            </div>
            <div>
              <div className={`${styles.infoTitle} ${styles.infoVolume}`}>
                <Text value="사용량" bold />
                <Tooltip
                  title="깃허브 블로그는 최대 1GB를 넘을 수 없습니다"
                  placement="top-start"
                  arrow
                >
                  <InfoOutlinedIcon className={styles.icon} fontSize="small" />
                </Tooltip>
              </div>
              <div className={styles.infoValue}>
                <Text value={String(100)} type="pageTitle" bold />
                <Text value={"MB"} type="groupTitle" bold />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardInfo;
