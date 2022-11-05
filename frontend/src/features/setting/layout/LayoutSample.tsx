import { useAppSelector } from "app/hooks";
import React, { useEffect, useState, useRef } from "react";
import { Layout, Responsive, WidthProvider } from "react-grid-layout";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ComponentCheckConfig,
  selectCategoryLayoutList,
  selectCheckList,
  setCategoryLayoutList,
} from "slices/settingSlice";
import ComponentSelector from "../layout/ComponentSelector";
import styles from "../Setting.module.css";
import "../../../../node_modules/react-grid-layout/css/styles.css";
import Text from "components/Text";

const LayoutSample = () => {
  const ResponsiveGridLayout = WidthProvider(Responsive);
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const savedLayoutList: Layout[] = useAppSelector(selectCategoryLayoutList);
  const [checkList, setCheckList] = useState<ComponentCheckConfig>({
    logoCheck: true,
    profileCheck: true,
    categoryCheck: true,
    naviCheck: true,
  });

  const getLayout = () => {
    const sessionLayout = sessionStorage.getItem("grid-layout");
    console.log(JSON.parse(sessionLayout));
    return sessionLayout
      ? { lg: JSON.parse(sessionLayout) }
      : { lg: savedLayoutList };
  };

  const saveLayouts = () => {
    const tmpLayoutList: Layout[] = [];
    const layout = sessionStorage.getItem("grid-layout");
    const layoutJson = JSON.parse(layout);
    console.log("레이아웃: ", layoutJson);
    const layoutLength = layoutJson.length;
    for (let item = 0; item < layoutLength; item++) {
      const layout: Layout = {
        i: layoutJson[item].i,
        x: layoutJson[item].x,
        y: layoutJson[item].y,
        w: layoutJson[item].w,
        h: layoutJson[item].h,
        static: layoutJson[item].static,
        isDraggable: layoutJson[item].isDraggable,
        isResizable: layoutJson[item].isResizable,
      };
      tmpLayoutList.push(layout);
    }
    dispatch(setCategoryLayoutList(tmpLayoutList));
    navigator("/layout");
  };

  const handleLayoutChange = (layouts: any) => {
    sessionStorage.setItem("grid-layout", JSON.stringify(layouts));
  };

  return (
    <div>
      <div className={styles.textPadding} style={{ paddingBottom: "10px" }}>
        <Text value="레이아웃 배치" type="groupTitle" bold />
      </div>
      <div style={{ paddingLeft: "20px" }}>
        <Text
          value="드래그 앤 드롭으로 레이아웃의 위치를 자유롭게 설정하세요."
          type="caption"
        />
      </div>
      <div className={styles.layoutSelectContainer}>
        <ComponentSelector checkList={checkList} setCheckList={setCheckList} />
        <div
          style={{
            backgroundColor: "white",
            border: "2px solid #ECECEC",
            marginLeft: "5px",
          }}
        >
          <ResponsiveGridLayout
            layouts={getLayout()}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 5, md: 4, sm: 3, xs: 2, xxs: 1 }}
            rowHeight={30}
            width={1000}
            onLayoutChange={handleLayoutChange}
          >
            <div
              className={
                checkList.logoCheck
                  ? `${styles.display_flex}`
                  : `${styles.display_none}`
              }
              key="logo"
            >
              블로그 로고
            </div>
            <div
              className={
                checkList.profileCheck
                  ? `${styles.display_flex}`
                  : `${styles.display_none}`
              }
              key="profile"
            >
              프로필
            </div>
            <div
              className={
                checkList.categoryCheck
                  ? `${styles.display_flex}`
                  : `${styles.display_none}`
              }
              key="category"
            >
              카테고리
            </div>

            <div
              className={
                checkList.naviCheck
                  ? `${styles.display_flex}`
                  : `${styles.display_none}`
              }
              key="page"
            >
              페이지
            </div>
          </ResponsiveGridLayout>
        </div>
      </div>
    </div>
  );
};

export default LayoutSample;
