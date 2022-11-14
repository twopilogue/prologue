import React from "react";
import styles from "../Setting.module.css";
import { layoutsConfig } from "./LayoutSelector";

interface Props {
  index: number;
  // layoutList: layoutsConfig[];
  // setLayoutList: React.Dispatch<React.SetStateAction<layoutsConfig[]>>;
}

const LayoutSelectorItem = ({ index }: Props) => {
  return (
    <div className={styles.layoutItem}>
      <img src={require(`assets/setting/layouts/layout_clicked(${index + 1}).png`)} width={110} height={110} />
    </div>
  );
};

export default LayoutSelectorItem;
