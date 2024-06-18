import { Fragment } from "react";
import GridLayout, { Layout } from "react-grid-layout";
import styles from "styles/Setting.module.css";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import Text from "components/Text";
import { useSettingActions, useSettingStore } from "stores/settingStore";
import { useShallow } from "zustand/react/shallow";

const LayoutCustom = (layoutWidth: any) => {
  const [userLayoutList, userCompList, userCompCheck, componentCreated] = useSettingStore(
    useShallow((state) => [state.userCompLayoutList, state.userCompList, state.userCompCheck, state.componentCreated]),
  );
  const { setUserCompLayoutListAction } = useSettingActions();

  const width = layoutWidth["layoutWidth"];

  const handleLayoutChange = (layouts: Layout[]) => {
    if (componentCreated) {
      const tmp: Layout[] = [];
      layouts.map((it) => {
        it.static ? tmp.push({ ...it, static: true }) : tmp.push(it);
      });
      setUserCompLayoutListAction(tmp);
    }
  };

  return (
    <>
      <GridLayout
        layout={userLayoutList}
        cols={6}
        rowHeight={50}
        width={width - 80}
        maxRows={4}
        // verticalCompact={false}
        // preventCollision={true} // If true, grid items won't change position when being dragged over.
        onLayoutChange={handleLayoutChange}
        isDraggable={true}
        isResizable={false}
      >
        {userCompList.map((item) => {
          {
            return userCompCheck[item.id] ? (
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
              <Fragment />
            );
          }
        })}
      </GridLayout>
    </>
  );
};

export default LayoutCustom;
