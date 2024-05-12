import styles from "styles/Post.module.css";
import { useEffect, useState } from "react";
import Text from "components/Text";
import Button from "components/Button";
import PostCategory from "features/post/PostCategory";
import PostList from "features/post/PostList";
import { useNavigate } from "react-router-dom";
import { initialState, usePostActions } from "stores/postStore";

const PostPage = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("전체보기");
  const { setEditPostAction, setPostIsEditAction, resetPostListAction, resetPostIndexAction } = usePostActions();

  useEffect(() => {
    resetPostListAction();
    resetPostIndexAction();
  }, []);

  return (
    <div className={styles.postListContainer}>
      <div className={styles.postListTitle} style={{ padding: "0 0 1em 0" }}>
        <div>
          <Text value="게시글 관리" type="groupTitle" bold />
          <Text value="깃허브 블로그 게시글을 한 눈에 관리가 가능합니다." type="caption" color="dark_gray" />
        </div>
        <div>
          <Button
            label="게시글 작성"
            onClick={() => {
              navigate("/post/write");
              setEditPostAction(initialState.editPost);
              setPostIsEditAction(false);
            }}
          />
        </div>
      </div>
      <div className={styles.postListContents}>
        <PostCategory setCategory={setCategory} />
        <PostList category={category} />
      </div>
    </div>
  );
};

export default PostPage;
