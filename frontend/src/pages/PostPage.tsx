import React, { useState } from "react";
import styles from "features/post/Post.module.css";
import Text from "components/Text";
import ButtonStyled from "components/Button";
import PostCategoryList from "features/post/PostCategoryList";
import PostList from "features/post/PostList";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";

const PostListPage = () => {
  const [tabButton, setTabButton] = useState("posts");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("선택 값 : ", e.target.value);
    setTabButton(e.target.value);
  };

  return (
    <div className={styles.postPage}>
      <Text value="게시글 관리" type="groupTitle" bold />
      <br /> <br />
      <Text
        value="깃허브 블로그 게시글을 한 눈에 관리가 가능합니다."
        type="caption"
        color="gray"
      />
      <div className={styles.postPageButtons}>
        <ButtonStyled
          label="Google Analytics"
          color="sky"
          width="11vw"
          icon={<TrendingUpOutlinedIcon />}
        />{" "}
        &nbsp; &nbsp;
        <ButtonStyled label="게시글 작성" width="11vw" />
      </div>
      <div style={{ display: "flex", marginTop: "1%" }}>
        <PostCategoryList />
        <PostList />
      </div>
    </div>
  );
};

export default PostListPage;
