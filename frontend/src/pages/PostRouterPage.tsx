import { Route, Routes } from "react-router-dom";
import styles from "features/post_before/Post.module.css";
import PostManagementPage from "pages/PostPage";
import PostWritePage from "pages/PostWritePage";
import PostEditPage from "./PostEditPage";

const PostRouterPage = () => {
  return (
    <div className={styles.postRouterPage}>
      <Routes>
        <Route path="/" element={<PostManagementPage />} />
        <Route path="/write" element={<PostWritePage />} />
        <Route path="/edit/:directory" element={<PostEditPage />} />
      </Routes>
    </div>
  );
};

export default PostRouterPage;
