import React from "react";
import DashboardCalendar from "features/dashboard/DashboardCalendar/DashboardCalendar";
import DashboardInfo from "features/dashboard/DashboardInfo";
import DashboardList from "features/dashboard/DashboardList";
import DashboardMenu from "features/dashboard/DashboardMenu";
import DashboardPreview from "features/dashboard/DashboardPreview";
import { Box, Grid, Stack } from "@mui/material";

const DashboardPage = () => {
  return (
    <Box sx={{ mt: 3, minHeight: "88vh"}}>
      <Grid container spacing={2} columns={11}>
        <Grid item xs={3}>
          <DashboardCalendar />
        </Grid>
        <Grid item xs={5}>
          <Stack spacing={2} height="88vh">
            <DashboardPreview />
            <DashboardList />
          </Stack>
        </Grid>
        <Grid item xs={3}>
          <Stack spacing={2} height="88vh">
            <DashboardInfo />
            <DashboardMenu />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
