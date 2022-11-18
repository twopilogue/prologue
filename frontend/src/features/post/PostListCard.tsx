import React, { useState } from "react";
import styles from "features/post/Post.module.css";
import Text from "components/Text";

interface PostListCardProps {
  title: string;
  date: string;
  tag: [];
  category: string;
  description: string;
  imgUrl: string;
}

const PostListCard = ({ title, date, tag, category, description, imgUrl }: PostListCardProps) => {
  const [tagList, setTagList] = useState<[]>(tag);

  return (
    <div className={styles.postListCard}>
      <div className={styles.postCardTextBox}>
        <div className={styles.postTitle}>
          <Text value={title} type="groupTitle" bold />
        </div>
        <div className={styles.postDate}>
          <Text value={date} type="caption" />
        </div>
        <br />

        <div className={styles.postTag}>
          {/* {tagList.map((value, key) => (
          <div key={key}>
            <Text value={`#${value}`} type="caption" /> &nbsp;
          </div>
        ))} */}
        </div>
        <div className={styles.postCategory}>
          <Text value={category} type="caption" />
        </div>
        <br />

        <div className={styles.postText}>
          <Text value={description} type="text" />
        </div>
      </div>

      <div>
        <img
          src={imgUrl}
          alt=""
          className={styles.postCardImg}
          onError={(event: any) => (event.target.style.display = "none")}
        />
      </div>
    </div>
  );
};

export default PostListCard;
