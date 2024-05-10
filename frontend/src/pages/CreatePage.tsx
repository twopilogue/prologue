import BlogCreateBox from "features/blog/blogCreate/BlogCreateBox";
import BlogLayoutSetting from "features/blog/blogCreate/BlogLayoutSetting";
import BlogStepper from "features/blog/blogCreate/BlogStepper";
import { Stack } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import BlogCustomInfo from "features/blog/BlogCustomInfo";
import BlogLoding from "features/blog/BlogLoding";
import { useState } from "react";
import { putAuthFile, setSecretRepo } from "apis/api/auth";
import { selectTemplate, setBuildType } from "apis/api/blog";
import { useAuthActions, useAuthStore } from "stores/authStore";
import { useShallow } from "zustand/react/shallow";

const CreatePage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [accessToken, githubId] = useAuthStore(useShallow((state) => [state.accessToken, state.githubId]));
  const [isStepNumber, setStepNumber] = useState(state === null ? 0 : state.setStepNumber);
  const [isThemplate] = useState(state === null ? "prologue-template" : state.setTemplate);
  const [radioValue, setRadioValue] = useState("CustomLayout");
  const [lodingView, openLodingView] = useState(false);

  const { setBlogTypeAction } = useAuthActions();

  const layoutSetting = async () => {
    if (radioValue === "CustomLayout") {
      setBlogTypeAction(0);
      chooseTemplate();
    } else if (radioValue === "GatsbyLayout") {
      setBlogTypeAction(1);
      navigate("/create/gatsby");
    }
  };

  const chooseTemplate = async () => {
    openLodingView(true);
    const statusCode = await selectTemplate(accessToken, githubId, "prologue-template");
    if (statusCode === 200) setTimeout(() => [makeSecretRepo()], 2000);
  };

  const makeSecretRepo = async () => {
    const statusCode = await setSecretRepo(accessToken, githubId);
    if (statusCode === 200) setTimeout(() => [changeBuildType()], 2000);
  };

  const changeBuildType = async () => {
    const statusCode = await setBuildType(accessToken, githubId);
    if (statusCode === 200) setTimeout(() => [setAuthFile()], 2000);
  };

  // 인증 파일 생성
  const setAuthFile = async () => {
    const statusCode = await putAuthFile({
      accessToken: accessToken,
      githubId: githubId,
      blogType: 0,
      template: "prologue-template",
    });
    if (statusCode === 200) {
      openLodingView(false);
      setStepNumber(2);
    }
  };

  return (
    <Stack justifyContent="center" sx={{ height: "88vh" }}>
      <div>
        <BlogStepper step={isStepNumber} />
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {isStepNumber === 0 ? (
            <BlogCreateBox onClick={() => setStepNumber(1)} />
          ) : isStepNumber === 1 ? (
            <BlogLayoutSetting radioValue={radioValue} setValue={setRadioValue} onClick={layoutSetting} />
          ) : (
            <BlogCustomInfo template={isThemplate} />
          )}
        </div>
      </div>
      {lodingView && <BlogLoding />}
    </Stack>
  );
};

export default CreatePage;
