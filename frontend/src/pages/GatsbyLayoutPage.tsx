import { useState } from "react";
import { Box, Stack } from "@mui/material";
import GatsbyLayoutCard from "features/blog/BlogGatsbyTheme";
import Text from "components/Text";
import Button from "components/Button";
import api from "apis/BaseUrl";
import Axios from "apis/JsonAxios";
import { useSelector } from "react-redux";
import { rootState } from "app/store";
import BlogLoding from "features/blog/BlogLoding";
import { useNavigate } from "react-router-dom";
import { putAuthFile, setSecretRepo } from "apis/api/auth";
import { selectTemplate, setBuildType } from "apis/api/blog";

const LayoutChoicePage = () => {
  const navigate = useNavigate();

  const { accessToken, githubId } = useSelector((state: rootState) => state.auth);

  const [isChoiceTheme, setChoiceTheme] = useState("gatsby-starter-foundation");
  const [lodingView, openLodingView] = useState(false);

  const showNextModal = async () => {
    openLodingView(true);
    const statusCode = await selectTemplate(accessToken, githubId, isChoiceTheme);
    if (statusCode === 200) makeSecretRepo();
  };

  const makeSecretRepo = async () => {
    const statusCode = await setSecretRepo(accessToken, githubId);
    if (statusCode === 200) changeBuildType();
    setTimeout(() => [changeBuildType()], isChoiceTheme === "gatsby-starter-netlify-cms" ? 3000 : 200);
  };

  const changeBuildType = async () => {
    const statusCode = await setBuildType(accessToken, githubId);
    if (statusCode === 200) setAuthFile();
  };

  const setAuthFile = async () => {
    const statusCode = await putAuthFile({
      accessToken,
      githubId,
      blogType: 1,
      template: isChoiceTheme,
    });
    if (statusCode === 200) navigate("/create", { state: { setStepNumber: 2, setTemplate: isChoiceTheme } });
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
