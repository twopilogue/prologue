import React, { useEffect, useState } from "react";
// import GridLayout from "react-grid-layout";
import { Responsive, WidthProvider } from "react-grid-layout";
import * as ReactDOMServer from "react-dom/server";
import Post from "features/post/Post";
import {
  layoutConfig,
  layoutListConfig,
  selectLayoutList,
  setLayoutList,
} from "../../slices/settingSlice";
import { useAppSelector } from "app/hooks";
import styles from "./Setting.module.css";
import { useDispatch } from "react-redux";

const Setting = () => {
  const [defaultLayout, setDefaultLayout] = useState<layoutConfig[]>([
    { i: "a", x: 1, y: 0, w: 1, h: 2 },
    { i: "b", x: 2, y: 0, w: 1, h: 2 },
    { i: "c", x: 4, y: 0, w: 1, h: 2 },
  ]);
  const [savedLayout, setSavedLayout] = useState<layoutConfig[]>([]);

  const ResponsiveGridLayout = WidthProvider(Responsive);
  const dispatch = useDispatch();

  const getLayouts = () => {
    const savedLayouts = localStorage.getItem("grid-layout");
    // const savedLayoutList = useAppSelector(selectLayoutList);
    console.log("세션: ", savedLayouts);
    console.log(savedLayouts ? "true" : "false");
    return savedLayouts ? JSON.parse(savedLayouts) : { lg: defaultLayout };
    // return savedLayoutList ? savedLayoutList : { lg: defaultLayout };
  };

  const saveLayout = () => {
    dispatch(setLayoutList(defaultLayout));

    // console.log("슬라이스", savedLayoutList);
    console.log("변경 위치", defaultLayout);
  };

  const handleLayoutChange = (layouts: any) => {
    // for문 돌려서 저장해야 할듯
    const tmpLayoutList: layoutConfig[] = [];
    const layoutLength = layouts.length;
    for (let item = 0; item < layoutLength; item++) {
      const layout: layoutConfig = {
        i: layouts[item].i,
        x: layouts[item].x,
        y: layouts[item].y,
        w: layouts[item].w,
        h: layouts[item].h,
      };
      tmpLayoutList.push(layout);
    }
    console.log(tmpLayoutList);
    console.log("what");
    setSavedLayout(tmpLayoutList);

    // localStorage.setItem("grid-layout", JSON.stringify(layouts));
  };

  return (
    <>
      <ResponsiveGridLayout
        layouts={getLayouts()}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 5, md: 4, sm: 3, xs: 2, xxs: 1 }}
        rowHeight={30}
        width={1000}
        onLayoutChange={handleLayoutChange}
      >
        <div className={styles.box1} key="blue-eyes-dragon">
          Blue Eyes Dragon
        </div>
        <div className={styles.box2} key="dark-magician">
          Dark Magician
        </div>
        <div className={styles.box3} key="kuriboh">
          Kuriboh
        </div>
      </ResponsiveGridLayout>
      <button onClick={saveLayout}>저장</button>
    </>
  );
};

export default Setting;
