import React from "react";
import StepperComponent from "features/blog/stepComponent";

const LandingPage = () => {
  return (
    <>
      <h1>블로그 생성</h1>
      <StepperComponent step={0} />
      <StepperComponent step={1} />
    </>
  );
};

export default LandingPage;
