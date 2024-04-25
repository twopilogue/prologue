import { useEffect, useState } from "react";
import styles from "features/post/Post.module.css";
import PostListCard from "./PostListCard";
import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  selectPostIndex,
  selectPostIsLast,
  selectPostList,
  setPostEditList,
  setPostIndex,
  setPostIsLast,
  setPostList,
} from "slices/postSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { rootState } from "app/store";
import { CircularProgress } from "@mui/material";
import { getPostListApi } from "apis/api/posts";

interface PostListProps {
  category: string;
}

const PostList = ({ category }: PostListProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const postList = useAppSelector(selectPostList);
  const postIndex = useAppSelector(selectPostIndex);
  const postIsLast = useAppSelector(selectPostIsLast);

  const { accessToken, githubId } = useSelector((state: rootState) => state.auth);

  const [loading, setLoading] = useState(false);

  const getPostList = async () => {
    const res = await getPostListApi(accessToken, githubId, postIndex, category);
    const { Post: posts, index, isLast } = res;

    setLoading(true);
    if (index !== -1) {
      dispatch(setPostList([...postList, ...posts]));
    } else {
      dispatch(setPostList(posts));
    }
    dispatch(setPostIndex(index));
    dispatch(setPostIsLast(isLast));
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
