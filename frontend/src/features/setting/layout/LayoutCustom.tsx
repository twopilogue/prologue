import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout, Responsive, WidthProvider } from "react-grid-layout";
import GridLayout from "react-grid-layout";
import { useAppSelector } from "app/hooks";
import {
  ComponentConfig,
  initialState,
  selectComponentCreated,
  selectOriginComponentLayoutList,
  selectUserCheckList,
  selectUserComponentLayoutList,
  selectUserComponentList,
  setComponentLayoutList,
  setUserComponentLayoutList,
} from "slices/settingSlice";
import DefaultLayoutStyles from "./DefaultLayoutStyles";
import styles from "../Setting.module.css";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import Text from "components/Text";

const LayoutCustom = (layoutWidth: any) => {
  const dispatch = useDispatch();
  const userComponentList = useAppSelector(selectUserComponentList);
  const userLayoutList = useAppSelector(selectUserComponentLayoutList);
  const userCheckList = useAppSelector(selectUserCheckList);
  const componentCreated = useAppSelector(selectComponentCreated);
  const [tmpLayoutList, setTmpLayoutList] = useState<Layout[]>([]);
  const width = layoutWidth["layoutWidth"];

  const handleLayoutChange = (layouts: any) => {
    if (componentCreated) {
      console.log("요청됨", userLayoutList);
      const tmp: Layout[] = [];
      layouts.map((it: Layout) => {
        it.static
          ? tmp.push({ i: it.i, x: it.x, y: it.y, w: it.w, h: it.h, static: true })
          : tmp.push({ i: it.i, x: it.x, y: it.y, w: it.w, h: it.h });
      });
      dispatch(setUserComponentLayoutList(tmp));
    } else {
      console.log("생성 안 됨!");
    }
  };

  const getLayout = () => {
    return componentCreated ? userLayoutList : tmpLayoutList;
  };

  useEffect(() => {
    console.log("axios 종료 후 1회 실행");
    console.log("componentCreated 변수: ", componentCreated);
    // console.log("origin layout 변수", originLayoutList);
    setTmpLayoutList(userLayoutList);
  }, [componentCreated]);

  return (
    <>
      <GridLayout
        layout={getLayout()}
        cols={6}
        rowHeight={50}
        width={width - 20}
        maxRows={4}
        // verticalCompact={false}
        // preventCollision={true}
        onLayoutChange={handleLayoutChange}
        isDraggable={true}
        isResizable={false}
      >
        {userComponentList.map((item: ComponentConfig, i: number) => {
          {
            return userCheckList[item.id] ? (
              <div className={styles.layout_colored} key={item.key}>
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
              <React.Fragment />
            );
          }
        })}
      </GridLayout>
    </>
  );
};

export default LayoutCustom;
