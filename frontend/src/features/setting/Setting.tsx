import React, { useEffect, useState } from "react";
// import GridLayout from "react-grid-layout";
import { Responsive, WidthProvider, Layout, Layouts } from "react-grid-layout";
import * as ReactDOMServer from "react-dom/server";
import { selectLayoutList, setLayoutList } from "../../slices/settingSlice";
import { useAppSelector } from "app/hooks";
import styles from "./Setting.module.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Setting = () => {
  const ResponsiveGridLayout = WidthProvider(Responsive);
  const savedLayoutList: Layout[] = useAppSelector(selectLayoutList);
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const saveLayouts = () => {
    const tmpLayoutList: Layout[] = [];
    const layout = sessionStorage.getItem("grid-layout");
    const layoutJson = JSON.parse(layout);

    const layoutLength = layoutJson.length;
    for (let item = 0; item < layoutLength; item++) {
      const layout: Layout = {
        i: layoutJson[item].i,
        x: layoutJson[item].x,
        y: layoutJson[item].y,
        w: layoutJson[item].w,
        h: layoutJson[item].h,
        static: layoutJson[item].static,
      };
      tmpLayoutList.push(layout);
    }
    dispatch(setLayoutList(tmpLayoutList));
    navigator("/layout");
  };

  const handleLayoutChange = (layouts: any) => {
    sessionStorage.setItem("grid-layout", JSON.stringify(layouts));
  };

  return (
    <>
      <ResponsiveGridLayout
        layouts={{ lg: savedLayoutList }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 5, md: 4, sm: 3, xs: 2, xxs: 1 }}
        rowHeight={30}
        width={1000}
        onLayoutChange={handleLayoutChange}
      >
        <div className={styles.box1} key="a">
          Blue Eyes Dragon
        </div>
        <div className={styles.box2} key="b">
          Dark Magician
        </div>
        <div className={styles.box3} key="c">
          Kuriboh
        </div>
      </ResponsiveGridLayout>
      <button onClick={saveLayouts}>저장</button>
    </>
  );
};

export default Setting;
