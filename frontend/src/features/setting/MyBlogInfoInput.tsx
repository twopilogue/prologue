import React from "react";
import styles from "./Setting.module.css";
import Text from "components/Text";
import Input from "components/Input";
import { FormControl, MenuItem, OutlinedInput, Select } from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import SelectInput from "features/setting/SelectInput";

const MyBlogInfoInput = () => {
  return (
    <div style={{ margin: "20px" }}>
      <div className={styles.textPadding}>
        <Text value="내 블로그 정보" type="groupTitle" bold />
      </div>
      <div>
        <div className={styles.textMargin}>
          <div className={styles.inputTag}>
            <Text value="블로그명" type="text" />
            <Input placeholder="블로그명을 입력하세요." />
          </div>
        </div>
        <div className={styles.textMargin}>
          <div className={styles.inputTag}>
            <Text value="블로그 소개" type="text" />
            <Input
              placeholder="블로그 소개글을 입력하세요."
              multiline
              rows={4}
            />
          </div>
        </div>

        <div className={styles.textMargin}>
          <div className={styles.inputTag}>
            <Text value="링크 연결" type="text" />
            <SelectInput />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBlogInfoInput;
