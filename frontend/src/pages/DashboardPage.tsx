import { useEffect, useState } from "react";
import DashboardCalendar from "features/dashboard/DashboardCalendar/DashboardCalendar";
import DashboardInfo from "features/dashboard/DashboardInfo";
import DashboardList from "features/dashboard/DashboardList";
import DashboardMenu from "features/dashboard/DashboardMenu";
import DashboardPreview from "features/dashboard/DashboardPreview";
import { Box, Grid, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useAuthActions, useAuthStore } from "stores/authStore";
import { getBuildState } from "apis/api/dashboard";
import { authApi } from "apis/Api";
import { getRepoList } from "apis/api/blog";
import { useShallow } from "zustand/react/shallow";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [accessToken, githubId, isLogin] = useAuthStore(
    useShallow((state) => [state.accessToken, state.githubId, state.isLogin]),
  );
  const { setAuthFileAction } = useAuthActions();

  const [buildState, setBuildState] = useState<boolean>();

  const getBildState = async () => {
    const buildState = await getBuildState(accessToken, githubId);
    setBuildState(buildState === "progress");
  };

  // 서비스 인증 파일 존재 여부
  const getAuthFile = async () => {
    const res = await authApi.getAuthFile(accessToken, githubId);
    if (res.data.checkAuthFile) setAuthFileAction(true);
    else {
      setAuthFileAction(false);

      const checkRepository = await getRepoList(accessToken, githubId);
      if (checkRepository) navigate("create/reset");
      else navigate("/create");
    }
  };

  useEffect(() => {
    if (isLogin) getAuthFile();
    getBildState();
  }, []);

  return (
    <Box sx={{ mt: 3, minHeight: "88vh" }}>
      <Grid container spacing={2} columns={11}>
        <Grid item xs={3}>
          <DashboardCalendar />
        </Grid>
        <Grid item xs={5}>
          <Stack spacing={2} height="88vh">
            <DashboardPreview buildState={buildState} />
            <DashboardList />
          </Stack>
        </Grid>
        <Grid item xs={3}>
          <Stack spacing={2} height="88vh">
            <DashboardInfo buildState={buildState} setBuildState={setBuildState} />
            <DashboardMenu />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
