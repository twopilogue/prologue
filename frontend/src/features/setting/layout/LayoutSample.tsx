import { useAppSelector } from "app/hooks";
import React, { useState } from "react";
import { ChromePicker } from "react-color";
import { Layout, Responsive, WidthProvider } from "react-grid-layout";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectLayoutList, setLayoutList } from "slices/settingSlice";
import styles from "../Setting.module.css";

const LayoutSample = () => {
  const ResponsiveGridLayout = WidthProvider(Responsive);
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const savedLayoutList: Layout[] = useAppSelector(selectLayoutList);
  const [color, setColor] = useState<string>("#ffffff");

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
    console.log(layoutJson);
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

  const handleColorChange = (color: any) => {
    setColor(color);
  };

  return (
    <>
      <ResponsiveGridLayout
        layouts={getLayout()}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 5, md: 4, sm: 3, xs: 2, xxs: 1 }}
        rowHeight={30}
        width={1000}
        onLayoutChange={handleLayoutChange}
      >
        <div
          className={styles.box1}
          style={{ backgroundColor: `${color}` }}
          key="a"
        >
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

      <ChromePicker
        color={color}
        onChange={(color) => handleColorChange(color.hex)}
      />
    </>
  );
};

export default LayoutSample;
