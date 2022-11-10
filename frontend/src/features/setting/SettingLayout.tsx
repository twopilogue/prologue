import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import styles from "./Setting.module.css";
import { Layout } from "react-grid-layout";
import GridLayout from "react-grid-layout";
import { useAppSelector } from "app/hooks";
import {
  ComponentCheckConfig,
  ComponentConfig,
  KeyConfig,
  selectCheckList,
  selectComponentLayoutList,
  selectComponentList,
} from "slices/settingSlice";
import { useGettingWidth } from "./layout/LayoutSample";
import Text from "components/Text";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import { colorsConfig } from "./DetailSetting";

// 세부 레이아웃 설정 컴포넌트

interface Props {
  colors: colorsConfig;
  // setColors: Dispatch<SetStateAction<colorsConfig>>;
}

const SettingLayout = ({ colors }: Props) => {
  const [componentLayoutList, setComponentLayoutList] = useState<Layout[]>(useAppSelector(selectComponentLayoutList));
  const [componentList, setComponentList] = useState<ComponentConfig[]>(useAppSelector(selectComponentList));
  const [checkList, setCheckList] = useState<ComponentCheckConfig>(useAppSelector(selectCheckList));
  const [layoutWidth, layoutContainer] = useGettingWidth();

  const colorRef = useRef();

  useEffect(() => {
    const tmpLayoutList: Layout[] = [];
    const layoutLength = componentLayoutList.length;
    for (let i = 0; i < layoutLength; i++) {
      console.log(componentLayoutList[i]);
      tmpLayoutList.push({
        ...componentLayoutList[i],
        static: true,
      });
    }
    setComponentLayoutList(tmpLayoutList);
    console.log(colorRef.current);
  }, []);

  // useEffect(() => {
  //   if (colorRef.current) {
  //     colorRef.current.style.backgroundColor = "red";
  //   }
  // });

  return (
    <div>
      <div
        ref={layoutContainer}
        style={{
          backgroundColor: "white",
          border: "2px solid #ECECEC",
          marginLeft: "5px",
          marginRight: "5px",
          paddingBottom: "20px",
        }}
      >
        <GridLayout layout={componentLayoutList} cols={6} rowHeight={30} width={layoutWidth - 10}>
          {componentList.map((item: ComponentConfig) => {
            {
              return checkList[item.id] ? (
                <div
                  className={styles.layout_nonColored}
                  style={
                    item.id === "title"
                      ? { backgroundColor: `${colors.title.background}`, color: `${colors.title.text}` }
                      : item.id === "category"
                      ? { backgroundColor: `${colors.category.background}`, color: `${colors.category.text}` }
                      : item.id === "page"
                      ? { backgroundColor: `${colors.page.background}`, color: `${colors.page.text}` }
                      : { backgroundColor: "#d3d3eb" }
                  }
                  key={item.key}
                >
                  <div style={{ marginTop: "15px" }}></div>
                  <div className={styles.innerText}>
                    <Text value={item.key} type="caption" color="gray" />
                  </div>
                </div>
              ) : (
                <></>
              );
            }
          })}
        </GridLayout>
      </div>
    </div>
  );
};

export default SettingLayout;
