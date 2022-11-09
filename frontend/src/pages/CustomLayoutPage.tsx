import React from "react";
import { Box, Stack } from "@mui/material";
import Text from "components/Text";
import Button from "components/Button";

const CustomLayoutPage = () => {
  return (
    <Box sx={{ mt: 3, minHeight: "88vh" }}>
      <Stack direction="column" justifyContent="center" alignItems="center" spacing={1} sx={{ mt: "2%" }}>
        <Text value="직접 레이아웃 세팅" type="pageTitle" bold />
        <Text value="다른사람에게 보여줄 내 프로필과 블로그 정보를 미리 작성합니다." type="groupTitle" />
      </Stack>
    </Box>
  );
};

export default CustomLayoutPage;
