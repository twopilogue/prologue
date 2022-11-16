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
  selectComponentList,
  setComponentLayoutList,
  selectClickedLayoutIdx,
} from "slices/settingSlice";
import ComponentSelector from "../layout/ComponentSelector";
import styles from "../Setting.module.css";
import "../../../../node_modules/react-grid-layout/css/styles.css";
import Text from "components/Text";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import DefaultLayoutStyles from "./DefaultLayoutStyles";

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

  const [cstLayoutList, setCstLayoutList] = useState<Layout[]>([]);
  const [componentList, setComponentList] = useState<ComponentConfig[]>(useAppSelector(selectComponentList));
  const clickedIdx = useAppSelector(selectClickedLayoutIdx);
  const [isCust, setIsCust] = useState<boolean>(false);
  const [layoutWidth, layoutContainer] = useGettingWidth();
  const DefaultLayoutList = DefaultLayoutStyles();

  const getLayout = () => {
    return DefaultLayoutList[clickedIdx - 1].layout;
  };

  const handleLayoutChange = (layouts: any) => {
    const tmpLayoutList: Layout[] = [];
    // 변경된 레이아웃
    for (let i = 0; i < layouts.length; i++) {
      const layout: Layout = {
        i: layouts[i].i,
        x: layouts[i].x,
        y: layouts[i].y,
        w: layouts[i].w,
        h: layouts[i].h,
        static: layouts[i].static,
      };
      tmpLayoutList.push(layout);
    }
    dispatch(setComponentLayoutList(tmpLayoutList));
  };

  useEffect(() => {
    DefaultLayoutList[clickedIdx - 1].id === 7 ? setIsCust(true) : setIsCust(false);
  }, [clickedIdx]);

  return (
    <div>
      <div className={styles.textPadding} style={{ paddingBottom: "10px" }}>
        <Text value="레이아웃 배치" type="groupTitle" bold />
      </div>
      <div style={{ paddingLeft: "20px" }}>
        <Text value="드래그 앤 드롭으로 레이아웃의 위치를 자유롭게 설정하세요." type="caption" />
      </div>
      <div className={isCust ? `` : `${styles.layoutSelectOneContainer}`}>
        <div className={isCust ? `${styles.layoutSelectContainer}` : `${styles.layoutSelectContainerOne}`}>
          {isCust ? <ComponentSelector /> : <></>}
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
              layout={getLayout()}
              cols={isCust ? 6 : 5}
              rowHeight={50}
              width={layoutWidth - 20}
              verticalCompact={isCust}
              preventCollision={!isCust}
              onLayoutChange={handleLayoutChange}
              isDraggable={isCust}
              isResizable={false}
            >
              {componentList.map((item: ComponentConfig, i: number) => {
                {
                  return DefaultLayoutList[clickedIdx - 1].checkList[item.id] ? (
                    <div className={styles.layout_colored} key={item.key}>
                      {item.key != "타이틀" && item.key != "글 목록" && isCust ? (
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
                    <React.Fragment />
                  );
                }
              })}
            </GridLayout>
          </div>
        </div>
      </div>
      {/* {<ConfirmButton type="layoutSetting" payload={{ checkList, layoutList }} /> */}
    </div>
  );
};

export default LayoutSample;
