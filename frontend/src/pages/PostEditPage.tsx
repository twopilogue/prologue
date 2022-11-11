import React from "react";
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

const PostEditPage = ({ match }:string) => {
  const { accessToken, githubId } = useSelector((state: rootState) => state.auth);
  const  directory  = { match.params.directory };

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
        <PostWriteContents />
      </div>
    </div>
  );
};

export default PostEditPage;
