import React from "react";
import { Route, Routes } from "react-router-dom";
import styles from "features/post/Post.module.css";
import PostManagementPage from "pages/PostManagementPage";
import PostWritePage from "pages/PostWritePage";
import PostEditPage from "./PostEditPage";

const PostRouterPage = () => {
  return (
    <div className={styles.postRouterPage}>
      <Routes>
        <Route path="/" element={<PostManagementPage />}></Route>
        <Route path="/write" element={<PostWritePage />}></Route>
        <Route path="/edit/:directory" element={<PostEditPage />}></Route>
      </Routes>
    </div>
  );
};

export default PostRouterPage;
