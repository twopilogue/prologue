import { useAppSelector } from "app/hooks";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { Layout, Responsive, WidthProvider } from "react-grid-layout";
import GridLayout from "react-grid-layout";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ComponentCheckConfig,
  ComponentConfig,
  selectCheckList,
  // selectCheckList,
  selectComponentList,
  selectComponentLayoutList,
  setCategoryLayoutList,
  setComponentLayoutList,
} from "slices/settingSlice";
import ComponentSelector from "../layout/ComponentSelector";
import styles from "../Setting.module.css";
import "../../../../node_modules/react-grid-layout/css/styles.css";
import Text from "components/Text";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import ConfirmButton from "../ConfirmButton";

export const useGettingWidth = () => {
  const [layoutWidth, setLayoutWidth] = useState(null);

  // ✅  useRef와 useEffect를 지우고 callback ref를 새로 작성
  const layoutContainer = useCallback((node: HTMLElement) => {
    if (node !== null) {
      // setGridWidth(node);
      console.log(node.offsetWidth);
      setLayoutWidth(node.offsetWidth);
    }
  }, []);

  return [layoutWidth, layoutContainer];
};

const LayoutSample = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const [componentLayoutList, SetComponentLayoutList] = useState<Layout[]>(useAppSelector(selectComponentLayoutList));
  const [componentList, setComponentList] = useState<ComponentConfig[]>(useAppSelector(selectComponentList));
  const [checkList, setCheckList] = useState<ComponentCheckConfig>(useAppSelector(selectCheckList));

  const [layoutWidth, layoutContainer] = useGettingWidth();

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
    console.log(componentLayoutList);
    setComponentLayoutList(componentLayoutList);
    dispatch(setComponentLayoutList(componentLayoutList));
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
          ref={layoutContainer}
          style={{
            backgroundColor: "white",
            border: "2px solid #ECECEC",
            marginLeft: "5px",
            marginRight: "5px",
            paddingBottom: "20px",
          }}
        >
          <GridLayout
            layout={componentLayoutList}
            cols={6}
            rowHeight={30}
            width={layoutWidth - 10}
            onLayoutChange={handleLayoutChange}
          >
            {componentList.map((item: ComponentConfig) => {
              {
                return checkList[item.id] ? (
                  <div className={styles.display_logo} key={item.key}>
                    {item.key != "타이틀" && item.key != "글 목록" ? (
                      <div className={styles.icon}>
                        <DragHandleIcon fontSize="small" sx={{ color: "white" }} />
                      </div>
                    ) : (
                      <div style={{ marginTop: "15px" }}></div>
                    )}
                    <div className={styles.innerText}>
                      <Text value={item.key} type="caption" color="gray" />
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
      <ConfirmButton type="layoutSetting" payload={{ checkList, componentLayoutList }} />
    </div>
  );
};

export default LayoutSample;
