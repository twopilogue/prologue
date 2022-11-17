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
import BlogLoding from "features/blog/BlogLoding";
import { useDispatch } from "react-redux";
import { dashboardActions } from "slices/dashboardSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LayoutChoicePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { accessToken, githubId } = useSelector((state: rootState) => state.auth);

  const [isChoiceTheme, setChoiceTheme] = useState("gatsby-starter-foundation");
  const [nextModalOpen, setNextModalOpen] = React.useState(false);
  const [lodingView, openLodingView] = React.useState(false);

  const showNextModal = () => {
    openLodingView(true);
    Axios.post(api.blog.chooseTemplate(), {
      accessToken: accessToken,
      githubId: githubId,
      template: isChoiceTheme,
    })
      .then((res) => {
        console.log("1. 개츠비 테마적용 성공", res.data);
        setTimeout(() => [setSecretRepo()], 200);
      })
      .catch((err) => {
        console.error("1. 개츠비 테마적용 err", err);
      });
  };

  const setSecretRepo = async () => {
    await Axios.put(api.auth.setSecretRepo(accessToken, githubId))
      .then((res) => {
        console.log("2. Repo secrets 생성", res.data);
        setTimeout(() => [changeBuildType()], isChoiceTheme === "gatsby-starter-netlify-cms" ? 3000 : 200);
      })
      .catch((err) => {
        console.error("2. Repo secrets 생성", err);
      });
  };

  const changeBuildType = async () => {
    await Axios.put(api.blog.changeBuildType(accessToken, githubId))
      .then(async (res) => {
        console.log("3. 블로그 빌드타입 변경", res.data);
        setAuthFile();
      })
      .catch((err) => {
        console.error("3. 블로그 빌드타입 변경", err);
      });
  };

  const setAuthFile = async () => {
    await Axios.put(api.auth.setAuthFile(), {
      accessToken: accessToken,
      githubId: githubId,
      blogType: 1,
    })
      .then((res) => {
        console.log("4. 블로그 인증 파일 생성", res.data);
        getDashboardInfo();
        // openLodingView(false);
        // setNextModalOpen(true);
      })
      .catch((err) => {
        console.error("4. 블로그 인증 파일 생성", err);
      });
  };

  function getDashboardInfo() {
    try {
      getMonthPosts();
      getNewPost();
      getBlogInfo();
    } catch {
      console.log("대시보드 페이지 이동 전 데이터 받기 실패");
      navigate("/dashboard");
    }
  }

  async function getMonthPosts() {
    await Axios.get(api.dashboard.getMonthPosts(accessToken, githubId)).then((res) => {
      dispatch(
        dashboardActions.monthPosts({
          monthPosts: res.data.dateList,
        }),
      );
    });
  }

  async function getNewPost() {
    await Axios.get(api.dashboard.getNewPost(accessToken, githubId)).then((res) => {
      dispatch(
        dashboardActions.newPosts({
          newPosts: res.data.currentPosts,
        }),
      );
    });
  }

  function getBlogInfo() {
    axios
      .all([
        Axios.get(api.dashboard.getNewBuildTime(accessToken, githubId)),
        Axios.get(api.dashboard.getRepoSize(accessToken, githubId)),
        Axios.get(api.dashboard.getTotalPost(accessToken, githubId)),
      ])
      .then(
        axios.spread((res1, res2, res3) => {
          dispatch(
            dashboardActions.blogInfo({
              totalPost: res3.data.total,
              repoSize: res2.data.size,
              buildTime: res1.data.latestBuildTime,
            }),
          );
          openLodingView(false);
          setNextModalOpen(true);
        }),
      );
  }

  return (
    <Box>
      <Stack direction="column" justifyContent="center" alignItems="center" spacing={1} sx={{ mt: "2%" }}>
        <Text value="Gatsby 테마 선택" type="pageTitle" bold />
        <Text value="이미 구성된 레이아웃과 테마로 게시글을 작성하고 꾸밉니다." type="groupTitle" />
      </Stack>
      <Stack direction="column" alignItems="center" spacing={3}>
        <GatsbyLayoutCard setChoiceTheme={setChoiceTheme} />
        <Stack direction="row" spacing={3}>
          <Button label="Back" onClick={() => navigate("/create", { state: { setStepNumber: 1 } })} color="sky" />
          <Button label="Next" onClick={showNextModal} />
        </Stack>
      </Stack>
      {nextModalOpen && <BlogDashboardMoveModal />}
      {lodingView && <BlogLoding />}
    </Box>
  );
};

export default LayoutChoicePage;
