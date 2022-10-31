import React, { useState } from "react";
import styles from "features/post/Post.module.css";

const PostListPage = () => {
  const [tabButton, setTabButton] = useState("posts");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("선택 값 : ", e.target.value);
    setTabButton(e.target.value);
  };

  return (
    <div>
      <div className={styles.tabButtonGroup}>
        <div className={styles.tabButton}>
          <input
            type="radio"
            id="postTabButton"
            value="posts"
            checked={tabButton === "posts"}
            onChange={handleChange}
          />
          <label htmlFor="postTabButton">Posts</label>
        </div>
        <div className={styles.tabButton}>
          <input
            type="radio"
            id="pageTabButton"
            value="pages"
            checked={tabButton === "pages"}
            onChange={handleChange}
          />
          <label htmlFor="pageTabButton">Pages</label>
        </div>
      </div>

      <div className={styles.tabList}>
        <select name="" id="">
          <option value="">카테고리별</option>
        </select>

        <select name="" id="">
          <option value="">게시글 정렬</option>
        </select>
      </div>
    </div>
  );
};

export default PostListPage;
