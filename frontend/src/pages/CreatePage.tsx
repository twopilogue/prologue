import BlogCreateBox from "features/blog/blogCreate/BlogCreateBox";
import BlogLayoutSetting from "features/blog/blogCreate/BlogLayoutSetting";
import BlogStepper from "features/blog/blogCreate/BlogStepper";
import { Stack } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "apis/JsonAxios";
import api from "apis/BaseUrl";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "app/store";
import { authActions } from "slices/authSlice";
import BlogCustomInfo from "features/blog/BlogCustomInfo";
import BlogLoding from "features/blog/BlogLoding";
import { useState } from "react";
import { putAuthFile } from "apis/api/auth";

const CreatePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const { accessToken, githubId } = useSelector((state: rootState) => state.auth);

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
    await Axios.post(api.blog.chooseTemplate(), {
      accessToken,
      githubId,
      template: "prologue-template",
    }).then(async () => {
      setTimeout(() => [setSecretRepo()], 200);
    });
  };

  const setSecretRepo = async () => {
    await Axios.put(api.auth.setSecretRepo(accessToken, githubId)).then(() => {
      changeBuildType();
    });
  };

  const changeBuildType = async () => {
    await Axios.put(api.blog.changeBuildType(accessToken, githubId)).then((res) => {
      setAuthFile();
    });
  };

  // 인증 파일 생성
  const setAuthFile = async () => {
    const res = await putAuthFile({
      accessToken: accessToken,
      githubId: githubId,
      blogType: 0,
      template: "prologue-template",
    });
    if (res.statusCode === 200) {
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
