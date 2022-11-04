import React, { useCallback, useState } from "react";
import Text from "components/Text";
import styles from "./Setting.module.css";

import { Layout } from "react-grid-layout";
import GridLayout from "react-grid-layout";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppSelector } from "app/hooks";
import {
  PageConfig,
  selectPageLayoutList,
  selectPageList,
  selectPageCnt,
} from "slices/settingSlice";

const PageLayout = () => {
  const pageLayout = useAppSelector(selectPageLayoutList);
  const pageList = useAppSelector(selectPageList);
  const pageCnt = useAppSelector(selectPageCnt);

  const [tmpPageCnt, setTmpPageCnt] = useState(pageCnt);
  const [tmpPageLayout, setTmpPageLayout] = useState<Layout[]>([...pageLayout]);
  const [tmpPageList, setTmpPageList] = useState<PageConfig[]>([...pageList]);

  const addBox = () => {
    const pageName = "새 페이지 " + tmpPageCnt;
    tmpPageList.push({ key: pageName });
    tmpPageLayout.push({
      i: pageName,
      x: tmpPageCnt + 1,
      y: 0,
      w: 1,
      h: 2,
      isResizable: false,
    });
    setTmpPageList(tmpPageList);
    setTmpPageLayout(tmpPageLayout);
    setTmpPageCnt(tmpPageCnt + 1);
  };

  const useGettingWidth = () => {
    const [gridWidth, setGridWidth] = useState(null);

    // ✅  useRef와 useEffect를 지우고 callback ref를 새로 작성
    const gridAddRef = useCallback((node: HTMLElement) => {
      if (node !== null) {
        // setGridWidth(node);
        console.log(node.offsetWidth);
        setGridWidth(node.offsetWidth);
      }
    }, []);

    return [gridWidth, gridAddRef];
  };

  const [gridWidth, gridAddRef] = useGettingWidth();

  return (
    <div>
      <div
        className={styles.textPadding}
        style={{ paddingTop: "0", paddingBottom: "10px" }}
      >
        <Text value="페이지 설정" type="groupTitle" bold />
      </div>
      <div style={{ paddingLeft: "20px" }}>
        <Text
          value="드래그 앤 드롭으로 페이지 순서를 변경할 수 있습니다."
          type="caption"
        />
      </div>

      <div className={styles.gridContainer}>
        {tmpPageList.length != 0 ? (
          <GridLayout
            className="layout"
            layout={tmpPageLayout}
            rowHeight={45}
            margin={[5, 5]}
            cols={1}
            width={gridWidth + 10}
          >
            {tmpPageList.map((item: any, i: number) => {
              return (
                <div key={i}>
                  <div className={styles.gridCategoryItem} key={item.key}>
                    <MenuIcon fontSize="small" sx={{ p: 1 }} />
                    <Text value={item.key} type="caption" />
                  </div>
                </div>
              );
            })}
          </GridLayout>
        ) : (
          <div className={styles.nonCategory}>
            <Text value="생성된 페이지가 없습니다." />
          </div>
        )}
        <div ref={gridAddRef} className={styles.gridAddButton} onClick={addBox}>
          <AddCircleOutlineIcon fontSize="small" sx={{ p: 1, color: "gray" }} />
          <Text value="페이지 추가하기" type="caption" />
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
