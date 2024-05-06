import { useEffect } from "react";
import { Box, Stack } from "@mui/system";
import Button from "@mui/material/Button";
import Text from "components/Text";
import styles from "features/landing/Landing.module.css";
import GitHubIcon from "@mui/icons-material/GitHub";
import landingMainImg1 from "assets/landing/landingMainImg1.png";
import { Paper } from "@mui/material";
import waveSvg from "assets/landing/wave.svg";
import { useNavigate } from "react-router-dom";
import { getAuthFile, getLogin, setSecretRepo } from "apis/api/auth";
import { getUserInfo } from "apis/services/auth";
import { getRepoList } from "apis/api/blog";
import { useAuthActions } from "stores/authStore";

const LoginOAuthHandler = () => {
  const navigate = useNavigate();
  const { setAuthFileAction, setBlogTypeAction, setLoginAction, setTemplateAction } = useAuthActions();

  const code = new URLSearchParams(location.search).get("code");

  useEffect(() => {
    getAccessToken();
  }, []);

  const getAccessToken = async () => {
    const rawUserInfo = await getLogin(code);
    const { accessToken, githubId, githubImage } = getUserInfo(rawUserInfo);
    setLoginAction(accessToken, githubId, githubImage); // zustand

    // 깃허브 블로그 개설여부
    const checkRepo = await getRepoList(accessToken, githubId);
    if (checkRepo) {
      // 서비스 인증 파일 존재 여부
      const res = await getAuthFile(accessToken, githubId);
      if (res.checkAuthFile) {
        setBlogTypeAction(res.blogType);
        setAuthFileAction(true);
        setTemplateAction(res.template);

        const statusCode = await setSecretRepo(accessToken, githubId);
        if (statusCode === 200) navigate("/dashboard");
      } else {
        setAuthFileAction(false);
        navigate("/create/reset");
      }
    } else navigate("/create");
  };

  return (
    <Box className={styles.mainBox}>
      <div className={styles.loginImgGradient} />
      <img src={waveSvg} className={styles.mainWaveSvg} />
      <Stack direction="row" alignItems="center" spacing={30} sx={{ ml: 5, position: "absolute" }}>
        <Box className={styles.mainLeftBox}>
          <Text value="깃허브 블로그를 편리하게" type="groupTitle" />
          <Stack spacing={0.5} sx={{ pb: 3 }}>
            <Stack className={styles.mainTextBox}>
              <Text value="1분만에 만드는" bold />
              <Text value="나만의 깃허브 블로그" bold />
            </Stack>
          </Stack>
          <Button
            startIcon={<GitHubIcon />}
            sx={{
              backgroundColor: "#2f2f2f",
              color: "white",
              width: "300px",
              borderRadius: "10px",
              zIndex: "1",
              "&:hover": {
                backgroundColor: "#212121",
              },
            }}
          >
            Signup With GitHub
          </Button>
        </Box>
        <Paper elevation={6} square className={styles.mainSlider}>
          <Box sx={{ width: 562, height: 350 }}>
            <img src={landingMainImg1} className={styles.mainImg} />
          </Box>
        </Paper>
      </Stack>
    </Box>
  );
};

export default LoginOAuthHandler;
