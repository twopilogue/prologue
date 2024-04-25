import BlogCreateBox from "features/blog/blogCreate/BlogCreateBox";
import BlogLayoutSetting from "features/blog/blogCreate/BlogLayoutSetting";
import BlogStepper from "features/blog/blogCreate/BlogStepper";
import { Stack } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "slices/authSlice";
import BlogCustomInfo from "features/blog/BlogCustomInfo";
import BlogLoding from "features/blog/BlogLoding";
import { useState } from "react";
import { putAuthFile, setSecretRepo } from "apis/api/auth";
import { selectTemplate, setBuildType } from "apis/api/blog";
import { useAuthStore } from "stores/authStore";

const CreatePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const accessToken = useAuthStore((state) => state.accessToken);
  const githubId = useAuthStore((state) => state.githubId);

  const [isStepNumber, setStepNumber] = useState(state === null ? 0 : state.setStepNumber);

  const [isThemplate] = useState(state === null ? "prologue-template" : state.setTemplate);
  const [radioValue, setRadioValue] = useState("CustomLayout");
  const [lodingView, openLodingView] = useState(false);

  const layoutSetting = async () => {
    if (radioValue === "CustomLayout") {
      dispatch(authActions.blogType({ blogType: 0 }));
      chooseTemplate();
    } else if (radioValue === "GatsbyLayout") {
      dispatch(authActions.blogType({ blogType: 1 }));
      navigate("/create/gatsby");
    }
  };

  const chooseTemplate = async () => {
    openLodingView(true);
    const statusCode = await selectTemplate(accessToken, githubId, "prologue-template");
    if (statusCode === 200) makeSecretRepo();
  };

  const makeSecretRepo = async () => {
    const statusCode = await setSecretRepo(accessToken, githubId);
    if (statusCode === 200) changeBuildType();
  };

  const changeBuildType = async () => {
    const statusCode = await setBuildType(accessToken, githubId);
    if (statusCode === 200) setAuthFile();
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
