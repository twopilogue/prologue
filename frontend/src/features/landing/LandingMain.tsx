import React, { useEffect, useRef, useState } from "react";
import { Box, Stack } from "@mui/system";
import Button from "@mui/material/Button";
import Text from "components/Text";
import styles from "features/landing/Landing.module.css";
import GitHubIcon from "@mui/icons-material/GitHub";
import landingMainImg1 from "assets/landing/landingMainImg1.png";
import landingMainImg2 from "assets/landing/landingMainImg2.png";
import landingMainImg3 from "assets/landing/landingMainImg3.png";
import landingMainImg4 from "assets/landing/landingMainImg4.png";

function LandingMain() {
  const [isTextTyping, setIsTextTyping] = useState<boolean>(false);

  const content = "1분만에 만드는\n나만의 깃허브 블로그";
  const text = document.querySelector(".text") as HTMLParagraphElement;
  let i = 0;

  function typing() {
    if (i < content.length) {
      const txt = content.charAt(i);
      text.innerHTML += txt === "\n" ? "<br/>" : txt;
      i++;
    } else setIsTextTyping(false);
  }
  {
    isTextTyping && setInterval(typing, 150);
  }

  useEffect(() => {
    const text = document.querySelector(".text") as HTMLParagraphElement;
    text.innerHTML = "";
    setIsTextTyping(true);
  }, []);

  return (
    <Box className={styles.mainBox}>
      <div className={styles.landingMainDiv}>
        <Stack spacing={1}>
          <Text value="깃허브 블로그를 편리하게" type="groupTitle" />
          <Stack spacing={0.5} sx={{ pb: 3 }}>
            <Box className={styles.landingTextBox}>
              <span className="text"></span>
            </Box>
          </Stack>
          <Button
            startIcon={<GitHubIcon />}
            sx={{
              backgroundColor: "black",
              color: "white",
              width: "300px",
              borderRadius: "10px",
            }}
          >
            Signup With GitHub
          </Button>
        </Stack>
        <img className={styles.landingMainImg} src={landingMainImg1} />
      </div>
    </Box>
  );
}

export default LandingMain;
