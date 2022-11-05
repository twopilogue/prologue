import { useAppSelector } from "app/hooks";
import React, { useEffect, useState, useRef } from "react";
import { Layout, Responsive, WidthProvider } from "react-grid-layout";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ComponentCheckConfig,
  ComponentConfig,
  selectCategoryLayoutList,
  selectCheckList,
  // selectCheckList,
  SelectComponentList,
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

  const [componentLayoutList, SetComponentLayoutList] = useState<Layout[]>(useAppSelector(selectCategoryLayoutList));
  const [componentList, setComponentList] = useState<ComponentConfig[]>(useAppSelector(SelectComponentList));
  const [checkList, setCheckList] = useState<ComponentCheckConfig>(useAppSelector(selectCheckList));

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
        <Text value="드래그 앤 드롭으로 레이아웃의 위치를 자유롭게 설정하세요." type="caption" />
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
            layouts={{ lg: componentLayoutList }}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 5, md: 4, sm: 3, xs: 2, xxs: 1 }}
            rowHeight={30}
            width={1000}
            onLayoutChange={handleLayoutChange}
          >
            {componentList.map((item: any, i: number) => {
              return (
                <div key={i}>
                  {checkList.{ㅑㅅㄷ} ? (
                    <div className={item.isChecked ? `styles.${item.key}` : styles.display_none} key={item.key}>
                      {item.key}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              );
            })}
          </ResponsiveGridLayout>
        </div>
      </div>
    </div>
  );
};

export default LayoutSample;
