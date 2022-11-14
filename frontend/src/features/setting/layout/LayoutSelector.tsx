import Text from "components/Text";
import React, { useState } from "react";
import styles from "../Setting.module.css";
import LayoutSelectorItem from "./../layout/LayoutSelectorItem";

export interface layoutsConfig {
  idx: number;
  isClicked: boolean;
}

const LayoutSelector = () => {
  const [layoutList, setLayoutList] = useState<layoutsConfig[]>([
    { idx: 1, isClicked: true },
    { idx: 2, isClicked: false },
    { idx: 3, isClicked: false },
    { idx: 4, isClicked: false },
    { idx: 5, isClicked: false },
    { idx: 6, isClicked: false },
  ]);
  return (
    <>
      <div className={styles.textPadding} style={{ paddingTop: "0", paddingBottom: "10px" }}>
        <Text value="기본 레이아웃 선택" type="groupTitle" bold />
      </div>
      <div style={{ paddingLeft: "20px" }}>
        <Text value="기본으로 사용할 레이아웃을 선택하세요." type="caption" />
      </div>
      <div className={styles.layoutContainer}>
        {layoutList.map((item: layoutsConfig, i: number) => {
          return <LayoutSelectorItem key={i} index={i} />;
        })}
      </div>
    </>
  );
};

export default LayoutSelector;
