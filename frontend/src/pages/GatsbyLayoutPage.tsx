import React from "react";
import { Box, Stack } from "@mui/material";
import Text from "components/Text";

const LayoutChoicePage = () => {
  return (
    <Box sx={{ mx: 10 }}>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        sx={{ my: 7.5 }}
      >
        <Text value="Gatsby 테마 선택" type="pageTitle" bold />
        <Text
          value="이미 구성된 레이아웃과 테마로 게시글을 작성하고 꾸밉니다."
          type="groupTitle"
        />
      </Stack>
    </Box>
  );
};

export default LayoutChoicePage;
