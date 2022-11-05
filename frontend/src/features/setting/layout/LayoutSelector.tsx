import Text from "components/Text";
import React from "react";
import styles from "../Setting.module.css";
import LayoutSelectorItem from "./../layout/LayoutSelectorItem";

const LayoutSelector = () => {
  return (
    <>
      <div
        className={styles.textPadding}
        style={{ paddingTop: "0", paddingBottom: "10px" }}
      >
        <Text value="기본 레이아웃 선택" type="groupTitle" bold />
      </div>
      <div style={{ paddingLeft: "20px" }}>
        <Text value="기본으로 사용할 레이아웃을 선택하세요." type="caption" />
      </div>
      <div className={styles.layoutContainer}>
        <LayoutSelectorItem />
        <LayoutSelectorItem />
        <LayoutSelectorItem />
        <LayoutSelectorItem />
        <LayoutSelectorItem />
        <LayoutSelectorItem />
        <LayoutSelectorItem />
        <LayoutSelectorItem />
        <LayoutSelectorItem />
        <LayoutSelectorItem />
      </div>
    </>
  );
};

export default LayoutSelector;
