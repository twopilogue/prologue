import React from "react";
import styles from "features/post/Post.module.css";
import Text from "components/Text";

interface PostListCardProps {
  title: string;
  date: string;
  tag: [];
  category: string;
  content: string;
}

const PostListCard = ({ title, date, tag, category, content }: PostListCardProps) => {
  return (
    <div className={styles.postListCard}>
      <div className={styles.postTitle}>
        <Text value={title} type="groupTitle" bold />
      </div>
      <div className={styles.postDate}>
        <Text value={date} type="caption" />
      </div>
      <br />

      <div className={styles.postTag}>
        {tag.map((value, key) => (
          <div key={key}>
            <Text value={`#${value}`} type="caption" /> &nbsp;
          </div>
        ))}
      </div>
      <div className={styles.postCategory}>
        <Text value={category} type="caption" />
      </div>
      <br />

      <div className={styles.postText}>
        <Text value={content} type="text" />
      </div>

      <div className={styles.postCardImg}></div>
    </div>
  );
};

export default PostListCard;
