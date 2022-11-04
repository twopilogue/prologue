import { useAppSelector } from "app/hooks";
import React, { useEffect, useState, useRef } from "react";
import { Layout, Responsive, WidthProvider } from "react-grid-layout";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectCategoryLayoutList,
  setCategoryLayoutList,
} from "slices/settingSlice";
import styles from "../Setting.module.css";
import "../../../../node_modules/react-grid-layout/css/styles.css";

const LayoutSample = () => {
  const ResponsiveGridLayout = WidthProvider(Responsive);
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const [categoryCheck, setCategoryCheck] = useState(true);
  const [contentCheck, setContentCheck] = useState(true);
  const [titleCheck, setTitleCheck] = useState(true);

  const savedLayoutList: Layout[] = useAppSelector(selectCategoryLayoutList);

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
    <>
      <input
        type="checkbox"
        checked={categoryCheck}
        onChange={() => {
          setCategoryCheck(!categoryCheck);
        }}
      />
      <input
        type="checkbox"
        checked={contentCheck}
        onChange={() => {
          setContentCheck(!contentCheck);
        }}
      />
      <input
        type="checkbox"
        checked={titleCheck}
        onChange={() => {
          setTitleCheck(!titleCheck);
        }}
      />

      <div style={{ backgroundColor: "white" }}>
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
              categoryCheck
                ? `${styles.display_flex}`
                : `${styles.display_none}`
            }
            key="a"
          >
            Blue Eyes Dragon
          </div>
          <div
            className={
              contentCheck ? `${styles.display_flex}` : `${styles.display_none}`
            }
            key="b"
          >
            Dark Magician
          </div>
          <div
            className={
              titleCheck ? `${styles.display_flex}` : `${styles.display_none}`
            }
            key="c"
          >
            Kuriboh
          </div>
        </ResponsiveGridLayout>
        <button onClick={saveLayouts}>저장</button>
      </div>
    </>
  );
};

export default LayoutSample;
