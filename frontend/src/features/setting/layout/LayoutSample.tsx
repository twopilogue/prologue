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
      setLayoutWidth(node.offsetWidth);
    }
  }, []);

  return [layoutWidth, layoutContainer];
};

const LayoutSample = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const [layoutList, setLayoutList] = useState<Layout[]>([
    { i: "블로그 로고", x: 0, y: 0, w: 1, h: 2, isResizable: false },
    { i: "프로필", x: 0, y: 2, w: 1, h: 3, isResizable: false },
    { i: "카테고리", x: 0, y: 5, w: 1, h: 4, isResizable: false },
    { i: "페이지", x: 1, y: 0, w: 4, h: 2, isResizable: false },

    { i: "타이틀", x: 1, y: 2, w: 4, h: 5, static: true, isResizable: false },
    { i: "글 목록", x: 1, y: 7, w: 4, h: 6, static: true, isResizable: false },
  ]);
  const [componentList, setComponentList] = useState<ComponentConfig[]>(useAppSelector(selectComponentList));
  const [checkList, setCheckList] = useState<ComponentCheckConfig>(useAppSelector(selectCheckList));

  const [layoutWidth, layoutContainer] = useGettingWidth();

  const handleLayoutChange = (layouts: any) => {
    const tmpLayoutList: Layout[] = [];
    console.log(layouts);
    // 변경된 레이아웃
    for (let i = 0; i < layouts.length; i++) {
      const layout: Layout = {
        i: layouts[i].i,
        x: layouts[i].x,
        y: layouts[i].y,
        w: layouts[i].w,
        h: layouts[i].h,
        static: layouts[i].static,
        isDraggable: layouts[i].isDraggable,
        isResizable: layouts[i].isResizable,
      };
      tmpLayoutList.push(layout);
      console.log("저장할라는거", layout);
    }
    dispatch(setComponentLayoutList(tmpLayoutList));
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
            layout={layoutList}
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
      <ConfirmButton type="layoutSetting" payload={{ checkList, layoutList }} />
    </div>
  );
};

export default LayoutSample;
