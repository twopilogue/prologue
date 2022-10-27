import React from "react";
// import GridLayout from "react-grid-layout";
import { Responsive, WidthProvider } from "react-grid-layout";
import * as ReactDOMServer from "react-dom/server";
import Post from "features/post/Post";
import { selectLayout } from "slices/settingSlice";
import { useAppSelector } from "app/hooks";
import styles from "./Setting.module.css";

const ResponsiveGridLayout = WidthProvider(Responsive);
const Setting = () => {
  const layout = [
    { i: "blue-eyes-dragon", x: 0, y: 0, w: 1, h: 1 },
    { i: "dark-magician", x: 1, y: 0, w: 1, h: 1 },
    { i: "kuriboh", x: 2, y: 0, w: 1, h: 1 },
  ];

  const getLayouts = () => {
    const savedLayouts = sessionStorage.getItem("grid-layout");
    return savedLayouts ? JSON.parse(savedLayouts) : { lg: layout };
  };

  const handleLayoutChange = (layout: any) => {
    sessionStorage.setItem("grid-layout", JSON.stringify(layout));
  };

  const saveLayout = () => {
    console.log(layout);
    alert("BUTTON");
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
