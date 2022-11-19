import { useAppSelector } from "app/hooks";
import React from "react";
import GridLayout from "react-grid-layout";
import { ComponentConfig, selectClickedLayoutIdx } from "slices/settingSlice";
import styles from "../Setting.module.css";
import "../../../../node_modules/react-grid-layout/css/styles.css";
import Text from "components/Text";
import DefaultLayoutStyles from "./DefaultLayoutStyles";

const LayoutSample = (layoutWidth: any) => {
  const clickedIdx = useAppSelector(selectClickedLayoutIdx);
  const DefaultLayoutList = DefaultLayoutStyles();
  const width = layoutWidth["layoutWidth"];

  const getLayout = () => {
    return DefaultLayoutList[clickedIdx].layout;
  };

  const getComponents = () => {
    return DefaultLayoutList[clickedIdx].components;
  };

  return (
    <>
      <GridLayout
        layout={getLayout()}
        cols={5}
        rowHeight={50}
        width={width - 20}
        isDraggable={false}
        isResizable={false}
      >
        {getComponents().map((item: ComponentConfig, i: number) => {
          {
            return DefaultLayoutList[clickedIdx].checkList[item.id] ? (
              <div className={styles.layout_colored} key={item.key}>
                <div className={styles.innerText}>
                  <div style={{ marginTop: "15px" }}></div>
                  <Text value={item.key} type="caption" color="gray" />
                </div>
              </div>
            ) : (
              <React.Fragment />
            );
          }
        })}
      </GridLayout>
    </>
  );
};

export default LayoutSample;
