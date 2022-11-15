import React, { useCallback, useState } from "react";
import Text from "components/Text";
import styles from "../Setting.module.css";

import { Layout } from "react-grid-layout";
import GridLayout from "react-grid-layout";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppSelector } from "app/hooks";
import { selectPageLayoutList, selectPageList, selectPageCnt, PageConfig } from "slices/settingSlice";
import ButtonStyled from "components/Button";

const PageLayout = () => {
  const pageLayout = useAppSelector(selectPageLayoutList);
  const pageList = useAppSelector(selectPageList);
  const pageCnt = useAppSelector(selectPageCnt);

  const addBox = () => {
    const pageName: string = "새 페이지 " + pageCnt;
    // tmpPageList.push({ key: pageName, id: tmpPageCnt + 1 });
    // tmpPageLayout.push({
    //   i: pageName,
    //   x: tmpPageCnt + 1,
    //   y: 0,
    //   w: 1,
    //   h: 2,
    //   isResizable: false,
    // });
    // setTmpPageList(tmpPageList);
    // setTmpPageLayout(tmpPageLayout);
    // setTmpPageCnt(tmpPageCnt + 1);
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

  const handleOnSave = () => {
    const di = 1;
  };

  return (
    <div>
      <div className={styles.gridContainer}>
        {pageList.length != 0 ? (
          <GridLayout
            className="layout"
            layout={pageLayout}
            rowHeight={45}
            margin={[5, 5]}
            cols={1}
            width={gridWidth + 10}
          >
            {pageList.map((item: any, i: number) => {
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
      <div className={styles.confirmButton}>
        <div style={{ margin: "10px" }}>
          <ButtonStyled color="sky" label="취소" />
        </div>
        <div style={{ margin: "10px" }}>
          <ButtonStyled label="저장" onClick={handleOnSave} />
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
