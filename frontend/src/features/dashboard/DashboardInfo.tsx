import React, { useEffect, useState } from "react";
import moment from "moment";
import styles from "features/dashboard/Dashboard.module.css";
import Text from "components/Text";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import UpdateIcon from "@mui/icons-material/Update";
import Tooltip, { TooltipProps } from "@mui/material/Tooltip";
import { useSelector } from "react-redux";
import { rootState } from "app/store";
import api from "api/Api";
import Axios from "api/JsonAxios";
import { Box, Stack, styled } from "@mui/material";
import axios from "axios";
import "moment/locale/ko";

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  whiteSpace: "pre-line",
});

function DashboardInfo() {
  const { accessToken, githubId } = useSelector((state: rootState) => state.auth);
  const { totalPost, repoSize, buildTime } = useSelector((state: rootState) => state.dashboard);

  const [info, setInfo] = useState({
    postNum: totalPost,
    buildTime: {
      year: moment(buildTime, "YYYYMMDDHHmmss").format("YYYY"),
      day: moment(buildTime, "YYYYMMDDHHmmss").format("MM/DD HH:mm"),
    },
    volume: repoSize,
  });
  const [timeMatch, setTimeMatch] = useState(false);

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
          const now = moment().format("YYYY/MM/DD");
          const bild = moment(value, "YYYYMMDDHHmmss").format("YYYY/MM/DD");
          const bildTime = moment(value, "YYYYMMDDHHmmss");
          const nowTime = moment();
          let timeLag;

          setTimeMatch(bild === now);

          if (timeMatch) {
            const diffTime = {
              hour: moment.duration(nowTime.diff(bildTime)).hours(),
              minute: moment.duration(nowTime.diff(bildTime)).minutes(),
              second: moment.duration(nowTime.diff(bildTime)).seconds(),
            };
            if (diffTime.hour != 0) timeLag = diffTime.hour + "시간 " + diffTime.minute + "분 전";
            else if (diffTime.minute != 0) timeLag = diffTime.minute + "분 전";
            else timeLag = diffTime.second + "초 전";
          }

          // console.log(value, bild, now, bild === now, timeLag);
          setInfo({
            ...info,
            buildTime: {
              year: timeMatch ? "" : moment(bild).format("YYYY"),
              day: timeMatch ? timeLag : moment(value, "YYYYMMDDHHmmss").format("MM/DD HH:mm"),
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
                <Text value={info.postNum} type="textTitle" bold />
              </div>
            </div>
            <div className={styles.infoGird_item}>
              <div className={`${styles.infoTitle} ${styles.infoVolume}`}>
                <Text value="사용량" bold />
                <CustomTooltip
                  title={`깃허브 블로그는 최대 1GB를 넘을 수 없습니다.${"\n"}사용량은 마지막 빌드 후 1시간 뒤 갱신됩니다`}
                  placement="top-end"
                  arrow
                >
                  <InfoOutlinedIcon className={styles.icon} fontSize="small" />
                </CustomTooltip>
              </div>
              <div className={`${styles.infoValue} ${styles.valueBox}`}>
                {/* <Box className={styles.valueBox}> */}
                <Box className={styles.leftValue}>
                  <Text value={info.volume} type="textTitle" bold />
                  <Text value={"MB"} type="caption" bold />
                </Box>
                <Box className={styles.middleValue}>
                  <Text value={"/"} type="textTitle" bold />
                </Box>
                <Box className={styles.rightValue}>
                  <Text value={"1GB"} type="caption" bold />
                </Box>
                {/* </Box> */}
              </div>
            </div>
            <div className={styles.infoGird_item}>
              <div className={`${styles.flexRow} ${styles.infoTitle}`} style={{ justifyContent: "center" }}>
                <Text value="마지막 빌드 시간" bold />
                {timeMatch && <UpdateIcon className={styles.icon} fontSize="small" onClick={getInfo} />}
              </div>
              <div className={`${styles.infoValue}`}>
                <Stack>
                  <Text value={info.buildTime.year} type="text" bold />
                  <div>
                    <Text value={info.buildTime.day} type="textTitle" bold />
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
