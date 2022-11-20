import React from "react";
import { Route, Routes } from "react-router-dom";
import styles from "features/post/Post.module.css";
import PageEditPage from "./PageEditPage";

const PageRouterPage = () => {
  return (
    <div className={styles.postRouterPage}>
      <Routes>
        <Route path="/edit/:pageName" element={<PageEditPage />} />
      </Routes>
    </div>
  );
};

export default PageRouterPage;
