import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { LightMode, DarkMode } from "@mui/icons-material";
import { Avatar, Box, IconButton, Menu, MenuItem, Stack, Typography, Button, Link } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LogoutIcon from "@mui/icons-material/Logout";
import styles from "./css/Header.module.css";
import palette from "../styles/colorPalette";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "app/store";
import api from "api/Api";
import Axios from "api/JsonAxios";
import { authActions } from "slices/authSlice";

const GithubButton = styled(Button)(() => ({
  margin: 3,
  backgroundColor: "transparent",
  ".MuiButton-outlined": { color: palette.blue_5 },
  "&:hover": {
    backgroundColor: "transparent",
    borderColor: palette.black,
    boxShadow: "none",
  },
}));

const AvatarStyled = styled(Avatar)(() => ({
  margin: 3,
  width: "30px",
  height: "30px",
}));

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { auth, githubId, githubImage } = useSelector((state: rootState) => state.auth);

  const [backgroudMode, setBackgroudMode] = React.useState(true);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const onLogin = () => {
    Axios.get(api.auth.getUri()).then((res) => {
      window.location.href = res.data.uri;
    });
  };

  const onLogout = () => {
    handleCloseUserMenu();
    dispatch(authActions.logout());
    navigate("/");
  };

  return (
    <header>
      <div
        className={styles.wrapper}
        style={{
          backgroundColor: backgroudMode ? "white" : "black",
          color: backgroudMode ? "black" : "white",
        }}
      >
        <div>
          <NavLink
            to="/"
            style={{
              color: backgroudMode ? "black" : "white",
            }}
          >
            <img
              width="32"
              height="32"
              src="https://user-images.githubusercontent.com/83412032/198398260-5da6df5d-7abd-4228-a9e7-471360e16000.png"
            />
            <h1>Prologue</h1>
          </NavLink>
        </div>

        <Stack direction="row" spacing={2} style={{ alignItems: "center" }}>
          <IconButton
            sx={{ color: backgroudMode ? "black" : "white" }}
            onClick={() => setBackgroudMode(!backgroudMode)}
          >
            {backgroudMode ? <LightMode /> : <DarkMode />}
          </IconButton>
          <NavLink
            to="/post"
            style={{
              color: backgroudMode ? "black" : "white",
              textDecoration: "none",
            }}
          >
            게시글 관리
          </NavLink>
          <NavLink
            to="/setting"
            style={{
              color: backgroudMode ? "black" : "white",
              textDecoration: "none",
            }}
          >
            블로그 설정
          </NavLink>

          {auth ? (
            <>
              <Box sx={{ flexGrow: 0 }}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <AvatarStyled alt="Remy Sharp" src={githubImage} />
                </IconButton>
                <Menu
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Link href={`https://github.com/${githubId}`} underline="none" color="black">
                      <Stack direction="row" spacing={1}>
                        <GitHubIcon />
                        <Typography textAlign="center">GitHub</Typography>
                      </Stack>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={onLogout}>
                    <Stack direction="row" spacing={1}>
                      <LogoutIcon />
                      <Typography textAlign="center">Logout</Typography>
                    </Stack>
                  </MenuItem>
                </Menu>
              </Box>
            </>
          ) : (
            <GithubButton
              startIcon={<GitHubIcon />}
              onClick={onLogin}
              sx={{
                color: backgroudMode ? "black" : "white",
              }}
            >
              Login
            </GithubButton>
          )}
        </Stack>
      </div>
    </header>
  );
}

export default Header;
