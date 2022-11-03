import React from "react";
import BlogCreateBox from "features/blog/blogCreate/BlogCreateBox";
import BlogLayoutSetting from "features/blog/blogCreate/BlogLayoutSetting";
import BlogStepper from "features/blog/blogCreate/BlogStepper";
import Button from "components/Button";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const [BlogCreateClick, setBlogCreateClick] = React.useState(0);
  const [radioValue, setRadioValue] = React.useState("CustomLayout");

  const layoutSetting = () => {
    console.log(radioValue);
    if (radioValue === "GatsbyLayout") navigate("/create/gatsby");
    if (radioValue === "CustomLayout") {
      setBlogCreateClick(2);
      setTimeout(() => {
        // 블로그 생성시 필요한 것
      }, 2000);
    }
  };

  return (
    <div style={{ padding: "100px" }}>
      <BlogStepper step={BlogCreateClick} />
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "50px",
        }}
      >
        {BlogCreateClick === 1 ? (
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <BlogLayoutSetting
              radioValue={radioValue}
              setValue={setRadioValue}
            />
            <Button label="Next" onClick={layoutSetting} />
          </Stack>
        ) : (
          <BlogCreateBox onClick={() => setBlogCreateClick(1)} />
        )}
      </div>
    </div>
  );
};

export default LandingPage;
