import React from "react";
import styles from "./Setting.module.css";
import LayoutSelectorItem from "./../layout/LayoutSelectorItem";

const LayoutSelector = () => {
  return (
    <div className={styles.container}>
      <LayoutSelectorItem />
      <LayoutSelectorItem />
      <LayoutSelectorItem />
      <LayoutSelectorItem />
      <LayoutSelectorItem />
    </div>
  );
};

export default LayoutSelector;
