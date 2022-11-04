import React from "react";
import styles from "features/post/Post.module.css";
import Text from "components/Text";

const PostListCard = () => {
  return (
    <div className={styles.postListCard}>
      <div className={styles.postTitle}>
        <Text value="블로그 제목" type="groupTitle" bold />
      </div>
      <div className={styles.postDate}>
        <Text value="날짜" type="caption" />
      </div>
      <br />

      <div className={styles.postTag}>
        <Text value="#태그" type="caption" />
      </div>
      <div className={styles.postCategory}>
        <Text value="카테고리" type="caption" />
      </div>
      <br />

      <div className={styles.postText}>
        <Text value="텍스트" type="text" />
      </div>

      <div className={styles.postCardImg}></div>
    </div>
  );
};

export default PostListCard;
