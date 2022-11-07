import React from "react";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { LightMode, DarkMode } from "@mui/icons-material";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
  Button,
  Link,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LogoutIcon from "@mui/icons-material/Logout";
import styles from "./css/Header.module.css";
import palette from "../styles/colorPalette";
import { useDispatch, useSelector } from "react-redux";
import { useAppSelector } from "app/hooks";
import axios from "axios";
import api from "api/api";

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

  const [backgroudMode, setBackgroudMode] = React.useState(true);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );
  const [user, setUser] = React.useState("");

  const userMenu = [
    {
      name: "GitHub",
      path: `https://github.com/${user}`,
      icon: <GitHubIcon />,
    },
    { name: "Logout", path: "/prologue", icon: <LogoutIcon /> },
  ];

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const onLogin = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&scope=repo`;
  }

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

          {user ? (
            <>
              <Box sx={{ flexGrow: 0 }}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <AvatarStyled alt="Remy Sharp" src="이미지경로" />
                </IconButton>
                <Menu
                  sx={{ mt: "45px" }}
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {userMenu.map((menu, index) => (
                    <MenuItem key={index} onClick={handleCloseUserMenu}>
                      <Link href={menu.path} underline="none" color="black">
                        <Stack direction="row" spacing={1}>
                          {menu.icon}
                          <Typography textAlign="center">
                            {menu.name}
                          </Typography>
                        </Stack>
                      </Link>
                    </MenuItem>
                  ))}
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

