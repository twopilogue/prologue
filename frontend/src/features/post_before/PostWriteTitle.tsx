import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import styles from "features/post_before/PostWrite.module.css";
import Text from "components/Text";
import Input from "components/Input";
import Tag from "components/Tag";
import { useAppDispatch } from "app/hooks";
import { setPostCategory, setPostDescription, setPostTagList } from "slices/postSlice";
import { getCategoryApi } from "apis/api/setting";
import { usePostActions } from "stores/postStore";
import { useAuthStore } from "stores/authStore";
import { useShallow } from "zustand/react/shallow";

interface PostWriteTitleProps {
  savedTitle: string;
  savedDescription: string;
  savedCategory: string;
  savedTag: string[];
}

const PostWriteTitle = ({ savedTitle, savedDescription, savedCategory, savedTag }: PostWriteTitleProps) => {
  const dispatch = useAppDispatch();
  const [accessToken, githubId, blogType] = useAuthStore(
    useShallow((state) => [state.accessToken, state.githubId, state.blogType]),
  );
  const { setPostTitleAction } = usePostActions();
  const [title, setTitle] = useState(savedTitle);
  const [description, setDescription] = useState(savedDescription);
  const [category, setCategory] = useState(savedCategory);
  const [categoryList, setCategoryList] = useState([]);
  const [tag, setTag] = useState("");
  const [tagList, setTagList] = useState(savedTag);

  // const { accessToken, githubId, blogType } = useSelector((state: rootState) => state.auth);

  const descriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
    dispatch(setPostDescription(event.target.value));
  };

  const categoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
    dispatch(setPostCategory(event.target.value));
  };

  const getCategoryList = async () => {
    if (blogType == 0) {
      const category = await getCategoryApi(accessToken, githubId);
      setCategoryList(category);
    }
  };

  const enterKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    const english = /[^a-z]/g;
    if (tag.length === 0) return;
    if (event.key === "Enter") {
      if (english.test(tag)) {
        setTag(tag.replace(english, " "));
      }

      const newTagList = [...tagList];
      newTagList.push(tag);
      setTagList(newTagList);
      setTag("");
    }
  };

  const tagChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTag(event.target.value);
  };

  // const deletePostTag = (event: any) => {
  //   console.log("삭제");
  //   const deleteTag = event.target.label;
  //   console.log("deleteTag : ", deleteTag);
  //   const filteredTagList = tagList.filter((tag) => tag !== deleteTag);
  //   setTagList(filteredTagList);
  // };

  useEffect(() => {
    getCategoryList();
  }, []);

  useEffect(() => {
    dispatch(setPostTagList(tagList));
  }, [tagList]);

  return (
    <div className={styles.postWriteTitle}>
      <Text value="제목" type="text" />
      <div style={{ marginTop: "1%" }}>
        <Input placeholder="제목을 입력해주세요" onChange={(e) => setPostTitleAction(e.target.value)} value={title} />
      </div>
      <div id="titleError" style={{ display: "none" }}>
        <Text value="제목은 필수 입력값입니다." type="caption" color="red" />
      </div>
      <br /> <br /> <br />
      <Text value="설명" type="text" />
      <div style={{ marginTop: "1%" }}>
        <Input placeholder="설명을 입력해주세요" onChange={descriptionChange} value={description} />
      </div>
      <div id="descriptionError" style={{ display: "none" }}>
        <Text value="설명은 필수 입력값입니다." type="caption" color="red" />
      </div>
      <br /> <br /> <br />
      <div className={blogType == 0 ? `${styles.showSelectBox}` : `${styles.hideSelectBox}`} style={{ width: "15vw" }}>
        <Text value="카테고리" type="text" /> <br />
        <div style={{ marginTop: "1%" }}>
          <select className={styles.categoryBox} name="cateogry" value={category} onChange={categoryChange}>
            <option value="">설정 안 함</option>
            {categoryList.map((value, key) => (
              <option key={key} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        {/* <Select value={category} onChange={categoryChange} displayEmpty inputProps={{ "aria-label": "Without label" }}>
          <MenuItem value="">카테고리</MenuItem>
          {categoryList.map((value, key) => (
            <MenuItem key={key} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select> */}
      </div>
      <br /> <br /> <br />
      <Text value="태그" type="text" />
      <div style={{ marginTop: "1%", marginBottom: "2%" }}>
        <Input
          placeholder="태그를 작성 후 엔터를 입력해주세요"
          onKeyPress={enterKeyPress}
          onChange={tagChange}
          value={tag}
        />
      </div>
      {tagList.map((tag, index) => (
        <Tag key={index} label={tag} />
      ))}
    </div>
  );
};

export default PostWriteTitle;

PostWriteTitle.defaultProps = {
  savedTitle: "",
  savedDescription: "",
  savedCategory: "",
  savedTag: [],
};
