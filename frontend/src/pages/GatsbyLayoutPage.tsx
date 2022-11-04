import React, { useState } from "react";
import { Box, Stack } from "@mui/material";
import GatsbyLayoutCard from "features/blog/BlogGatsbyTheme";
import Text from "components/Text";
import Button from "components/Button";
import BlogDashboardMoveModal from "features/blog/BlogDashboardMoveModal";

const LayoutChoicePage = () => {
  const [isChoiceTheme, setChoiceTheme] = useState(
    "gatsby-starter-minimal-blog",
  );

  const [nextModalOpen, setNextModalOpen] = React.useState(false);

  const showNextModal = () => {
    setNextModalOpen(true);
    console.log("선택한 테마 : ", isChoiceTheme);
  };

  return (
    <Box>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        sx={{ mt: "2%" }}
      >
        <Text value="Gatsby 테마 선택" type="pageTitle" bold />
        <Text
          value="이미 구성된 레이아웃과 테마로 게시글을 작성하고 꾸밉니다."
          type="groupTitle"
        />
      </Stack>
      <Stack direction="column" alignItems="center" spacing={3}>
        <GatsbyLayoutCard setChoiceTheme={setChoiceTheme} />
        <Button label="Next" onClick={showNextModal} />
      </Stack>
      {nextModalOpen && <BlogDashboardMoveModal />}
    </Box>
  );
};

export default LayoutChoicePage;
