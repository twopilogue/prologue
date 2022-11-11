import React, { useEffect, useState } from "react";
import moment from "moment";
import styles from "features/dashboard/Dashboard.module.css";
import Text from "components/Text";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Tooltip from "@mui/material/Tooltip";
import { useSelector } from "react-redux";
import { rootState } from "app/store";
import api from "api/Api";
import Axios from "api/JsonAxios";
import { Stack } from "@mui/material";
import axios from "axios";

function DashboardInfo() {
  const { accessToken, githubId } = useSelector((state: rootState) => state.auth);
  const [info, setInfo] = useState({
    postNum: "",
    bildTime: {
      year: "",
      day: "",
    },
    volume: "",
  });

  useEffect(() => {
    getInfo();
  }, []);

  function getInfo() {
    axios
      .all([
        Axios.get(api.dashboard.getNewBuildTime(accessToken, githubId)),
        Axios.get(api.dashboard.getRepoSize(accessToken, githubId)),
        Axios.get(api.dashboard.getTotalPost(accessToken, githubId)),
      ])
      .then(
        axios.spread((res1, res2, res3) => {
          const value = res1.data.latestBuildTime;
          setInfo({
            ...info,
            bildTime: {
              year: moment(value).format("YYYY"),
              day: moment(value).format("MM/DD HH:SS"),
            },
            volume: res2.data.size,
            postNum: res3.data.total,
          });
        }),
      );
  }

  return (
    <div className={`${styles.container} ${styles.info}`}>
      <div className={styles.infoOne}>
        <div>
          <div className={styles.infoGrid}>
            <div className={styles.infoGird_item}>
              <div className={`${styles.flexColumn} ${styles.infoTitle}`}>
                <Text value="게시글 수" bold />
              </div>
              <div className={styles.infoValue}>
                <Text value={info.postNum} type="pageTitle" bold />
              </div>
            </div>
            <div className={styles.infoGird_item}>
              <div className={`${styles.infoTitle} ${styles.infoVolume}`}>
                <Text value="사용량" bold />
                <Tooltip title="깃허브 블로그는 최대 1GB를 넘을 수 없습니다" placement="top-start" arrow>
                  <InfoOutlinedIcon className={styles.icon} fontSize="small" />
                </Tooltip>
              </div>
              <div className={styles.infoValue}>
                <span>
                  <Text value={info.volume} type="pageTitle" bold />
                  <Text value={"MB"} type="caption" bold />
                </span>
              </div>
            </div>
            <div className={styles.infoGird_item}>
              <div className={`${styles.flexColumn} ${styles.infoTitle}`}>
                <Text value="마지막 빌드 시간" bold />
              </div>
              <div className={`${styles.infoValue}`}>
                <Stack>
                  <Text value={info.bildTime.year} type="text" bold />
                  <div>
                    <Text value={info.bildTime.day} type="pageTitle" bold />
                  </div>
                </Stack>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardInfo;
