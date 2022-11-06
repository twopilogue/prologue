import React from "react";
import { Box, Stack } from "@mui/system";
import { Button } from "@mui/material";
import Text from "components/Text";
import styles from "features/landing/Landing.module.css";
import GitHubIcon from "@mui/icons-material/GitHub";

function LandingMain() {
  return (
    <Box className={styles.mainBox}>
      <Stack spacing={1}>
        <Text value="깃허브 블로그를 편리하게" type="groupTitle" />
        <Stack spacing={0.5} sx={{ pb: 3 }}>
          <Text value="1분만에 만드는" type="title" bold />
          <Text value="나만의 깃허브 블로그" type="title" bold />
        </Stack>
        <Button startIcon={<GitHubIcon />} className={styles.githubLoginButton}>
          Signup With GitHub
        </Button>
      </Stack>
    </Box>
  );
}

export default LandingMain;
