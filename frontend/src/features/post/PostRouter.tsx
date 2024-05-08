import { Route, Routes } from "react-router-dom";
import styles from "styles/Post.module.css";
import PostManagementPage from "pages/post/PostPage";
import PostWritePage from "pages/post/PostWritePage";

const PostRouterPage = () => {
  return (
    <div className={styles.postRouterPage}>
      <Routes>
        <Route path="/" element={<PostManagementPage />} />
        <Route path="/write" element={<PostWritePage />} />
        <Route path="/edit/:directory" element={<PostWritePage />} />
      </Routes>
    </div>
  );
};

export default PostRouterPage;
