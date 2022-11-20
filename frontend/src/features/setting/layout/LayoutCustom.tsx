import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Layout } from "react-grid-layout";
import GridLayout from "react-grid-layout";
import { useAppSelector } from "app/hooks";
import {
  ComponentConfig,
  selectUserCheckList,
  selectUserComponentLayoutList,
  selectOrigin,
  selectUserComponentList,
  selectComponentCreated,
  setUserComponentLayoutList,
  setUserComponentList,
  setUserCheckList,
  setClickedLayoutIdx,
} from "slices/settingSlice";
import styles from "../Setting.module.css";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import Text from "components/Text";

const LayoutCustom = (layoutWidth: any) => {
  const dispatch = useDispatch();
  const userComponentList = useAppSelector(selectUserComponentList);
  const userLayoutList = useAppSelector(selectUserComponentLayoutList);
  const origin = useAppSelector(selectOrigin);
  const userCheckList = useAppSelector(selectUserCheckList);
  const componentCreated = useAppSelector(selectComponentCreated);
  const [tmpLayoutList, setTmpLayoutList] = useState<Layout[]>([]);
  const width = layoutWidth["layoutWidth"];

  const handleLayoutChange = (layouts: any) => {
    if (componentCreated) {
      const tmp: Layout[] = [];
      layouts.map((it: Layout) => {
        it.static
          ? tmp.push({ i: it.i, x: it.x, y: it.y, w: it.w, h: it.h, static: true })
          : tmp.push({ i: it.i, x: it.x, y: it.y, w: it.w, h: it.h });
      });
      dispatch(setUserComponentLayoutList(tmp));
    }
  };

  const saveCurrentLayout = () => {
    const newHeight = (document.querySelector(".react-grid-layout") as HTMLElement).offsetHeight;
  };

  const getLayout = () => {
    return componentCreated ? userLayoutList : tmpLayoutList;
  };

  useEffect(() => {
    setTmpLayoutList(userLayoutList);
  }, [componentCreated]);

  useEffect(() => {
    return () => {
      if (userComponentList.length > 0) {
        dispatch(setUserComponentLayoutList(origin.originComponentLayoutList));
        dispatch(setUserComponentList(origin.originComponentList));
        dispatch(setUserCheckList(origin.originCheckList));
      }
    };
  }, [componentCreated]);

  return (
    <>
      <GridLayout
        layout={getLayout()}
        cols={6}
        rowHeight={50}
        width={width - 80}
        maxRows={4}
        // verticalCompact={false}
        // preventCollision={true} // If true, grid items won't change position when being dragged over.
        onLayoutChange={handleLayoutChange}
        onDragStart={saveCurrentLayout}
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
