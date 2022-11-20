import React, { useState, useCallback, ChangeEvent, useEffect, Dispatch } from "react";
import { Layout } from "react-grid-layout";
import GridLayout from "react-grid-layout";
import styles from "../Setting.module.css";
// import "../../../../node_modules/react-grid-layout/css/styles.css";
import Text from "components/Text";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CategoryLayoutItem from "./CategoryLayoutItem";

import {
  selectCategoryCnt,
  selectCategoryLayoutList,
  selectCategoryList,
  selectIsEditCategory,
  setCategoryCnt,
  setCategoryLayoutList,
  setCategoryList,
  setIsEditCategory,
} from "slices/settingSlice";
import { useAppSelector } from "app/hooks";
import { useDispatch } from "react-redux";

const useGettingWidth = () => {
  const [gridWidth, setGridWidth] = useState(null);
  const gridAddRef = useCallback((node: HTMLElement) => {
    if (node !== null) {
      setGridWidth(node.offsetWidth);
    }
  }, []);
  return [gridWidth, gridAddRef];
};

const CategoryLayout = () => {
  const dispatch = useDispatch();
  const [newName, setNewName] = useState<string>("");
  const categoryList = useAppSelector(selectCategoryList);
  const layoutList = useAppSelector(selectCategoryLayoutList);
  const isEdit = useAppSelector(selectIsEditCategory);
  const categoryCnt = useAppSelector(selectCategoryCnt);
  const [gridWidth, gridAddRef] = useGettingWidth();

  const addBox = () => {
    const categoryName: string = "새 카테고리 " + (categoryCnt + 1).toString();
    dispatch(setCategoryList(categoryList.concat({ key: categoryName, id: categoryCnt })));
    dispatch(setIsEditCategory(isEdit.concat({ key: categoryName, id: categoryCnt, editable: false })));
    dispatch(setCategoryCnt(categoryCnt + 1));
  };

  const handleEdit = (item: any) => {
    setNewName(item.key); // 이름으로 placeholder
    dispatch(
      setIsEditCategory(
        isEdit.map((it: any) => {
          return it.id === item.id
            ? { key: it.key, id: it.id, editable: true }
            : { key: it.key, id: it.id, editable: false };
        }),
      ),
    );
  };

  const handleDele = (item: number) => {
    dispatch(setCategoryList(categoryList.filter((it) => it.id !== item)));
    // set LayoutList( LayoutList.filter((it) => it.y !== item));
    dispatch(setCategoryCnt(categoryCnt - 1));
    dispatch(setIsEditCategory(isEdit.filter((it) => it.id !== item)));
  };

  const handleSave = (item: number) => {
    dispatch(
      setCategoryList(
        categoryList.map((it: any) => {
          return it.id === item ? { key: newName, id: it.id } : { key: it.key, id: it.id };
        }),
      ),
    );
    dispatch(
      setIsEditCategory(
        isEdit.map((it: any) => {
          return it.id === item
            ? { key: newName, id: it.id, editable: false }
            : { key: it.key, id: it.id, editable: false };
        }),
      ),
    );
  };

  const onChangeEdit = (e: ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const handleLayoutChange = (layouts: Layout[]) => {
    const tmpList: Layout[] = [];
    layouts.map((it: Layout) => {
      return tmpList.push({ i: it.i, x: it.x, y: it.y, w: it.w, h: it.h, static: it.static });
    });
    dispatch(setCategoryLayoutList(tmpList));
  };

  useEffect(() => {
    if (categoryList) {
      dispatch(
        setIsEditCategory(
          categoryList.map((it) => {
            return { key: it.key, id: it.id, editable: false };
          }),
        ),
      );
    }
  }, []);

  return (
    <div>
      <div className={styles.textPadding} style={{ paddingTop: "0", paddingBottom: "10px" }}>
        <Text value="카테고리 설정" type="groupTitle" bold />
      </div>
      <div style={{ paddingLeft: "20px" }}>
        <Text value="드래그 앤 드롭으로 카테고리 순서를 변경할 수 있습니다." type="caption" />
      </div>

      <div className={styles.gridContainer}>
        {categoryList.length !== 0 ? (
          <GridLayout
            className="layout"
            layout={layoutList}
            rowHeight={45}
            cols={1}
            width={gridWidth + 10}
            isResizable={false}
            onLayoutChange={handleLayoutChange}
          >
            {categoryList.map((item: any, i: number) => {
              return (
                <div key={i}>
                  <CategoryLayoutItem
                    item={item}
                    isEdit={isEdit}
                    newName={newName}
                    onChangeEdit={onChangeEdit}
                    handleSave={handleSave}
                    handleEdit={handleEdit}
                    handleDele={handleDele}
                  />
                </div>
              );
            })}
          </GridLayout>
        ) : (
          <div className={styles.nonCategory}>
            <Text value="생성된 카테고리가 없습니다." />
          </div>
        )}
        <div ref={gridAddRef} className={styles.gridAddButton} onClick={addBox}>
          <AddCircleOutlineIcon fontSize="small" sx={{ p: 1, color: "gray" }} />
          <Text value="카테고리 추가하기" type="caption" />
        </div>
      </div>
    </div>
  );
};

export default CategoryLayout;

/*
카테고리 아이템 레이아웃

<div className={styles.gridCategoryItem} key="a">
  <MenuIcon fontSize="small" sx={{ p: 1 }} />
  <Text value="카테고리1" type="caption" />
</div>
*/
