import { useEffect, useState } from "react";
import styles from "features/post_before/Post.module.css";
import PostListCard from "../post_before/PostListCard";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { getPostListApi } from "apis/api/posts";
import { PostListConfig, usePostActions, usePostStore } from "stores/postStore";
import { useShallow } from "zustand/react/shallow";
import { useAuthStore } from "stores/authStore";

interface PostListProps {
  category: string;
}

const PostList = ({ category }: PostListProps) => {
  const navigate = useNavigate();
  const [accessToken, githubId] = useAuthStore(useShallow((state) => [state.accessToken, state.githubId]));
  const [postList, postIndex, postIsLast] = usePostStore(
    useShallow((state) => [state.postList, state.postIndex, state.postIsLast]),
  );
  const { setPostListAction, setPostIndexAction, setPostIsLastAction, setPostEditListAction } = usePostActions();
  const [loading, setLoading] = useState(false);

  const getPostList = async () => {
    setLoading(true);

    const res = await getPostListApi(accessToken, githubId, postIndex, category);
    const { Post: posts, index, isLast } = res;

    if (index !== -1) setPostListAction([...postList, ...posts]);
    else setPostListAction(posts);
    setPostIndexAction(index);
    setPostIsLastAction(isLast);

    setLoading(false);
  };

  const moveToPostDetail = (post: PostListConfig) => {
    const postInfo = {
      title: post.title,
      description: post.description,
      category: post.category,
      tag: post.tag,
    };
    setPostEditListAction(postInfo);
    navigate("/post/edit/" + post.directory);
  };

  useEffect(() => {
    getPostList();
  }, [category]);

  return (
    <div className={styles.postList}>
      {loading ? (
        <CircularProgress className={styles.postListLoading} sx={{ color: "gray" }} />
      ) : (
        <div className={styles.postDataList}>
          {postList.map((post, key) => (
            <div key={key} className={styles.postCards} onClick={() => moveToPostDetail(post)}>
              <PostListCard
                title={post.title}
                date={post.date}
                category={post.category}
                description={post.description}
                imgUrl={post.imgUrl}
              />
            </div>
          ))}
          {!postIsLast && (
            <div className={styles.moreListBtn} onClick={getPostList}>
              글 목록 더 보기
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostList;
