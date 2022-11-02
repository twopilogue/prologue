import Input from "components/Input";
import Text from "components/Text";
import React, { Profiler } from "react";
import styles from "./Setting.module.css";
import ModeIcon from "@mui/icons-material/Mode";

const MemberInfoInput = () => {
  return (
    <div>
      <div style={{ margin: "20px" }}>
        <div className={styles.textPadding}>
          <Text value="내 프로필 정보" type="groupTitleBold" />
        </div>
        <div className={styles.grid_container}>
          <div>
            <div className={styles.textMargin}>
              <div className={styles.inputTag}>
                <Text value="닉네임" type="text" />
                <Input placeholder="닉네임을 입력하세요." />
              </div>
            </div>
            <div className={styles.textMargin}>
              <div className={styles.inputTag}>
                <Text value="내 소개" type="text" />
                <Input
                  placeholder="나를 소개하는 글을 입력하세요."
                  multiline
                  rows={4}
                />
              </div>
            </div>
            <div className={styles.textMargin}>
              <div className={styles.inputTag}>
                <Text value="기술 스택" type="text" />
                <Input placeholder="기술 스택을 입력하세요." />
              </div>
            </div>
          </div>
          {/* 오른쪽: 프로필 */}
          <div>
            <div className={styles.textMargin}>
              <Text value="프로필 사진" type="text" />
              <div className={styles.profile_img}>
                <div className={styles.profile_editBtn}>
                  <ModeIcon className={styles.profile_editBtn_icon} />
                  <div className={styles.profile_editBtn_text}>
                    <Text value="Edit" type="caption" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberInfoInput;
