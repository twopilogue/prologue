import React, { useEffect, useRef, useState } from "react";
import styles from "features/post/Post.module.css";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import PostListCard from "./PostListCard";
import PostListImgCard from "./PostListImgCard";
import { Stack } from "@mui/system";
import { useAppSelector } from "app/hooks";
import { postListConfig, selectPostList } from "slices/postSlice";

const PostList = () => {
  const [sort, setSort] = useState("");
  const [postCardList, setPostCardList] = useState<postListConfig[]>(useAppSelector(selectPostList));

  const postList = useAppSelector(selectPostList);

  // const scrollBox = useRef(null);
  // const [scrollY, setScrollY] = useState(0);
  // const [scrollActive, setScrollActive] = useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value);
  };

  // const logit = () => {
  //   setScrollY(scrollBox.current.scrollTop);
  //   if (scrollBox.current.scrollTop > 30) {
  //     setScrollActive(true);
  //   } else {
  //     setScrollActive(false);
  //   }
  // };

  useEffect(() => {
    console.log("postList : ", postList);
  }, []);

  // useEffect(() => {
  //   const watchScroll = () => {
  //     scrollBox.current.addEventListener("scroll", logit);
  //   };
  //   watchScroll();
  //   return () => {
  //     // scrollBox.current.removeEventListener('scroll', logit);
  //   };
  // });

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

      <div className={styles.postDataList}>
        {postCardList.map((value, key) => (
          <div key={key}>
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
      </div>

      {/* <PostListImgCard /> */}
    </div>
  );
};

export default PostList;
