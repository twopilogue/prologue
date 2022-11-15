import React from "react";
import styles from "features/blog/Blog.module.css";

function BlogLoding() {
  return (
    <div className={styles.background}>
      <div className={styles.loading_container}>
        <div className={styles.loading} />
        <div className={styles.loading_text}>loading</div>
      </div>
    </div>
  );
}

export default BlogLoding;
