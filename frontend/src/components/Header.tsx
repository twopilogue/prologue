import { MouseEvent, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Avatar, Box, Menu, MenuItem, Stack, Link, ButtonBase } from "@mui/material";
import { GitHub, Logout, KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import Text from "./Text";
import Logo from "assets/Logo.svg";
import styles from "./css/Header.module.css";
import palette from "styles/colorPalette";
import { authLogin } from "apis/api/auth";
import { useAuthActions, useAuthStore } from "stores/authStore";
import { useShallow } from "zustand/react/shallow";

const GithubButton = styled(ButtonBase)(() => ({
  margin: 3,
  height: "30px",
  color: "black",
  backgroundColor: "transparent",
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
  const navigate = useNavigate();
  const location = useLocation();

  const [isLogin, hasAuthFile, githubId, githubImage] = useAuthStore(
    useShallow((state) => [state.isLogin, state.hasAuthFile, state.githubId, state.githubImage]),
  );
  const { setLogoutAction } = useAuthActions();

  const [menuOpen, setMenuOpen] = useState(false);

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
    setMenuOpen(true);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    setMenuOpen(false);
  };

  const onLogin = async () => await authLogin();

  const onLogout = () => {
    handleCloseUserMenu();
    setLogoutAction();
    navigate("/");
  };

  return (
    <header>
      <div
        className={styles.wrapper}
        style={{
          backgroundColor: ["/dashboard", "/login", "/"].includes(location.pathname) && "rgba( 255, 255, 255, 0.2 )",
        }}
      >
        <Stack direction="row" spacing={6} alignItems="center">
          <NavLink to="/" className={styles.link}>
            <img width="32" height="32" src={Logo} />
            <h1>Prologue</h1>
          </NavLink>
          {isLogin && hasAuthFile && (
            <Stack direction="row" spacing={3}>
              <NavLink to="/dashboard" className={styles.link}>
                대시보드
              </NavLink>
              <NavLink to="/post" className={styles.link}>
                게시글 관리
              </NavLink>
              <NavLink to="/setting" className={styles.link}>
                블로그 설정
              </NavLink>
            </Stack>
          )}
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center">
          {isLogin ? (
            <>
              <Box sx={{ flexGrow: 0 }}>
                <ButtonBase onClick={handleOpenUserMenu} disableRipple>
                  <AvatarStyled src={githubImage} />
                  {menuOpen ? <KeyboardArrowUp fontSize="small" /> : <KeyboardArrowDown fontSize="small" />}
                </ButtonBase>
                <Menu
                  sx={{
                    cursor: "pointer",
                    "& .MuiList-root": {
                      pt: 0,
                      pb: 0,
                    },
                  }}
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
                      mt: 1.0,
                      ml: 0.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 10,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%)  rotate(45deg)",
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
                        <GitHub fontSize="small" />
                        <Text value="GitHub" type="caption" />
                      </Stack>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={onLogout}>
                    <Stack direction="row" spacing={1}>
                      <Logout fontSize="small" />
                      <Text value="Logout" type="caption" />
                    </Stack>
                  </MenuItem>
                </Menu>
              </Box>
            </>
          ) : (
            <GithubButton onClick={onLogin}>
              <Stack direction="row" spacing={1} alignItems="center">
                <GitHub fontSize="small" />
                <Text value="Login" type="text" />
              </Stack>
            </GithubButton>
          )}
        </Stack>
      </div>
    </header>
  );
}

export default Header;
