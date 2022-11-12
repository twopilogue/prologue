import React, { Dispatch, MouseEventHandler, SetStateAction, useEffect, useRef, useState } from "react";
import styles from "../Setting.module.css";
import { Layout } from "react-grid-layout";
import GridLayout from "react-grid-layout";
import { useAppSelector } from "app/hooks";
import {
  colorsConfig,
  ComponentConfig,
  selectCheckList,
  selectColors,
  selectComponentLayoutList,
  selectComponentList,
  setClickedComp,
} from "slices/settingSlice";
import { useGettingWidth } from "../layout/LayoutSample";
import Text from "components/Text";
import { useDispatch } from "react-redux";

// 세부 레이아웃 설정 컴포넌트

const SettingLayout = () => {
  const [componentLayoutList, setComponentLayoutList] = useState<Layout[]>(useAppSelector(selectComponentLayoutList));
  const componentList = useAppSelector(selectComponentList);
  const checkList = useAppSelector(selectCheckList);
  const [layoutWidth, layoutContainer] = useGettingWidth();
  const colors: colorsConfig = useAppSelector(selectColors);

  const dispatch = useDispatch();

  const styleInfo: any = {
    title: { backgroundColor: `${colors.title.background}`, color: `${colors.title.text}` },
    page: { backgroundColor: `${colors.page.background}`, color: `${colors.page.text}` },
    logo: { backgroundColor: `${colors.logo.background}`, color: `${colors.logo.text}` },
    contents: { backgroundColor: `${colors.title.background}`, color: `${colors.title.text}` },
    category: { backgroundColor: `${colors.category.background}`, color: `${colors.category.text}` },
    profile: { backgroundColor: `${colors.profile.background}`, color: `${colors.profile.text}` },
  };

  const handleClick = (item: string) => {
    dispatch(setClickedComp(item));
  };

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
    
    // 언마운트 시 실행
    return () => {
      dispatch(setClickedComp("logo"));
    };
  }, []);

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
                  style={styleInfo[item.id]}
                  key={item.key}
                  onClick={() => handleClick(item.id)}
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
