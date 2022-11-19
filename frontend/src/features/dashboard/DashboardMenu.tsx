import React from "react";
import styles from "features/dashboard/Dashboard.module.css";
import { Container, Stack } from "@mui/system";
import { Avatar, Link } from "@mui/material";

function DashboardMenu() {
  return (
    <div className={styles.container}>
      <Container disableGutters>
        <Stack spacing={2}>
          <div className={`${styles.flexColumn} ${styles.menuBox}`}>
            <Link href="/post/write" underline="none" color="inherit">
              <Stack justifyContent="center" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: "white", width: "60px", height: "60px" }}>💬</Avatar>
                <div className={styles.menuText}>새 글 작성하기</div>
              </Stack>
            </Link>
          </div>
          <div className={`${styles.flexColumn} ${styles.menuBox}`}>
            <Link href="/post" underline="none" color="inherit">
              <Stack justifyContent="center" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: "white", width: "60px", height: "60px" }}>📄</Avatar>
                <div className={styles.menuText}>게시글 관리</div>
              </Stack>
            </Link>
          </div>
        </Stack>
      </Container>
    </div>
  );
}

export default DashboardMenu;
