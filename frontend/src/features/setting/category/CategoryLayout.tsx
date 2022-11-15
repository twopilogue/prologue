import React, { useState, useCallback, ChangeEvent, useEffect, Dispatch } from "react";
import { Layout } from "react-grid-layout";
import GridLayout from "react-grid-layout";
import styles from "../Setting.module.css";
// import "../../../../node_modules/react-grid-layout/css/styles.css";
import Text from "components/Text";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CategoryLayoutItem from "./CategoryLayoutItem";

import { editList, KeyConfig } from "slices/settingSlice";

interface Props {
  categoryList: KeyConfig[];
  layoutList: Layout[];
  categoryCnt: number;
  isEdit: editList[];
  setCategoryList: Dispatch<React.SetStateAction<KeyConfig[]>>;
  setLayoutList: Dispatch<React.SetStateAction<Layout[]>>;
  setCategoryCnt: Dispatch<React.SetStateAction<number>>;
  setIsEdit: Dispatch<React.SetStateAction<editList[]>>;
}

const CategoryLayout = ({
  categoryList,
  layoutList,
  categoryCnt,
  isEdit,
  setCategoryList,
  setLayoutList,
  setCategoryCnt,
  setIsEdit,
}: Props) => {
  const [newName, setNewName] = useState<string>("");

  const addBox = () => {
    const categoryName: string = "새 카테고리 " + (categoryCnt + 1).toString();

    setCategoryList(categoryList.concat({ key: categoryName, id: categoryCnt }));
    setIsEdit(isEdit.concat({ key: categoryName, id: categoryCnt, editable: false }));
    setCategoryCnt(categoryCnt + 1);
  };

  const handleEdit = (item: any) => {
    console.log(item);
    console.log("카테고리", categoryList);
    console.log("레이아웃", layoutList);
    console.log("개수", categoryCnt);
    console.log("수정", isEdit);
    setNewName(item.key); // 이름으로 placeholder
    setIsEdit(
      isEdit.map((it: any) => {
        return it.id === item.id
          ? { key: it.key, id: it.id, editable: true }
          : { key: it.key, id: it.id, editable: false };
      }),
    );
  };

  const handleDele = (item: number) => {
    setCategoryList(categoryList.filter((it) => it.id !== item));
    // set LayoutList( LayoutList.filter((it) => it.y !== item));
    setCategoryCnt(categoryCnt - 1);
    setIsEdit(isEdit.filter((it) => it.id !== item));
  };

  const handleSave = (item: number) => {
    setCategoryList(
      categoryList.map((it: any) => {
        return it.id === item ? { key: newName, id: it.id } : { key: it.key, id: it.id };
      }),
    );
    setIsEdit(
      isEdit.map((it: any) => {
        return it.id === item
          ? { key: newName, id: it.id, editable: false }
          : { key: it.key, id: it.id, editable: false };
      }),
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
    setLayoutList(tmpList);
  };

  const useGettingWidth = () => {
    const [gridWidth, setGridWidth] = useState(null);

    // ✅  useRef와 useEffect를 지우고 callback ref를 새로 작성
    const gridAddRef = useCallback((node: HTMLElement) => {
      if (node !== null) {
        setGridWidth(node.offsetWidth);
      }
    }, []);

    return [gridWidth, gridAddRef];
  };

  const [gridWidth, gridAddRef] = useGettingWidth();

  useEffect(() => {
    if (categoryList) {
      setIsEdit(
        categoryList.map((it) => {
          console.log("what?");
          return { key: it.key, id: it.id, editable: false };
        }),
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
        {categoryList.length != 0 ? (
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
