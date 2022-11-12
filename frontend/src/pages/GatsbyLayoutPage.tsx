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

  const [isChoiceTheme, setChoiceTheme] = useState("gatsby-starter-minimal-blog");

  const [nextModalOpen, setNextModalOpen] = React.useState(false);

  const showNextModal = () => {
    Axios.post(api.blog.chooseTemplate(), {
      accessToken: accessToken,
      githubId: githubId,
      template: isChoiceTheme,
    })
      .then((res) => {
        console.log("개츠비 테마적용 성공", res.data);
        setTimeout(() => [setAuthFile()], 500);
      })
      .catch((err) => {
        console.error("개츠비 테마적용 err", err);
      });
  };

  const setAuthFile = async () => {
    await Axios.put(api.auth.setAuthFile(), {
      accessToken: accessToken,
      githubId: githubId,
      blogType: 1,
    })
      .then((res) => {
        console.log("블로그 인증 파일 생성", res.data);
        setTimeout(() => [changeBranch()], 500);
      })
      .catch((err) => {
        console.error("블로그 인증 파일 생성", err);
      });
  };

  const changeBranch = async () => {
    await Axios.put(api.blog.changeBranch(accessToken, githubId))
      .then(async (res) => {
        console.log("1. 배포 브랜치 변경", res);
        setSecretRepo();
      })
      .catch((err) => {
        console.error("1. 배포 브랜치 변경", err.data);
      });
  };

  const setSecretRepo = async () => {
    await Axios.put(api.auth.setSecretRepo(accessToken, githubId))
      .then((res) => {
        console.log("2. Repo secrets 생성", res.data);
        setGitWorkflow();
      })
      .catch((err) => {
        console.error("2. Repo secrets 생성", err);
      });
  };

  const setGitWorkflow = async () => {
    await Axios.post(api.blog.setGitWorkflow(accessToken, githubId))
      .then((res) => {
        console.log("3. Workflow 생성", res.data);
        setNextModalOpen(true);
      })
      .catch((err) => {
        console.error("3. Workflow 생성", err);
      });
  };

  return (
    <Box>
      <Stack direction="column" justifyContent="center" alignItems="center" spacing={1} sx={{ mt: "2%" }}>
        <Text value="Gatsby 테마 선택" type="pageTitle" bold />
        <Text value="이미 구성된 레이아웃과 테마로 게시글을 작성하고 꾸밉니다." type="groupTitle" />
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
