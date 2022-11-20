import React, { useEffect, useState } from "react";
import styles from "../Setting.module.css";
import { Layout } from "react-grid-layout";
import GridLayout from "react-grid-layout";
import { useAppSelector } from "app/hooks";
import {
  colorsConfig,
  ComponentConfig,
  selectClickedLayoutIdx,
  selectColors,
  setClickedComp,
  selectUserComponentList,
  selectUserComponentLayoutList,
  setClickedLayoutIdx,
} from "slices/settingSlice";
import { useGettingWidth } from "../layout/LayoutContainer";
import Text from "components/Text";
import { useDispatch } from "react-redux";
import DefaultLayoutStyles from "../layout/DefaultLayoutStyles";

// 세부 레이아웃 설정 컴포넌트
const SettingLayout = () => {
  const componentList = useAppSelector(selectUserComponentList);
  const layoutList = useAppSelector(selectUserComponentLayoutList);
  const [isCust, setIsCust] = useState<boolean>(false);
  const clickedIdx = useAppSelector(selectClickedLayoutIdx);
  const [layoutWidth, layoutContainer] = useGettingWidth();
  const colors: colorsConfig = useAppSelector(selectColors);
  const DefaultLayoutList = DefaultLayoutStyles();

  const dispatch = useDispatch();

  const styleInfo: any = {
    title: { backgroundColor: `${colors.title.background}`, color: `${colors.title.text}` },
    page: { backgroundColor: `${colors.page.background}`, color: `${colors.page.text}` },
    logo: { backgroundColor: `${colors.logo.background}`, color: `${colors.logo.text}` },
    contents: { backgroundColor: `${colors.contents.background}`, color: `${colors.contents.text}` },
    category: { backgroundColor: `${colors.category.background}`, color: `${colors.category.text}` },
    profile: { backgroundColor: `${colors.profile.background}`, color: `${colors.profile.text}` },
  };

  const handleClick = (item: string) => {
    dispatch(setClickedComp(item));
  };

  useEffect(() => {
    DefaultLayoutList[clickedIdx].id === 0 ? setIsCust(true) : setIsCust(false);
  }, [clickedIdx]);

  useEffect(() => {
    return () => {
      dispatch(setClickedLayoutIdx(0));
    };
  }, []);

  return (
    <div>
      <div
        ref={layoutContainer}
        style={{
          backgroundColor: "white",
          border: "2px solid #ECECEC",
          // marginLeft: "5px",
          // marginRight: "5px",
          paddingBottom: "30px",
        }}
      >
        <GridLayout
          layout={layoutList}
          cols={6}
          rowHeight={50}
          width={layoutWidth - 20}
          verticalCompact={isCust}
          preventCollision={!isCust}
          isDraggable={false}
          isResizable={false}
        >
          {componentList.map((item: ComponentConfig) => {
            {
              return DefaultLayoutList[clickedIdx].checkList[item.id] ? (
                <div
                  className={styles.layout_nonColored}
                  style={styleInfo[item.id]}
                  key={item.key}
                  onClick={() => handleClick(item.id)}
                >
                  <div style={{ marginTop: "15px" }}></div>
                  <div className={styles.innerText}>
                    <Text value={item.key} type="caption" color={styleInfo[item.id].text} />
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
