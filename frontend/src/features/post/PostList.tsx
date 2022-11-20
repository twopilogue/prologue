import React, { useEffect, useRef, useState } from "react";
import styles from "features/post/Post.module.css";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import PostListCard from "./PostListCard";
import PostListImgCard from "./PostListImgCard";
import { Stack } from "@mui/system";
import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  postListConfig,
  selectPostIndex,
  selectPostIsLast,
  selectPostList,
  setPostEditList,
  setPostIndex,
  setPostIsLast,
  setPostList,
} from "slices/postSlice";
import { useNavigate } from "react-router-dom";
import Axios from "api/JsonAxios";
import { useSelector } from "react-redux";
import api from "api/Api";
import { rootState } from "app/store";

interface PostListProps {
  category: string;
}

const PostList = ({ category }: PostListProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [sort, setSort] = useState("");
  const [itemCnt, setItemCnt] = useState(6);

  const postList = useAppSelector(selectPostList);
  const postIndex = useAppSelector(selectPostIndex);
  const postIsLast = useAppSelector(selectPostIsLast);

  const { accessToken, githubId } = useSelector((state: rootState) => state.auth);

  const getPostList = async () => {
    const tmpList: postListConfig[] = [];

    await Axios.get(api.posts.getPostList(accessToken, githubId, postIndex, category))
      .then((res) => {
        console.log(res);

        for (let i = 0; i < res.data.result.Post.length; i++) {
          const post: postListConfig = {
            title: res.data.result.Post[i].title,
            date: res.data.result.Post[i].date,
            description: res.data.result.Post[i].description,
            category: res.data.result.Post[i].category,
            tag: res.data.result.Post[i].tag,
            directory: res.data.result.Post[i].directory,
            imgUrl: res.data.result.Post[i].imgUrl,
          };
          tmpList.push(post);
        }
        dispatch(setPostList([...postList, ...tmpList]));
        dispatch(setPostIndex(res.data.result.index));
        dispatch(setPostIsLast(res.data.result.isLast));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log(category);
    getPostList();
  }, [category]);

  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value);
  };

  return (
    <div className={styles.postList}>
      <div className={styles.postSettings}>
        <Stack direction="row" spacing={2}>
          <Select value={sort} onChange={handleChange} displayEmpty inputProps={{ "aria-label": "Without label" }}>
            <MenuItem value="">게시글 정렬</MenuItem>
            <MenuItem value={"최신순"}>최신순</MenuItem>
            <MenuItem value={"오래된순"}>오래된순</MenuItem>
          </Select>

          <FormatAlignLeftIcon />
          <GridViewOutlinedIcon />
        </Stack>
      </div>

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
              tag={value.tag}
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
              // getPostList(currentPage);
              setItemCnt(itemCnt + 6);
              getPostList();
              console.log(category);
              console.log("postList : ", postList);
              // console.log("page : ", currentPage);
            }}
          >
            글 목록 더 보기
          </div>
        )}
      </div>

      {/* <PostListImgCard /> */}
    </div>
  );
};

export default PostList;
