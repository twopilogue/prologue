import React from "react";
import styles from "features/post/PostWrite.module.css";
import Text from "components/Text";
import Button from "components/Button";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

const PostEditPage = () => {
  return (
    <div>
      <div className={styles.textBox}>
        <Text value="게시글 수정" type="groupTitle" bold />
        <br /> <br />
        <Text value="간편하게 깃허브 블로그 게시글을 수정해보세요." type="caption" color="dark_gray" />
        <div className={styles.postWriteButtons}>
          <Button label="돌아가기" color="sky" width="10vw" icon={<RefreshOutlinedIcon />} />
          &nbsp; &nbsp; &nbsp;
          <Button label="작성완료" width="10vw" icon={<CheckOutlinedIcon />} />
        </div>
      </div>
    </div>
  );
};

export default PostEditPage;
