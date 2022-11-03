import React from "react";
import { Box, Stack } from "@mui/material";
import Text from "components/Text";
import Button from "components/Button"

import GatsbyLayoutCard from "features/blog/GatsbyLayoutCard";

const LayoutChoicePage = () => {
  return (
    <Box>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        sx={{ my: "3vw" }}
      >
        <Text value="Gatsby 테마 선택" type="pageTitle" bold />
        <Text
          value="이미 구성된 레이아웃과 테마로 게시글을 작성하고 꾸밉니다."
          type="groupTitle"
        />
      </Stack>
      <Stack
        direction="column"
        alignItems="center"
        spacing={3}
      >
        <GatsbyLayoutCard />
        <Button label="Next" />
      </Stack>
    </Box>
  );
};

export default LayoutChoicePage;
