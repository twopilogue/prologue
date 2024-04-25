import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "features/post/Post.module.css";
import Text from "components/Text";
import { useAppDispatch } from "app/hooks";
import { resetPostIndex, resetPostList } from "slices/postSlice";
import { useAuthStore } from "stores/authStore";
import { getCategoryApi } from "apis/api/setting";

interface PostCategoryListProps {
  setCategory: Dispatch<SetStateAction<string>>;
}

const PostCategoryList = ({ setCategory }: PostCategoryListProps) => {
  const dispatch = useAppDispatch();

  const accessToken = useAuthStore((state) => state.accessToken);
  const githubId = useAuthStore((state) => state.githubId);
  const blogType = useAuthStore((state) => state.blogType);

  const [categoryList, setCategoryList] = useState<string[]>([]);
  const [select, setSelect] = useState<string>("전체보기");

  const getCategoryList = async () => {
    if (blogType == 0) {
      const category = await getCategoryApi(accessToken, githubId);
      setCategoryList(["전체보기", ...category]);
    } else {
      setCategoryList(["전체보기"]);
    }
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
        {categoryList.map((value, key) => (
          <div
            key={key}
            className={styles.categoryName}
            onClick={() => {
              dispatch(resetPostList());
              dispatch(resetPostIndex());
              setCategory(value);
              setSelect(value);
            }}
          >
            <p className={value === select ? styles.categoryNameTextClicked : styles.categoryNameTextNonClicked}>
              {value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostCategoryList;
