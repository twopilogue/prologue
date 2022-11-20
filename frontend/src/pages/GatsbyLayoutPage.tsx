import React, { useState } from "react";
import { Box, Stack } from "@mui/material";
import GatsbyLayoutCard from "features/blog/BlogGatsbyTheme";
import Text from "components/Text";
import Button from "components/Button";
import api from "api/Api";
import Axios from "api/JsonAxios";
import { useSelector } from "react-redux";
import { rootState } from "app/store";
import BlogLoding from "features/blog/BlogLoding";
import { useNavigate } from "react-router-dom";

const LayoutChoicePage = () => {
  const navigate = useNavigate();

  const { accessToken, githubId } = useSelector((state: rootState) => state.auth);

  const [isChoiceTheme, setChoiceTheme] = useState("gatsby-starter-foundation");
  const [lodingView, openLodingView] = React.useState(false);

  const showNextModal = () => {
    openLodingView(true);
    Axios.post(api.blog.chooseTemplate(), {
      accessToken: accessToken,
      githubId: githubId,
      template: isChoiceTheme,
    }).then(() => {
      setTimeout(() => [setSecretRepo()], 200);
    });
  };

  const setSecretRepo = async () => {
    await Axios.put(api.auth.setSecretRepo(accessToken, githubId)).then(() => {
      setTimeout(() => [changeBuildType()], isChoiceTheme === "gatsby-starter-netlify-cms" ? 3000 : 200);
    });
  };

  const changeBuildType = async () => {
    await Axios.put(api.blog.changeBuildType(accessToken, githubId)).then(async () => {
      setAuthFile();
    });
  };

  const setAuthFile = async () => {
    await Axios.put(api.auth.setAuthFile(), {
      accessToken: accessToken,
      githubId: githubId,
      blogType: 1,
      template: isChoiceTheme,
    }).then(() => {
      navigate("/create", { state: { setStepNumber: 2, setTemplate: isChoiceTheme } });
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
        <Stack direction="row" spacing={3}>
          <Button label="Back" onClick={() => navigate("/create", { state: { setStepNumber: 1 } })} color="sky" />
          <Button label="Next" onClick={showNextModal} />
        </Stack>
      </Stack>
      {lodingView && <BlogLoding />}
    </Box>
  );
};

export default LayoutChoicePage;
