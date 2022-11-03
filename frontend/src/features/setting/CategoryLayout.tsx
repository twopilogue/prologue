import React, { useState } from "react";
import { Layout, Responsive, WidthProvider } from "react-grid-layout";
import GridLayout from "react-grid-layout";
import styles from "./Setting.module.css";
import Text from "components/Text";
import shortid from "shortid";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppSelector } from "app/hooks";
import {
  selectCategoryCnt,
  selectCategoryList,
  selectLayoutList,
  setLayoutList,
  setCategoryList,
  setCategoryCnt,
  CategoryConfig,
} from "slices/settingSlice";
import { useDispatch } from "react-redux";
import ButtonStyled from "components/Button";

const CategoryLayout = () => {
  const categoryList = useAppSelector(selectCategoryList);
  const layoutList = useAppSelector(selectLayoutList);
  const categoryCnt = useAppSelector(selectCategoryCnt);

  const [tmpCategoryList, setTmpCategoryList] = useState<CategoryConfig[]>([
    ...categoryList,
  ]);
  const [tmpLayoutList, setTmpLayoutList] = useState<Layout[]>([...layoutList]);
  const [tmpCategoryCnt, setTmpCategoryCnt] = useState(categoryCnt);

  const dispatch = useDispatch();

  const addBox = () => {
    const categoryName = shortid.generate();
    console.log(categoryName);

    tmpCategoryList.push({ key: categoryName });
    tmpLayoutList.push({
      i: categoryName,
      x: tmpCategoryCnt + 1,
      y: 0,
      w: 1,
      h: 2,
      isResizable: false,
    });
    setTmpCategoryList(tmpCategoryList);
    setTmpLayoutList(tmpLayoutList);
    setTmpCategoryCnt(tmpCategoryCnt + 1);
  };

  const saveCategoryList = () => {
    dispatch(setCategoryList(tmpCategoryList));
    dispatch(setLayoutList(tmpLayoutList));
    dispatch(setCategoryCnt(tmpCategoryCnt));
    console.log("카테고리", tmpCategoryList);
    console.log("레이아웃", tmpLayoutList);
  };

  return (
    <div style={{ margin: "20px" }}>
      <div className={styles.grid_container}>
        <div className={styles.flexContainer}>
          <div
            className={styles.textPadding}
            style={{ paddingTop: "0", paddingBottom: "10px" }}
          >
            <Text value="카테고리 설정" type="groupTitle" bold />
          </div>
          <div style={{ paddingLeft: "20px" }}>
            <Text
              value="드래그 앤 드롭으로 카테고리 순서를 변경할 수 있습니다."
              type="caption"
            />
          </div>

          <div className={styles.gridContainer}>
            <GridLayout
              className="layout"
              layout={tmpLayoutList}
              cols={1}
              rowHeight={20}
              width={360}
              margin={[5, 5]}
            >
              <div className={styles.gridCategoryItem} key="a">
                <MenuIcon fontSize="small" sx={{ p: 1 }} />
                <Text value="카테고리1" type="caption" />
              </div>
              <div className={styles.gridCategoryItem} key="b">
                <MenuIcon fontSize="small" sx={{ p: 1 }} />
                <Text value="카테고리2" type="caption" />
              </div>
              <div className={styles.gridCategoryItem} key="c">
                <MenuIcon fontSize="small" sx={{ p: 1 }} />
                <Text value="카테고리3" type="caption" />
              </div>
              {tmpCategoryList.map((item: any, i: number) => {
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
            <div className={styles.gridAddButton} onClick={addBox}>
              <AddCircleOutlineIcon
                fontSize="small"
                sx={{ p: 1, color: "gray" }}
              />
              <Text value="카테고리 추가하기" type="caption" />
            </div>
          </div>
        </div>
      </div>
      <div>
        <ButtonStyled label="저장" onClick={saveCategoryList} />
      </div>
    </div>
  );
};

export default CategoryLayout;
