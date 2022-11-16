import React, { useEffect, useState } from "react";
import { initialState, setClickedLayoutIdx } from "slices/settingSlice";
import styles from "../Setting.module.css";
import LayoutSelectorItem from "./../layout/LayoutSelectorItem";
import DefaultLayoutStyles, { defaultLayoutConfig } from "./DefaultLayoutStyles";

export interface layoutsConfig {
  idx: number;
  isClicked: boolean;
}

const LayoutSelector = () => {
  const [layoutList, setLayoutList] = useState<layoutsConfig[]>([
    { idx: 0, isClicked: true },
    { idx: 1, isClicked: false },
    { idx: 2, isClicked: false },
    { idx: 3, isClicked: false },
    { idx: 4, isClicked: false },
    { idx: 5, isClicked: false },
    { idx: 6, isClicked: false },
  ]);
  const DefaultLayouts = DefaultLayoutStyles();

  useEffect(() => {
    return () => {
      setClickedLayoutIdx(initialState.clickedLayoutIdx);
    };
  }, []);

  return (
    <>
      <div className={styles.layoutContainer}>
        {DefaultLayouts.map((item: defaultLayoutConfig, i: number) => {
          return <LayoutSelectorItem key={i} index={item.id} layoutList={layoutList} setLayoutList={setLayoutList} />;
        })}
      </div>
    </>
  );
};

export default LayoutSelector;
