import React, { useEffect, useRef, useState } from "react";
import styles from "features/post/PostWrite.module.css";
import Text from "components/Text";
import Input from "components/Input";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Tag from "components/Tag";
import { useAppDispatch } from "app/hooks";
import { setPostCategory, setPostTagList, setPostTitle } from "slices/postSlice";
import axios from "api/JsonAxios";
import api from "api/Api";
import { useSelector } from "react-redux";
import { rootState } from "app/store";

const PostWriteTitle = () => {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [tag, setTag] = useState("");
  const [tagList, setTagList] = useState([]);

  const { accessToken, githubId } = useSelector((state: rootState) => state.auth);

  const titleChange = (event: any) => {
    setTitle(event.target.value);
    console.log("제목 : ", event.target.value);
    dispatch(setPostTitle(event.target.value));
  };

  const categoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
    dispatch(setPostCategory(event.target.value));
  };

  const getCategoryList = () => {
    axios
      .get(api.setting.getCategory(accessToken, githubId))
      .then((res: any) => {
        console.log(res.data.category);
        setCategoryList(res.data.category);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const enterKeyPress = (event: any) => {
    if (event.target.value.length !== 0 && event.key === "Enter") {
      makeTagItem();
    }
  };

  const tagChange = (event: any) => {
    setTag(event.target.value);
  };

  const makeTagItem = () => {
    console.log("태그 만들기 : ", tag);

    const newTagList = [...tagList];
    newTagList.push(tag);
    setTagList(newTagList);
    setTag("");
  };

  const deletePostTag = (event: any) => {
    console.log("삭제");
    const deleteTag = event.target.value;
    const filteredTagList = tagList.filter((tag) => tag !== deleteTag);
    setTagList(filteredTagList);
  };

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
        <Input placeholder="제목을 입력해주세요" onChange={titleChange} value={title} />
      </div>
      <Text value="제목은 필수 입력값입니다." type="caption" color="red" />
      <br /> <br /> <br />
      <Text value="카테고리" type="text" />
      <div style={{ width: "15vw" }}>
        <Select value={category} onChange={categoryChange} displayEmpty inputProps={{ "aria-label": "Without label" }}>
          <MenuItem value="">카테고리</MenuItem>
          {categoryList.map((value, key) => (
            <MenuItem key={key} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
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
        <Tag key={index} label={tag} onDelete={() => deletePostTag} />
      ))}
    </div>
  );
};

export default PostWriteTitle;
