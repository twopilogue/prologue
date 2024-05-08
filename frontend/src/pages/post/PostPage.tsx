import styles from "styles/Post.module.css";
import { useEffect, useState } from "react";
import Text from "components/Text";
import ButtonStyled from "components/Button";
import PostCategory from "features/post/PostCategory";
import PostList from "features/post/PostList";
import { useNavigate } from "react-router-dom";
import { initialState, usePostActions } from "stores/postStore";

const PostManagementPage = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("전체보기");
  const { setEditPostAction, setPostIsEditAction, resetPostListAction, resetPostIndexAction } = usePostActions();

  useEffect(() => {
    resetPostListAction();
    resetPostIndexAction();
  }, []);

  return (
    <div>
      <Text value="게시글 관리" type="groupTitle" bold />
      <br /> <br />
      <Text value="깃허브 블로그 게시글을 한 눈에 관리가 가능합니다." type="caption" color="dark_gray" />
      <div className={styles.postPageButtons}>
        {/* <ButtonStyled label="Google Analytics" color="sky" width="11vw" icon={<TrendingUpOutlinedIcon />} /> */}
        &nbsp; &nbsp;
        <ButtonStyled
          label="게시글 작성"
          width="11vw"
          onClick={() => {
            navigate("/post/write");
            setEditPostAction(initialState.editPost);
            setPostIsEditAction(false);
          }}
        />
      </div>
      <div style={{ display: "flex", marginTop: "1%" }}>
        <PostCategory setCategory={setCategory} />
        <PostList category={category} />
      </div>
    </div>
  );
};

export default PostManagementPage;
