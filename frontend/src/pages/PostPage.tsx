import React, { useState } from "react";
import styles from "features/post/Post.module.css";
import Post from "features/post/Post";
import { Route, Routes } from "react-router-dom";
import PostWrite from "features/post/PostWrite";

const PostListPage = () => {
  const [tabButton, setTabButton] = useState("posts");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("선택 값 : ", e.target.value);
    setTabButton(e.target.value);
  };

  return (
    <div className={styles.postPage}>
      <Routes>
        <Route path="/" element={<Post />}></Route>
        <Route path="/write" element={<PostWrite />}></Route>
      </Routes>
    </div>
  );
};

export default PostListPage;
