import React from "react";
import BlogCreateBox from "features/blog/blogCreate/BlogCreateBox";
import BlogLayoutSetting from "features/blog/blogCreate/BlogLayoutSetting";
import BlogStepper from "features/blog/blogCreate/BlogStepper";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BlogDashboardMoveModal from "features/blog/BlogDashboardMoveModal";
import Axios from "api/JsonAxios";
import api from "api/Api";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "app/store";
import { authActions } from "slices/authSlice";

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isStepNumber, setStepNumber] = React.useState(0);
  const [radioValue, setRadioValue] = React.useState("CustomLayout");

  const { accessToken, githubId } = useSelector((state: rootState) => state.auth);

  const createRepo = () => {
    Axios.post(api.blog.setRepo(accessToken, githubId));
    setStepNumber(1);
  };
  const layoutSetting = () => {
    console.log(radioValue);
    if (radioValue === "CustomLayout") {
      Axios.put(api.auth.setAuthFile(), {
        accessToken: accessToken,
        githubId: githubId,
        blogType: 0,
      }).then((res) => {
        dispatch(authActions.blogType({ blogType: res.data.blogType }));
        Axios.post(api.blog.chooseTemplate(), {
          accessToken: accessToken,
          githubId: githubId,
          template: "prologue-template",
        }).then((res) => {
          console.log("기본테마 적용", res.data);
        })
        // setStepNumber(2);
      });
    } else if (radioValue === "GatsbyLayout") {
      Axios.put(api.auth.setAuthFile(), {
        accessToken: accessToken,
        githubId: githubId,
        blogType: 1,
      }).then((res) => {
        dispatch(authActions.blogType({ blogType: res.data.blogType }));
        navigate("/create/gatsby");
      });
    }
  };

  return (
    <div style={{ paddingTop: "5%" }}>
      <BlogStepper step={isStepNumber} />
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "5%",
        }}
      >
        {isStepNumber === 0 ? (
          <BlogCreateBox onClick={createRepo} />
        ) : isStepNumber === 1 ? (
          <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
            <BlogLayoutSetting radioValue={radioValue} setValue={setRadioValue} onClick={layoutSetting} />
          </Stack>
        ) : (
          <BlogDashboardMoveModal />
        )}
      </div>
    </div>
  );
};

export default LandingPage;
