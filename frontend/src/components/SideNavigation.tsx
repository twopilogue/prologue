import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Stack } from "@mui/material";
import styles from "./css/SideNavigation.module.css";
import DashboardIcon from "@mui/icons-material/DashboardOutlined";
import EditIcon from "@mui/icons-material/EditOutlined";
import SettingsIcon from '@mui/icons-material/SettingsOutlined';

function SideNavigation() {
  // URL의 path값을 받아올 수 있다.
  const pathName = useLocation().pathname;

  const menus = [
    { name: "대시보드", path: "/sample" },
    { name: "게시글 관리", path: "/post" },
  ];

  return (
    <div className={styles.background}>
        <div className={styles.Menu}>
          {menus.map((menu, index) => {
            return (
              <NavLink to={menu.path} key={index} className={styles.NavLink}>
                {pathName === menu.path ? (
                  <div className={`${styles.navButton} ${styles.navActive}`}>
                    <Stack direction="row" spacing={2}>
                      <DashboardIcon />
                      <span>{menu.name}</span>
                    </Stack>
                  </div>
                ) : (
                  <div className={styles.navButton}>
                    <Stack direction="row" spacing={2}>
                      <EditIcon />
                      <span>{menu.name}</span>
                    </Stack>
                  </div>
                )}
              </NavLink>
            );
          })}
      </div>
      <div className={styles.setting}>
        <SettingsIcon />
      </div>
    </div>
  );
}

export default SideNavigation;
