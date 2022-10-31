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
import palette from "./styles/colorPalette";

interface HeaderProps {
  user?: string;
  onLogin?: () => void;
  onLogout?: () => void;
}

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

function Header({ user, onLogin }: HeaderProps) {
  const [backgroudMode, setBackgroudMode] = React.useState(true);

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );

  const userMenu = [
    {
      name: "github",
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
          <IconButton sx={{ color: backgroudMode ? "black" : "white" }}>
            {backgroudMode ? (
              <LightMode onClick={() => setBackgroudMode(!backgroudMode)} />
            ) : (
              <DarkMode onClick={() => setBackgroudMode(!backgroudMode)} />
            )}
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
            <>
              <GithubButton
                startIcon={<GitHubIcon />}
                onClick={onLogin}
                sx={{
                  color: backgroudMode ? "black" : "white",
                }}
              >
                Login
              </GithubButton>
            </>
          )}
        </Stack>
      </div>
    </header>
  );
}

export default Header;
