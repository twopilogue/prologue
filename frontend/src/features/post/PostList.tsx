import { useEffect, useState } from "react";
import styles from "features/post_before/Post.module.css";
import PostListCard from "../post_before/PostListCard";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { rootState } from "app/store";
import { CircularProgress } from "@mui/material";
import { getPostListApi } from "apis/api/posts";

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
    const res = await getPostListApi(accessToken, githubId, postIndex, category);
    const { Post: posts, index, isLast } = res;

    if (index !== -1) setPostListAction([...postList, ...posts]);
    else setPostListAction(posts);
    setPostIndexAction(index);
    setPostIsLastAction(isLast);

    setLoading(false);
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
          {postList.map((value, key) => (
            <div
              key={key}
              className={styles.postCards}
              onClick={() => {
                const tmp = {
                  title: value.title,
                  description: value.description,
                  category: value.category,
                  tag: value.tag,
                };
                dispatch(setPostEditList(tmp));
                navigate("/post/edit/" + value.directory);
              }}
            >
              <PostListCard
                title={value.title}
                date={value.date}
                category={value.category}
                description={value.description}
                imgUrl={value.imgUrl}
              />
            </div>
          ))}
          {!postIsLast && (
            <div
              className={styles.moreListBtn}
              onClick={() => {
                getPostList();
              }}
            >
              글 목록 더 보기
            </div>
          )}
        </div>
      )}

      {/* <PostListImgCard /> */}
    </div>
  );
};

export default PostList;
