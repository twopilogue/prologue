import { useEffect, useState } from "react";
import styles from "styles/Post.module.css";
import PostListCard from "./PostListCard";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { getPostDetailApi, getPostListApi } from "apis/api/posts";
import { usePostActions, usePostStore } from "stores/postStore";
import { useAuthStore } from "stores/authStore";
import { useShallow } from "zustand/react/shallow";
import { PostListConfig } from "interfaces/post.interface";

interface PostListProps {
  category: string;
}

const PostList = ({ category }: PostListProps) => {
  const navigate = useNavigate();
  const [accessToken, githubId] = useAuthStore(useShallow((state) => [state.accessToken, state.githubId]));
  const [postList, postIndex, postIsLast] = usePostStore(
    useShallow((state) => [state.postList, state.postIndex, state.postIsLast]),
  );
  const { setEditPostAction, setPostListAction, setPostIndexAction, setPostIsLastAction, setPostIsEditAction } =
    usePostActions();
  const [loading, setLoading] = useState(false);

  const getPostList = async () => {
    setLoading(true);

    const res = await getPostListApi(accessToken, githubId, postIndex, category);
    const { Post: posts, index, isLast } = res;

    // 글 불러오는 기능 추후 추가
    // if (index !== -1) setPostListAction([...postList, posts]);
    setPostListAction(posts);
    setPostIndexAction(index);
    setPostIsLastAction(isLast);

    setLoading(false);
  };

  const moveToPostDetail = async (post: PostListConfig) => {
    const res = await getPostDetailApi(accessToken, githubId, post.directory);
    const { content, images } = res;
    const postInfo = {
      title: post.title,
      description: post.description,
      category: post.category,
      tagList: post.tag,
      content,
      images,
    };
    setEditPostAction(postInfo);
    setPostIsEditAction(true);
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
