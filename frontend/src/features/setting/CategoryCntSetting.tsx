import Text from "components/Text";
import React, { useState } from "react";
import styles from "./Setting.module.css";
import SwitchButton from "components/SwitchButton";

const CategoryCntSetting = () => {
  const [checkCnt, setCheckCnt] = useState(false);

  return (
    <>
      <div className={styles.textPadding}>
        <Text value="기타 설정" type="groupTitle" bold />
      </div>
      <div className={styles.gridContainer}>
        <div style={{ padding: "20px" }}>
          <SwitchButton
            label="카테고리별 게시글 수 표시하기"
            name="checkCnt"
            checked={checkCnt}
            onChange={() => setCheckCnt(!checkCnt)}
          />
        </div>
      </div>
    </>
  );
};

export default CategoryCntSetting;
