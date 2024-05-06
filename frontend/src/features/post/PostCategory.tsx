import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "features/post_before/Post.module.css";
import Text from "components/Text";
import { useAuthStore } from "stores/authStore";
import { getCategoryApi } from "apis/api/setting";
import { useShallow } from "zustand/react/shallow";
import { usePostActions } from "stores/postStore";
import { CircularProgress } from "@mui/material";

interface PostCategoryListProps {
  setCategory: Dispatch<SetStateAction<string>>;
}

const PostCategoryList = ({ setCategory }: PostCategoryListProps) => {
  const [accessToken, githubId, blogType] = useAuthStore(
    useShallow((state) => [state.accessToken, state.githubId, state.blogType]),
  );
  const { resetPostListAction, resetPostIndexAction } = usePostActions();

  const [categoryList, setCategoryList] = useState<string[]>([]);
  const [select, setSelect] = useState<string>("전체보기");
  const [loading, setLoading] = useState(false);

  const getCategoryList = async () => {
    setLoading(true);
    if (blogType == 0) {
      const category = await getCategoryApi(accessToken, githubId);
      setCategoryList(["전체보기", ...category]);
    } else {
      setCategoryList(["전체보기"]);
    }
    setLoading(false);
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  return (
    <div className={styles.postCategoryList}>
      <div className={styles.textCategories}>
        <Text value="Categories" type="groupTitle" bold />
      </div>
      <div className={styles.myCategoryList}>
        {loading ? (
          <CircularProgress className={styles.postListLoading} sx={{ color: "gray" }} />
        ) : (
          <>
            {categoryList.map((category, key) => (
              <div
                key={key}
                className={styles.categoryName}
                onClick={() => {
                  resetPostListAction();
                  resetPostIndexAction();
                  setCategory(category);
                  setSelect(category);
                }}
              >
                <p className={category === select ? styles.categoryNameTextClicked : styles.categoryNameTextNonClicked}>
                  {category}
                </p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default PostCategoryList;
