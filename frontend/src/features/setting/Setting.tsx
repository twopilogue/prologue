import React, { useEffect, useState } from "react";
// import GridLayout from "react-grid-layout";
import { Responsive, WidthProvider, Layout, Layouts } from "react-grid-layout";
import * as ReactDOMServer from "react-dom/server";
import { selectLayoutList, setLayoutList } from "../../slices/settingSlice";
import { useAppSelector } from "app/hooks";
import styles from "./Setting.module.css";
import { useDispatch } from "react-redux";

const Setting = () => {
  const [savedLayout, setSavedLayout] = useState<Layout[]>([]);

  const ResponsiveGridLayout = WidthProvider(Responsive);
  const dispatch = useDispatch();
  // const savedLayoutList: Layouts = useAppSelector(selectLayoutList);
  const savedLayoutList: Layouts = {
    layoutList: [
      { i: "a", x: 1, y: 0, w: 1, h: 2 },
      { i: "b", x: 2, y: 0, w: 1, h: 2 },
      { i: "c", x: 4, y: 0, w: 1, h: 2 },
    ],
  };

  // const getLayouts = () => {
  //   // const savedLayouts = localStorage.getItem("grid-layout");
  //   console.log(savedLayoutList ? "true" : "false");
  //   console.log("슬라이스", savedLayoutList);
  //   return savedLayoutList;
  // };

  const saveLayouts = (layouts: any) => {
    // for문 돌려서 저장해야 할듯
    const tmpLayoutList = [];
    const layoutLength = layouts.length;
    console.log(layoutLength);
    for (let item = 0; item < layoutLength; item++) {
      const layout: Layout = {
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
    console.log(savedLayout);

    // localStorage.setItem("grid-layout", JSON.stringify(layouts));
  };

  return (
    <>
      <ResponsiveGridLayout
        layouts={savedLayoutList}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 5, md: 4, sm: 3, xs: 2, xxs: 1 }}
        rowHeight={30}
        width={1000}
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
      <button onClick={saveLayouts}>저장</button>
    </>
  );
};

export default Setting;
