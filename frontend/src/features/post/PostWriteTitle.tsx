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
      <div style={{ marginTop: "1%" }}>
        <Input placeholder="제목을 입력해주세요" />
      </div>
      <Text value="제목은 필수 입력값입니다." type="caption" color="red" />
      <br /> <br /> <br />
      <Text value="카테고리" type="text" />
      <div style={{ width: "15vw" }}>
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
      </div>
      <br /> <br /> <br />
      <Text value="태그" type="text" />
      <div style={{ marginTop: "1%", marginBottom: "2%" }}>
        <Input placeholder="태그를 작성 후 엔터를 입력해주세요" />
      </div>
      <Tag label="TIL" />
    </div>
  );
};

export default PostWriteTitle;
