import { useEffect, useState } from "react";
import styles from "styles/Setting.module.css";
import LayoutSelectorItem from "./../layout/LayoutSelectorItem";
import DefaultLayoutStyles, { defaultLayoutConfig } from "./DefaultLayoutStyles";
import { initialState, useSettingActions } from "stores/settingStore";

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
  const { setClickedLayoutIdxAction } = useSettingActions();

  useEffect(() => {
    return () => {
      setClickedLayoutIdxAction(initialState.clickedLayoutIdx);
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
