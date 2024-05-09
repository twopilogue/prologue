import { useState, useCallback, ChangeEvent } from "react";
import GridLayout, { Layout } from "react-grid-layout";
import styles from "styles/Setting.module.css";
import Text from "components/Text";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CategoryLayoutItem from "./CategoryLayoutItem";
import { useShallow } from "zustand/react/shallow";
import { KeyConfig } from "interfaces/setting.interface";
import { useSettingActions, useSettingStore } from "stores/settingStore";

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
  const [newName, setNewName] = useState<string>("");
  const [layoutList, categoryList, isEdit, categoryCnt] = useSettingStore(
    useShallow((state) => [state.categoryLayoutList, state.categoryList, state.isEditCategory, state.categoryCnt]),
  );
  const { setCategoryLayoutListAction, setCategoryListAction, setCategoryCntAction, setIsEditCategoryAction } =
    useSettingActions();
  const [gridWidth, gridAddRef] = useGettingWidth();

  const addBox = () => {
    const categoryName: string = "새 카테고리 " + (categoryCnt + 1).toString();
    setCategoryListAction([...categoryList, { key: categoryName, id: categoryCnt }]);
    setIsEditCategoryAction([...isEdit, { key: categoryName, id: categoryCnt, editable: false }]);
    setCategoryCntAction(categoryCnt - 1);
  };

  const handleEdit = (item: KeyConfig) => {
    setNewName(item.key); // 이름으로 placeholder
    setIsEditCategoryAction(
      isEdit.map((it) => {
        return it.id === item.id ? { ...it, editable: true } : { ...it };
      }),
    );
  };

  const handleDele = (id: number) => {
    setCategoryListAction(categoryList.filter((it) => it.id !== id));
    setIsEditCategoryAction(isEdit.filter((it) => it.id !== id));
    setCategoryCntAction(categoryCnt - 1);
  };

  const handleSave = (id: number) => {
    setCategoryListAction(
      categoryList.map((it) => {
        return it.id === id ? { ...it, key: newName } : { ...it };
      }),
    );

    setIsEditCategoryAction(
      isEdit.map((it) => {
        return it.id === id ? { ...it, key: newName, editable: false } : { ...it };
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
    setCategoryLayoutListAction(tmpList);
  };

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
            {categoryList.map((item, i) => {
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
