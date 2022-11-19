import React, { useEffect, useState } from "react";
import styles from "features/post/Post.module.css";
import Text from "components/Text";
import ButtonStyled from "components/Button";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import PostCategoryList from "features/post/PostCategoryList";
import PostList from "features/post/PostList";
import { useNavigate } from "react-router-dom";
import Axios from "api/JsonAxios";
import api from "api/Api";
import { postListConfig, selectPostList, setPostCount, setPostList } from "slices/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "app/store";
import { useAppSelector } from "app/hooks";

const PostManagementPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { accessToken, githubId } = useSelector((state: rootState) => state.auth);

  const getPostList = async () => {
    const tmpList: postListConfig[] = [];

    await Axios.get(api.posts.getPostList(accessToken, githubId, 0))
      .then((res: any) => {
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
        dispatch(setPostList(tmpList));
        dispatch(setPostCount(res.data.result.PostCount));
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPostList();
  }, []);

  return (
    <div>
      <Text value="게시글 관리" type="groupTitle" bold />
      <br /> <br />
      <Text value="깃허브 블로그 게시글을 한 눈에 관리가 가능합니다." type="caption" color="dark_gray" />
      <div className={styles.postPageButtons}>
        {/* <ButtonStyled label="Google Analytics" color="sky" width="11vw" icon={<TrendingUpOutlinedIcon />} /> */}
        &nbsp; &nbsp;
        <ButtonStyled
          label="게시글 작성"
          width="11vw"
          onClick={() => {
            navigate("/post/write");
          }}
        />
      </div>
      <div style={{ display: "flex", marginTop: "1%" }}>
        <PostCategoryList />
        <PostList />
      </div>
    </div>
  );
};

export default PostManagementPage;
