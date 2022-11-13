import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Box, Stack } from "@mui/system";
import Button from "@mui/material/Button";
import Text from "components/Text";
import styles from "features/landing/Landing.module.css";
import GitHubIcon from "@mui/icons-material/GitHub";
import landingMainImg1 from "assets/landing/landingMainImg1.png";
import landingMainImg2 from "assets/landing/landingMainImg2.png";
import landingMainImg3 from "assets/landing/landingMainImg3.png";
import landingMainImg4 from "assets/landing/landingMainImg4.png";
import { Paper } from "@mui/material";
import waveSvg from "assets/landing/wave.svg";
import Axios from "api/JsonAxios";
import api from "api/Api";

function LandingMain() {
  const [state, setState] = useState({ height: 0 });
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

  const images = [landingMainImg1, landingMainImg2, landingMainImg3, landingMainImg4];

  const getMainDivHeight = () => {
    const mainImageWidth = 1668;
    const mainImageHeight = 1039;
    return Math.floor((window.innerWidth * mainImageHeight) / mainImageWidth);
  };

  const updateDimensions = () => {
    setState({ height: getMainDivHeight() });
  };

  const componentDidMount = () => {
    window.addEventListener("resize", updateDimensions);
    updateDimensions(); //최초로 한번 실행하기
  };

  const githubOnClick = () => {
    Axios.get(api.auth.getUri()).then((res) => {
      window.location.href = res.data.uri;
    });
  };

  return (
    <Box className={styles.mainBox}>
      <div className={styles.mainImgGradient} />
      <img src={waveSvg} className={styles.mainWaveSvg} />
      <Stack direction="row" alignItems="center" spacing={30} sx={{ ml: 5, position: "absolute" }}>
        <Box className={styles.mainLeftBox}>
          <Text value="깃허브 블로그를 편리하게" type="groupTitle" />
          <Stack spacing={0.5} sx={{ pb: 3 }}>
            <Box className={styles.mainTextBox}>
              <span className="text"></span>
            </Box>
          </Stack>
          <Button
            startIcon={<GitHubIcon />}
            onClick={githubOnClick}
            sx={{
              backgroundColor: "#2f2f2f",
              color: "white",
              width: "300px",
              borderRadius: "10px",
              zIndex: "1",
              "&:after": {
                zIndex: "-1",
                borderRadius: "10px",
                backgroundColor: "#212121",
                transition: "all 0.3s ease",
              },
              "&:hover": {
                backgroundColor: "#212121",
              },
              "&:hover:after": {
                left: "0",
                width: "100%",
              },
              "&:active": {
                top: "2px",
              },
            }}
          >
            Signup With GitHub
          </Button>
        </Box>
        <Paper elevation={6} square className={styles.mainSlider}>
          <Carousel
            className={styles.mainCarousel}
            indicators={false}
            navButtonsAlwaysInvisible
            stopAutoPlayOnHover={false}
            interval={13000}
          >
            {images.map((img, idx) => (
              <Box key={idx} className={styles.mainImgBox} sx={{ width: "100%", height: state.height }}>
                <img src={img} className={styles.mainImg} />
              </Box>
            ))}
          </Carousel>
        </Paper>
      </Stack>
    </Box>
  );
}

export default LandingMain;
