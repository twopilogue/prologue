import React from "react";
import styles from "features/post/Post.module.css";
import Text from "components/Text";
import ButtonStyled from "components/Button";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import PostCategoryList from "features/post/PostCategoryList";
import PostList from "features/post/PostList";
import { useNavigate } from "react-router-dom";

const Post = () => {
  const navigate = useNavigate();

  return (
    <div>
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
        />
        &nbsp; &nbsp;
        <ButtonStyled
          label="게시글 작성"
          width="11vw"
          onClick={() => {
            navigate("/post/write");
          }}
        />
      </div>
      <div style={{ display: "flex", marginTop: "1%" }}>
        <PostCategoryList />
        <PostList />
      </div>
    </div>
  );
};

export default Post;
