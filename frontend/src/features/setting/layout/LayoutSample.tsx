import { useAppSelector } from "app/hooks";
import React, { useEffect, useState, useRef } from "react";
import { Layout, Responsive, WidthProvider } from "react-grid-layout";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectLayoutList, setLayoutList } from "slices/settingSlice";
import styles from "../Setting.module.css";
import "../../../../node_modules/react-grid-layout/css/styles.css";

const LayoutSample = () => {
  const ResponsiveGridLayout = WidthProvider(Responsive);
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const category = useRef<HTMLInputElement>();
  const categoryDiv = useRef<HTMLInputElement>();

  const savedLayoutList: Layout[] = useAppSelector(selectLayoutList);

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
        isDraggable: layoutJson[item].isDraggable,
        isResizable: layoutJson[item].isResizable,
      };
      tmpLayoutList.push(layout);
    }
    dispatch(setLayoutList(tmpLayoutList));
    navigator("/layout");
  };

  const handleLayoutChange = (layouts: any) => {
    sessionStorage.setItem("grid-layout", JSON.stringify(layouts));
  };

  const handleIsChecked = (e: any) => {
    setIsChecked(!isChecked);
    console.log(isChecked);
    if (!isChecked) {
      console.log(categoryDiv.current.style.backgroundColor);
      // categoryDiv.current.style.display = "flex";
    } else {
      // categoryDiv.current.style.display = "none";
    }
  };

  return (
    <>
      <input
        type="checkbox"
        ref={category}
        checked={isChecked}
        onChange={(e) => handleIsChecked(e)}
      />
      <div style={{ backgroundColor: "black" }} id="Node1">
        <ResponsiveGridLayout
          layouts={getLayout()}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 5, md: 4, sm: 3, xs: 2, xxs: 1 }}
          rowHeight={30}
          width={1000}
          onLayoutChange={handleLayoutChange}
        >
          <div style={{ backgroundColor: "white" }} ref={categoryDiv} key="a">
            Blue Eyes Dragon
          </div>
          <div style={{ backgroundColor: "white" }} key="b">
            Dark Magician
          </div>
          <div style={{ backgroundColor: "white" }} key="c">
            Kuriboh
          </div>
        </ResponsiveGridLayout>
        <button onClick={saveLayouts}>저장</button>
      </div>
    </>
  );
};

export default LayoutSample;
