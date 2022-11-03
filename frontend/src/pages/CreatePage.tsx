import React from "react";
import BlogCreateBox from "features/blog/blogCreate/BlogCreateBox";
import BlogLayoutSetting from "features/blog/blogCreate/BlogLayoutSetting";
import BlogStepper from "features/blog/blogCreate/BlogStepper";
import Button from "components/Button";
import { Stack } from "@mui/material";

const LandingPage = () => {
  const [BlogCreateClick, setBlogCreateClick] = React.useState(false);

  return (
    // 1. 블로그를 생성하지 않은 경우
    <div style={{ padding: "100px" }}>
      <BlogStepper step={BlogCreateClick ? 1 : 0} />
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "50px",
        }}
      >
        {BlogCreateClick ? (
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <BlogLayoutSetting />
            <Button label="Next" onClick={() => setBlogCreateClick(false)} />
          </Stack>
        ) : (
          <BlogCreateBox onClick={() => setBlogCreateClick(true)} />
        )}
      </div>
    </div>
  );
};

export default LandingPage;
