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
import { postListConfig, selectPostList, setPostCount, setPostEditList, setPostList } from "slices/postSlice";
import { useNavigate } from "react-router-dom";
import Axios from "api/JsonAxios";
import { useSelector } from "react-redux";
import api from "api/Api";
import { rootState } from "app/store";

const PostList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [sort, setSort] = useState("");
  const [postCardList, setPostCardList] = useState<postListConfig[]>(useAppSelector(selectPostList));
  const [list, setList] = useState([]);

  const postList = useAppSelector(selectPostList);

  const { accessToken, githubId } = useSelector((state: rootState) => state.auth);

  const scrollBox = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [scrollActive, setScrollActive] = useState(false);

  let numberOfPages = 0;
  let currentPage = 0;

  const getPostList = async (page: number) => {
    const tmpList: postListConfig[] = [];

    // let numberOfPages = 0;
    // let currentPage = 0;

    await Axios.get(api.posts.getPostList(accessToken, githubId, page))
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
          console.log("저장할라 하는 post", post);
          console.log("tmpList : ", tmpList);
        }

        if (res.data.result.PostCount % 6 == 0) {
          numberOfPages = Math.floor(res.data.result.PostCount / 6);
        } else if (Math.floor(res.data.result.PostCount / 6) == 0) {
          numberOfPages = 0;
        } else {
          numberOfPages = Math.floor(res.data.result.PostCount / 6) + 1;
        }
        dispatch(setPostList([...tmpList]));
        dispatch(setPostCount(res.data.result.PostCount));

        // handleScroll();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value);
  };

  const logit = () => {
    setScrollY(scrollBox.current.scrollTop);
    if (scrollBox.current.scrollTop > 30) {
      setScrollActive(true);
      // handleScroll();
    } else {
      setScrollActive(false);
    }

    if (scrollBox.current.scrollTop + scrollBox.current.innerHeight >= document.body.offsetHeight) {
      handleScroll();
    }
  };

  const handleScroll = () => {
    if (numberOfPages > currentPage) {
      console.log("페이지 끝");
      console.log("numberOfPages : ", numberOfPages);
      console.log("currentPage : ", currentPage);
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        console.log("스크롤 하단");
        // setTimeout(() => {
        currentPage += 1;
        getPostList(currentPage);
        // }, 100);
      }
    }
  };

  useEffect(() => {
    getPostList(0);
    console.log("1페이지");
    console.log("list : ", list);
    // getPostList(1);
  }, []);

  // useEffect(() => {
  //   console.log("postList : ", postList);
  // }, []);

  useEffect(() => {
    scrollBox.current;
  });

  useEffect(() => {
    const watchScroll = () => {
      scrollBox.current.addEventListener("scroll", logit);
    };
    watchScroll();
    return () => {
      scrollBox.current.removeEventListener("scroll", logit);
    };
  });

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

      <div className={styles.postDataList} ref={scrollBox}>
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
      </div>

      {/* <PostListImgCard /> */}
    </div>
  );
};

export default PostList;
