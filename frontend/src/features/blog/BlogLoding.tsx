import React from "react";
import styles from "features/blog/Blog.module.css";

function BlogLoding() {
  return (
    <div className={styles.background}>
      <div className={styles.loading_container}>
        <div className={styles.loading} />
        <div className={styles.loading_text}>
          <span>l</span>
          <span>o</span>
          <span>a</span>
          <span>d</span>
          <span>i</span>
          <span>n</span>
          <span>g</span>
        </div>
      </div>
    </div>
  );
}

export default BlogLoding;
