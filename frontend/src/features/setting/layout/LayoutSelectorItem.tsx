import React, { useState } from "react";
import styles from "../Setting.module.css";
import { layoutsConfig } from "./LayoutSelector";

interface Props {
  index: number;
  layoutList: layoutsConfig[];
  setLayoutList: React.Dispatch<React.SetStateAction<layoutsConfig[]>>;
}

const LayoutSelectorItem = ({ index, layoutList, setLayoutList }: Props) => {
  const handleClicked = (i: number) => {
    setLayoutList(
      layoutList.map((it: layoutsConfig) => {
        return it.idx === i ? { idx: it.idx, isClicked: true } : { idx: it.idx, isClicked: false };
      }),
    );
  };

  return (
    <div className={styles.layoutItem} onClick={() => handleClicked(index)}>
      {layoutList[index - 1].isClicked ? (
        <div className={styles.layoutItemClicked}>
          <img src={require(`assets/setting/layouts/layout_clicked(${index}).png`)} width={110} height={110} />
        </div>
      ) : (
        <img src={require(`assets/setting/layouts/layout_default(${index}).png`)} width={110} height={110} />
      )}
    </div>
  );
};

export default LayoutSelectorItem;
