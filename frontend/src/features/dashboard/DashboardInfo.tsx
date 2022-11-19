import React, { useEffect, useState } from "react";
import moment from "moment";
import styles from "features/dashboard/Dashboard.module.css";
import Text from "components/Text";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import Tooltip, { TooltipProps } from "@mui/material/Tooltip";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "app/store";
import api from "api/Api";
import Axios from "api/JsonAxios";
import {
  Box,
  ButtonBase,
  CircularProgress,
  CircularProgressProps,
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import axios from "axios";
import "moment/locale/ko";
import { dashboardActions } from "slices/dashboardSlice";

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  whiteSpace: "pre-line",
});

const BuildButton = styled(ButtonBase)(() => ({
  backgroundColor: "#9bbcd4",
  borderRadius: "12px",
  // border: "1.5px solid white",
  color: "white",
  width: "100%",
  height: "6.6vh",
  padding: "0px",
  fontSize: "1.25rem",
  fontWeight: 600,
  fontFamily: "Pretendard-Regular",
  transition: "all 0.1s",
  "&:hover": {
    backgroundColor: "#8ba8bd",
  },
  "&.Mui-disabled": {
    backgroundColor: "#8198aa",
  },
}));

function CircularProgressWithLabel(props: CircularProgressProps & { value: number }) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} sx={{ color: "#324350" }} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "&.MuiCircularProgress-colorSecondary": {
            color: "secondary",
          },
        }}
      >
        <Typography variant="overline" component="div" color="text.secondary" sx={{ fontWeight: "600" }}>{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

function DashboardInfo(props: { buildState: boolean; setBuildState: (state: boolean) => void }) {
  const dispatch = useDispatch();

  const { accessToken, githubId } = useSelector((state: rootState) => state.auth);
  const { totalPost, repoSize, buildTime } = useSelector((state: rootState) => state.dashboard);

  const [timer, setTimer] = useState("");
  const [newBuildTime, setnewBuildTime] = useState<{ year: string; day: string }>({
    year: buildTime ? moment(buildTime, "YYYYMMDDHHmmss").format("YYYY") : moment().format("YYYY"),
    day: buildTime ? moment(buildTime, "YYYYMMDDHHmmss").format("MM/DD HH:mm") : "",
  });
  const [timerChange, setTimerChange] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    getBlogInfo();
    getNewBuildTime();
  }, [timerChange]);

  const nowTime = moment();
  const bildTimes = moment(buildTime, "YYYYMMDDHHmmss");
  const minute = moment.duration(nowTime.diff(bildTimes)).minutes();
  const second = moment.duration(nowTime.diff(bildTimes)).seconds();

  useEffect(() => {
    const Percentage = setInterval(() => {
      if (progress < 100) {
        setProgress(((minute * 60 + second) / 200) * 100);
        setTimer(minute === 0 ? second + "초 전" : minute + "분 전");
      } else if (progress >= 100) {
        clearInterval(Percentage);
        props.setBuildState(false);
      }
    }, 1000);
    return () => clearInterval(Percentage);
  }, [progress]);

  async function getBlogInfo() {
    await axios
      .all([
        Axios.get(api.dashboard.getTotalPost(accessToken, githubId)),
        Axios.get(api.dashboard.getRepoSize(accessToken, githubId)),
      ])
      .then(
        axios.spread((res1, res2) => {
          dispatch(
            dashboardActions.blogInfo({
              totalPost: res1.data.total,
              repoSize: res2.data.size,
            }),
          );
        }),
      );
  }

  async function getNewBuildTime() {
    await Axios.get(api.dashboard.getNewBuildTime(accessToken, githubId))
      .then((res) => {
        const value = res.data.latestBuildTime;
        dispatch(
          dashboardActions.buildTime({
            buildTime: moment(value, "YYYYMMDDHHmmss").format("YYYY MM/DD HH:mm"),
          }),
        );

        const bildTimes = moment(value, "YYYYMMDDHHmmss");
        const nowTime = moment();

        const diffTime = {
          day: moment.duration(nowTime.diff(bildTimes)).days(),
          hour: moment.duration(nowTime.diff(bildTimes)).hours(),
          minute: moment.duration(nowTime.diff(bildTimes)).minutes(),
          second: moment.duration(nowTime.diff(bildTimes)).seconds(),
        };
        if (diffTime.day != 0) setTimer(diffTime.day + "일 전");
        else if (diffTime.hour != 0) setTimer(diffTime.hour + "시간 전");
        else if (diffTime.minute != 0) setTimer(diffTime.minute + "분 전");
        else setTimer(diffTime.second + "초 전");

        setnewBuildTime({
          year: moment(value, "YYYYMMDDHHmmss").format("YYYY"),
          day: moment(value, "YYYYMMDDHHmmss").format("MM/DD HH:mm"),
        });
      })
      .catch((err) => {
        console.error("최신 빌드 시간 가져오기", err);
      });
  }

  function ClickAllBuild() {
    setProgress(0);
    triggerStart();
    setTimerChange(false);
  }

  async function triggerStart() {
    await Axios.put(api.blog.triggerStart(accessToken, githubId))
      .then((res) => {
        props.setBuildState(true);
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
                <Text value={totalPost} type="textTitle" bold />
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
                  <Text value={String(repoSize)} type="textTitle" bold />
                  <Text value={"MB"} type="caption" bold />
                </Box>
                <Box className={`${styles.infoAmount}`} sx={repoSize >= 900 ? { color: "red" } : {}}>
                  <span>남은사용량 : {1000 - repoSize}MB</span>
                </Box>
              </div>
            </div>
            <div className={styles.infoGird_item}>
              <div className={`${styles.flexRow} ${styles.infoTitle}`} style={{ justifyContent: "center" }}>
                <Text value="마지막 빌드 시간" bold />
              </div>
              <div className={`${styles.infoValue} ${styles.valueBox} ${styles.dateBox}`}>
                {timerChange ? (
                  <Text value={timer} type="textTitle" bold />
                ) : (
                  <Stack>
                    <Text value={newBuildTime.year} type="text" bold />
                    <div>
                      <Text value={newBuildTime.day} type="textTitle" bold />
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
              {props.buildState ? (
                <BuildButton className={styles.buildButton} disabled>
                  <CircularProgressWithLabel value={progress} size={36} />
                </BuildButton>
              ) : (
                <BuildButton className={styles.buildButton} onClick={ClickAllBuild}>
                  All Build
                </BuildButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardInfo;
