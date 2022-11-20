import { useAppSelector } from "app/hooks";
import React, { useEffect, useState, useCallback } from "react";
import { selectClickedLayoutIdx } from "slices/settingSlice";
import ComponentSelector from "../layout/ComponentSelector";
import styles from "../Setting.module.css";
import "../../../../node_modules/react-grid-layout/css/styles.css";
import Text from "components/Text";
import LayoutCustom from "./LayoutCustom";
import LayoutSample from "./LayoutSample";

export const useGettingWidth = () => {
  const [layoutWidth, setLayoutWidth] = useState(null);
  // const [layoutHeight, setLayoutHeight] = useState(null);

  // ✅  useRef와 useEffect를 지우고 callback ref를 새로 작성
  const layoutContainer = useCallback((node: HTMLElement) => {
    if (node !== null) {
      setLayoutWidth(node.offsetWidth);
      // setLayoutHeight(node.offsetHeight);
    }
  }, []);

  return [layoutWidth, layoutContainer];
};

const LayoutContainer = () => {
  const clickedIdx = useAppSelector(selectClickedLayoutIdx);
  const [isCust, setIsCust] = useState<boolean>(false);
  const [layoutWidth, layoutContainer] = useGettingWidth();

  useEffect(() => {
    clickedIdx === 0 ? setIsCust(true) : setIsCust(false);
  }, [clickedIdx]);

  return (
    <div>
      <div className={styles.textPadding} style={{ paddingBottom: "10px" }}>
        <Text value="레이아웃 배치" type="groupTitle" bold />
      </div>
      <div style={{ paddingLeft: "20px" }}>
        {isCust ? (
          <Text value="드래그 앤 드롭으로 레이아웃의 위치를 자유롭게 설정하세요." type="caption" />
        ) : (
          <Text value="기본으로 제공되는 레이아웃을 사용할 수 있습니다." type="caption" />
        )}
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
            {isCust ? <LayoutCustom layoutWidth={layoutWidth} /> : <LayoutSample layoutWidth={layoutWidth} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutContainer;
