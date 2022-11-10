import Text from "components/Text";
import React, { useState } from "react";
import DetailSelector from "./DetailSelector";
import LayoutSample from "./layout/LayoutSample";
import styles from "./Setting.module.css";
import SettingLayout from "./SettingLayout";

export interface colorsConfig {
  title: {
    background: string;
    text: string;
  };
  category: {
    background: string;
    text: string;
  };
  page: {
    background: string;
    text: string;
  };
}

const DetailSetting = () => {
  const [colors, setColors] = useState<colorsConfig>({
    title: {
      background: "#d3d3eb",
      text: "darkgray",
    },
    category: {
      background: "#d3d3eb",
      text: "darkgray",
    },
    page: {
      background: "#d3d3eb",
      text: "darkgray",
    },
  });

  return (
    <div>
      <div className={styles.textPadding} style={{ paddingBottom: "10px" }}>
        <Text value="세부 레이아웃 설정" type="groupTitle" bold />
      </div>
      <div style={{ paddingLeft: "20px" }}>
        <Text value="레이아웃에 원하는 디자인을 선택하여 적용하세요." type="caption" />
      </div>
      <div className={styles.layoutSelectContainer}>
        <DetailSelector colors={colors} setColors={setColors} />
        <SettingLayout colors={colors} />
      </div>
    </div>
  );
};

export default DetailSetting;
