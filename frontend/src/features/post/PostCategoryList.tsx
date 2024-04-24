import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "features/post/Post.module.css";
import Text from "components/Text";
import { useSelector } from "react-redux";
import { rootState } from "app/store";
import Axios from "apis/JsonAxios";
import api from "apis/BaseUrl";
import { useAppDispatch } from "app/hooks";
import { resetPostIndex, resetPostList } from "slices/postSlice";

interface PostCategoryListProps {
  setCategory: Dispatch<SetStateAction<string>>;
}

const PostCategoryList = ({ setCategory }: PostCategoryListProps) => {
  const dispatch = useAppDispatch();

  const { accessToken, githubId, blogType } = useSelector((state: rootState) => state.auth);

  const [categoryList, setCategoryList] = useState([]);
  const [select, setSelect] = useState<string>("전체보기");

  const getCategoryList = () => {
    if (blogType == 0) {
      Axios.get(api.setting.getCategory(accessToken, githubId)).then((res) => {
        setCategoryList(["전체보기", ...res.data.category]);
      });
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
