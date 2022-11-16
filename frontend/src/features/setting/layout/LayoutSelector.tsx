import Text from "components/Text";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setClickedLayoutIdx } from "slices/settingSlice";
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
    { idx: 7, isClicked: false },
  ]);

  return (
    <>
      <div className={styles.layoutContainer}>
        {layoutList.map((item: layoutsConfig, i: number) => {
          return <LayoutSelectorItem key={i} index={item.idx} layoutList={layoutList} setLayoutList={setLayoutList} />;
        })}
      </div>
    </>
  );
};

export default LayoutSelector;
