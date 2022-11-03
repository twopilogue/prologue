import React, { useState } from "react";
import styles from "features/post/Post.module.css";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import PostListCard from "./PostListCard";
import PostListImgCard from "./PostListImgCard";

const PostList = () => {
  const [sort, setSort] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value);
  };

  return (
    <div className={styles.postList}>
      <Select
        value={sort}
        onChange={handleChange}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
      >
        <MenuItem value="">게시글 정렬</MenuItem>
        <MenuItem value={10}>최신순</MenuItem>
        <MenuItem value={20}>가나다순</MenuItem>
      </Select>
      <FormatAlignLeftIcon />
      <GridViewOutlinedIcon />

      <PostListCard />

      {/* <PostListImgCard /> */}
    </div>
  );
};

export default PostList;
