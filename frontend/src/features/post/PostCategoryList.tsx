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
        스터디 <hr />
        개발 <hr />
        기타 <hr />
      </div>
    </div>
  );
};

export default PostCategoryList;
