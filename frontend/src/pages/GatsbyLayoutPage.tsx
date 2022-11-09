import React, { useState } from "react";
import { Box, Stack } from "@mui/material";
import GatsbyLayoutCard from "features/blog/BlogGatsbyTheme";
import Text from "components/Text";
import Button from "components/Button";
import BlogDashboardMoveModal from "features/blog/BlogDashboardMoveModal";
import api from "api/Api";
import Axios from "api/JsonAxios";
import { useSelector } from "react-redux";
import { rootState } from "app/store";


const LayoutChoicePage = () => {
  const { accessToken, githubId } = useSelector((state: rootState) => state.auth);
  
  const [isChoiceTheme, setChoiceTheme] = useState(
    "gatsby-starter-minimal-blog",
  );

  const [nextModalOpen, setNextModalOpen] = React.useState(false);

  const showNextModal = () => {
    Axios.post(api.blog.chooseTemplate(), {
      accessToken: accessToken,
      githubId: githubId,
      template: isChoiceTheme,
    })
      .then((res) => {
        console.log("개츠비 적용", res.data);
        // setNextModalOpen(true);
      })
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
