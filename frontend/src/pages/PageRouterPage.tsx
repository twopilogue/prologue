import React from "react";
import { Route, Routes } from "react-router-dom";
import styles from "features/post/Post.module.css";
import PageEditPage from "./PageEditPage";
import PageWritePage from "./PageWritePage";

const PageRouterPage = () => {
  return (
    <div className={styles.postRouterPage}>
      <Routes>
        <Route path="/write" element={<PageWritePage />}></Route>
        <Route path="/edit" element={<PageEditPage />} />
      </Routes>
    </div>
  );
};

export default PageRouterPage;
