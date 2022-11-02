import React from "react";
import Text from "components/Text";
import styles from "./Setting.module.css";
import ButtonStyled from "components/Button";

const MyGitInfo = () => {
  return (
    <div style={{ margin: "20px" }}>
      <div className={styles.textPadding} style={{ paddingTop: "0" }}>
        <Text value="Github 정보" type="groupTitleBold" />
      </div>
      <div className={styles.githubContainer}>
        <div className={styles.githubBox}>
          <div className={styles.githubProfileImg}></div>
          <div className={styles.githubProfileTexts}>
            <div className={styles.githubProfileText}>
              <Text value="yeonsu-k" type="groupTitleBold" />
            </div>
            <div className={styles.githubProfileText}>
              <Text value="github.com/yeonsu-k" type="caption" />
            </div>
          </div>
          <div className={styles.githubProfileLogout}>
            <ButtonStyled label="로그아웃" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyGitInfo;
