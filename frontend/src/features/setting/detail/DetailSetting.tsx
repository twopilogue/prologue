import Text from "components/Text";
import React, { useState } from "react";
import DetailSelector from "./DetailSelector";
import LayoutSample from "../layout/LayoutSample";
import styles from "../Setting.module.css";
import SettingLayout from "./SettingLayout";
import { useAppSelector } from "app/hooks";
import { selectColors } from "slices/settingSlice";

const DetailSetting = () => {
  return (
    <div>
      <div className={styles.textPadding} style={{ paddingTop: "0", paddingBottom: "10px" }}>
        <Text value="세부 레이아웃 설정" type="groupTitle" bold />
      </div>
      <div style={{ paddingLeft: "20px" }}>
        <Text value="레이아웃에 원하는 디자인을 선택하여 적용하세요." type="caption" />
      </div>
      <div className={styles.layoutSelectContainer}>
        <DetailSelector />
        <SettingLayout />
      </div>
    </div>
  );
};

export default DetailSetting;
