import React, { useEffect, useState } from "react";
import styles from "features/post/PostWrite.module.css";
import Text from "components/Text";
import Button from "components/Button";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import PostWriteTitle from "../features/post/PostWriteTitle";
import PostWriteContents from "../features/post/PostWriteContents";
import { useSelector } from "react-redux";
import { rootState } from "app/store";
import { useParams } from "react-router-dom";
import Axios from "api/MultipartAxios";
import api from "api/Api";
import PostViewerContents from "features/post/PostViewerContents";

const PostEditPage = () => {
  const { accessToken, githubId } = useSelector((state: rootState) => state.auth);
  const { directory } = useParams();

  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const getPostDetail = async () => {
    await Axios.get(api.posts.getPostDetail(accessToken, githubId, directory))
      .then((res) => {
        console.log(res);
        setContent(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setLoading(true);
    getPostDetail();
    setLoading(false);
  }, [loading]);

  return (
    <div className={styles.postWrite}>
      <div className={styles.textBox}>
        <Text value="게시글 수정" type="groupTitle" bold />
        <br /> <br />
        <Text value="간편하게 깃허브 블로그 게시글을 수정해보세요." type="caption" color="dark_gray" />
        <div className={styles.postWriteButtons}>
          <Button label="돌아가기" color="sky" width="10vw" icon={<RefreshOutlinedIcon />} />
          &nbsp; &nbsp; &nbsp;
          <Button label="작성완료" width="10vw" icon={<CheckOutlinedIcon />} />
        </div>
        <div className={styles.postDeleteButton}>
          <Button label="삭제하기" width="10vw" icon={<CloseOutlinedIcon />} />
        </div>
      </div>

      <div style={{ display: "flex", marginTop: "1%" }}>
        <PostWriteTitle />
        <PostViewerContents content={content} />
      </div>
    </div>
  );
};

export default PostEditPage;
