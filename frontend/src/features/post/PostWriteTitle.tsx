import React, { useState } from "react";
import styles from "features/post/PostWrite.module.css";
import Text from "components/Text";
import Input from "components/Input";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Tag from "components/Tag";

const PostWriteTitle = () => {
  const [category, setCategory] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  return (
    <div className={styles.postWriteTitle}>
      <Text value="제목" type="text" />
      <div>
        <Input placeholder="제목을 입력해주세요" />
      </div>
      <Text value="제목은 필수 입력값입니다." type="caption" color="red" />
      <br /> <br />
      <Text value="카테고리" type="text" /> <br />
      <Select
        value={category}
        onChange={handleChange}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
      >
        <MenuItem value="">카테고리</MenuItem>
        <MenuItem value={"스터디"}>스터디</MenuItem>
        <MenuItem value={"개발"}>개발</MenuItem>
        <MenuItem value={"기타"}>기타</MenuItem>
      </Select>
      <br />
      <Text value="태그" type="text" /> <br />
      <Tag label="TIL" />
    </div>
  );
};

export default PostWriteTitle;
