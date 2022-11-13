import React, { useState, useCallback, ChangeEvent, useEffect, Dispatch } from "react";
import { Layout } from "react-grid-layout";
import GridLayout from "react-grid-layout";
import styles from "../Setting.module.css";
// import "../../../../node_modules/react-grid-layout/css/styles.css";
import Text from "components/Text";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CategoryLayoutItem from "./CategoryLayoutItem";
import ButtonStyled from "components/Button";
import MenuIcon from "@mui/icons-material/Menu";
import { KeyConfig } from "slices/settingSlice";

export interface editList {
  key: string;
  id: number;
  editable: boolean;
}

interface Props {
  categoryList: KeyConfig[];
  layoutList: Layout[];
  categoryCnt: number;
  setCategoryList: Dispatch<React.SetStateAction<KeyConfig[]>>;
  setLayoutList: Dispatch<React.SetStateAction<Layout[]>>;
  setCategoryCnt: Dispatch<React.SetStateAction<number>>;
}

const CategoryLayout = ({
  categoryList,
  layoutList,
  categoryCnt,
  setCategoryList,
  setLayoutList,
  setCategoryCnt,
}: Props) => {
  const [isEdit, setIsEdit] = useState<editList[]>([]);
  const [newName, setNewName] = useState<string>("");

  const addBox = () => {
    const categoryName: string = "새 카테고리 " + (categoryCnt + 1).toString();

    setCategoryList(categoryList.concat({ key: categoryName, id: categoryCnt }));
    setIsEdit(isEdit.concat({ key: categoryName, id: categoryCnt, editable: false }));
    setCategoryCnt(categoryCnt + 1);
  };

  const saveCategoryList = () => {
    console.log("카테고리", categoryList);
    console.log("레이아웃", layoutList);
  };

  const handleEdit = (item: any) => {
    console.log(item);
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

  const handleOnLayoutChange = (layouts: any) => {
    const List: Layout[] = [];
    // 변경된 레이아웃
    for (let i = 0; i < layouts.length; i++) {
      const layout: Layout = {
        i: layouts[i].i,
        x: layouts[i].x,
        y: layouts[i].y,
        w: layouts[i].w,
        h: layouts[i].h,
        static: layouts[i].static,
        isDraggable: layouts[i].isDraggable,
        isResizable: layouts[i].isResizable,
      };
      List.push(layout);
    }
    setLayoutList(List);
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

  useEffect(() => {
    setIsEdit(
      categoryList.map((it) => {
        return { key: it.key, id: it.id, editable: false };
      }),
    );
  }, []);

  useEffect(() => {
    console.log("수정여부", isEdit);
    console.log("카테고리", categoryList);
  }, [isEdit]);

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
            onLayoutChange={handleOnLayoutChange}
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
      <div className={styles.confirmButton}>
        <div style={{ margin: "10px" }}>
          <ButtonStyled color="sky" label="취소" />
        </div>
        <div style={{ margin: "10px" }}>
          <ButtonStyled label="저장" onClick={saveCategoryList} />
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
