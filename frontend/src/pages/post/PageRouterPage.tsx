import { Route, Routes } from "react-router-dom";
import styles from "styles/Post.module.css";
import PageEditPage from "../NotUsed/PageEditPage";

const PageRouterPage = () => {
  return (
    <div className={styles.postRouterPage}>
      <Routes>
        <Route path="/edit/:pageName" element={<PageEditPage />} />
      </Routes>
    </div>
  );
};

export default PageRouterPage;
