import React from "react";
import styles from "./Setting.module.css";
import Text from "components/Text";
import Input from "components/Input";
import SelectInput from "features/setting/SelectInput";
import { selectBlogSettingInfo } from "slices/settingSlice";
import { useAppSelector } from "app/hooks";

const MyBlogInfoInput = () => {
  const blogInfo = useAppSelector(selectBlogSettingInfo);

  return (
    <div>
      <div className={styles.textPadding}>
        <Text value="내 블로그 정보" type="groupTitle" bold />
      </div>
      <div>
        <div className={styles.textMargin}>
          <div className={styles.inputTag}>
            <Text value="블로그명" type="text" />
            <div style={{ width: "40vw" }}>
              <Input value={blogInfo.siteMetadata.title} />
            </div>
          </div>
        </div>
        <div className={styles.textMargin}>
          <div className={styles.inputTag}>
            <Text value="블로그 소개" type="text" />
            <div style={{ width: "40vw" }}>
              <Input
                value={blogInfo.siteMetadata.description}
                placeholder="블로그 소개글을 입력하세요."
                multiline
                rows={4}
              />
            </div>
          </div>
        </div>

        <div className={styles.textMargin}>
          <div className={styles.inputTagThree}>
            <Text value="링크 연결" type="text" />
            <div style={{ marginRight: "10px" }}>
              <SelectInput />
            </div>
            <Input placeholder="링크를 입력하세요." />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBlogInfoInput;
