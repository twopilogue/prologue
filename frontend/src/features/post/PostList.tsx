import React, { useEffect, useState } from "react";
import styles from "features/post/Post.module.css";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import PostListCard from "./PostListCard";
import PostListImgCard from "./PostListImgCard";
import { Stack } from "@mui/system";
import { useAppSelector } from "app/hooks";
import { selectPostList } from "slices/postSlice";

const PostList = () => {
  const [sort, setSort] = useState("");
  const [postCardList, setPostCardList] = useState([]);

  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value);
  };

  // useEffect(() => {
  //   setPostCardList(useAppSelector(selectPostList));
  // }, []);

  return (
    <div className={styles.postList}>
      <div className={styles.postSettings}>
        <Stack direction="row" spacing={2}>
          <Select value={sort} onChange={handleChange} displayEmpty inputProps={{ "aria-label": "Without label" }}>
            <MenuItem value="">게시글 정렬</MenuItem>
            <MenuItem value={"최신순"}>최신순</MenuItem>
            <MenuItem value={"가나다순"}>가나다순</MenuItem>
          </Select>

          <FormatAlignLeftIcon />
          <GridViewOutlinedIcon />
        </Stack>
      </div>
      {postCardList.map((value, key) => (
        <div key={key}>
          <PostListCard />
        </div>
      ))}

      {/* <PostListImgCard /> */}
    </div>
  );
};

export default PostList;
