import React, { useEffect, useState } from "react";
import moment from "moment";
import styles from "features/dashboard/Dashboard.module.css";
import Text from "components/Text";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import UpdateIcon from "@mui/icons-material/Update";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import Tooltip, { TooltipProps } from "@mui/material/Tooltip";
import { useSelector } from "react-redux";
import { rootState } from "app/store";
import api from "api/Api";
import Axios from "api/JsonAxios";
import { Box, ButtonBase, CircularProgress, IconButton, Stack, styled } from "@mui/material";
import axios from "axios";
import "moment/locale/ko";

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  whiteSpace: "pre-line",
});

const BuildButton = styled(ButtonBase)(() => ({
  backgroundColor: "#9bbcd4",
  borderRadius: "20px 20px",
  border: "1.5px solid white",
  color: "white",
  width: "100%",
  height: "100%",
  padding: "0px",
  fontSize: "1.25rem",
  fontWeight: 600,
  fontFamily: "Pretendard-Regular",
  transition: "all 0.1s",
  "&:hover": {
    backgroundColor: "#8ba8bd",
  },
}));

function DashboardInfo() {
  const { accessToken, githubId } = useSelector((state: rootState) => state.auth);
  const { totalPost, repoSize, buildTime } = useSelector((state: rootState) => state.dashboard);

  const [info, setInfo] = useState({
    postNum: totalPost,
    buildTime: {
      year: moment(buildTime, "YYYYMMDDHHmmss").format("YYYY"),
      day: moment(buildTime, "YYYYMMDDHHmmss").format("MM/DD HH:mm"),
    },
    volume: Number(repoSize),
  });
  const [timer, setTimer] = useState("");
  const [timeMatch, setTimeMatch] = useState(false);
  const [timerChange, setTimerChange] = useState(false);
  const [buildButtonState, setBuildButtonState] = useState(false);

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
          const bildTime = moment(value, "YYYYMMDDHHmmss");
          const nowTime = moment();

          setTimeMatch(moment.duration(bildTime.diff(nowTime)).asDays() < 1);

          const diffTime = {
            hour: moment.duration(nowTime.diff(bildTime)).hours(),
            minute: moment.duration(nowTime.diff(bildTime)).minutes(),
            second: moment.duration(nowTime.diff(bildTime)).seconds(),
          };
          if (diffTime.hour != 0) setTimer(diffTime.hour + "시간 전");
          else if (diffTime.minute != 0) setTimer(diffTime.minute + "분 전");
          else setTimer(diffTime.second + "초 전");

          setInfo({
            ...info,
            buildTime: {
              // year: timeMatch ? "" : moment(bildTime).format("YYYY"),
              // day: timeMatch ? timeLag : moment(value, "YYYYMMDDHHmmss").format("MM/DD HH:mm"),
              year: moment(bildTime).format("YYYY"),
              day: moment(value, "YYYYMMDDHHmmss").format("MM/DD HH:mm"),
            },
            volume: res2.data.size,
            postNum: res3.data.total,
          });
        }),
      );
  }

  function ClickAllBuild() {
    triggerStart();
    setBuildButtonState(true);
  }

  async function triggerStart() {
    await Axios.put(api.blog.triggerStart(accessToken, githubId))
      .then((res) => {
        console.log("빌드-배포 트리거 실행", res.data);
        setBuildButtonState(false);
      })
      .catch((err) => {
        console.error("빌드-배포 트리거 실행", err);
      });
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
                  title={`깃허브 블로그는 기본 1GB까지 제공합니다.${"\n"}사용량은 마지막 빌드 후 1시간 뒤 갱신됩니다`}
                  placement="top-end"
                  arrow
                >
                  <InfoOutlinedIcon className={styles.icon} fontSize="small" />
                </CustomTooltip>
              </div>
              <div className={`${styles.infoValue} ${styles.valueBox}`}>
                <Box>
                  <Text value={String(info.volume)} type="textTitle" bold />
                  <Text value={"MB"} type="caption" bold />
                </Box>
                <Box className={`${styles.infoAmount}`} sx={info.volume >= 900 ? { color: "red" } : {}}>
                  <span>남은사용량 : {1000 - info.volume}MB</span>
                </Box>
              </div>
            </div>
            <div className={styles.infoGird_item}>
              <div className={`${styles.flexRow} ${styles.infoTitle}`} style={{ justifyContent: "center" }}>
                <Text value="마지막 빌드 시간" bold />
                {/* {timeMatch && <UpdateIcon className={styles.icon} fontSize="small" onClick={getInfo} />} */}
              </div>
              <div className={`${styles.infoValue} ${styles.valueBox}`}>
                {timerChange ? (
                  <Text value={timer} type="textTitle" bold />
                ) : (
                  <Stack>
                    <Text value={info.buildTime.year} type="text" bold />
                    <div>
                      <Text value={info.buildTime.day} type="textTitle" bold />
                    </div>
                  </Stack>
                )}
                <span className={`${styles.infoTimer}`}>
                  <IconButton disableRipple onClick={() => setTimerChange(!timerChange)}>
                    <SyncAltIcon sx={{ fontSize: "1rem" }} />
                  </IconButton>
                </span>
              </div>
            </div>
            <div className={styles.infoGird_item}>
              <BuildButton className={styles.buildButton} onClick={ClickAllBuild}>
                {buildButtonState ? <CircularProgress /> : "All Build"}
              </BuildButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardInfo;
