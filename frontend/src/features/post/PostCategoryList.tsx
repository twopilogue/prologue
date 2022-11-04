import React from "react";
import styles from "features/post/Post.module.css";
import Text from "components/Text";

const PostCategoryList = () => {
  return (
    <div className={styles.postCategoryList}>
      <div className={styles.textCategories}>
        <Text value="Categories" type="groupTitle" bold />
      </div>

      <div className={styles.myCategoryList}>
        <div className={styles.categoryName}>
          <Text value="스터디" type="text" color="gray" /> <hr />
        </div>
        <div className={styles.categoryName}>
          <Text value="개발" type="text" color="gray" /> <hr />
        </div>
        <div className={styles.categoryName}>
          <Text value="기타" type="text" color="gray" /> <hr />
        </div>
      </div>
    </div>
  );
};

export default PostCategoryList;
