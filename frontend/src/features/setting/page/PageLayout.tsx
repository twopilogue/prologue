import React, { ChangeEvent, Dispatch, useCallback, useState } from "react";
import Text from "components/Text";
import styles from "../Setting.module.css";

import { Layout } from "react-grid-layout";
import GridLayout from "react-grid-layout";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { PageConfig, editList, selectPageDeleList, setPageDeleList, KeyConfig } from "slices/settingSlice";
import PageLayoutItem from "./PageLayoutItem";

interface Props {
  pageList: PageConfig[];
  layoutList: Layout[];
  pageCnt: number;
  isEdit: editList[];
  deleList: PageConfig[];
  setPageList: Dispatch<React.SetStateAction<PageConfig[]>>;
  setLayoutList: Dispatch<React.SetStateAction<Layout[]>>;
  setPageCnt: Dispatch<React.SetStateAction<number>>;
  setDeleList: Dispatch<React.SetStateAction<PageConfig[]>>;
  setIsEdit: Dispatch<React.SetStateAction<editList[]>>;
}

const PageLayout = ({
  pageList,
  layoutList,
  pageCnt,
  deleList,
  isEdit,
  setPageList,
  setLayoutList,
  setPageCnt,
  setIsEdit,
}: Props) => {
  const [newName, setNewName] = useState<string>("");
  // const deleList: PageConfig[] = useAppSelector(selectPageDeleList);

  const addBox = () => {
    const pageName: string = "새 페이지 " + (pageCnt + 1).toString();
    setPageList(pageList.concat({ label: pageName, posts: false, id: pageCnt, type: "new" }));
    setIsEdit(isEdit.concat({ key: pageName, id: pageCnt, editable: false }));
    setPageCnt(pageCnt + 1);
  };

  const useGettingWidth = () => {
    const [gridWidth, setGridWidth] = useState(null);
    const gridAddRef = useCallback((node: HTMLElement) => {
      if (node !== null) {
        setGridWidth(node.offsetWidth);
      }
    }, []);

    return [gridWidth, gridAddRef];
  };
  const [gridWidth, gridAddRef] = useGettingWidth();

  const handleLayoutChange = (layouts: Layout[]) => {
    const tmpList: Layout[] = [];
    layouts.map((it: Layout) => {
      return tmpList.push({ i: it.i, x: it.x, y: it.y, w: it.w, h: it.h, static: it.static });
    });
    setLayoutList(tmpList);
  };

  const handleEdit = (item: any) => {
    const unable: string[] = ["post", "posts", "blog"];
    if (unable.includes(item.label)) {
      alert("사용 불가능한 페이지명입니다. 다시 입력하세요.");
      return;
    }
    setNewName(item.label); // 이름으로 placeholder
    setIsEdit(
      isEdit.map((it: any) => {
        return it.id === item.id
          ? { key: it.key, id: it.id, editable: true }
          : { key: it.key, id: it.id, editable: false };
      }),
    );
  };

  const handleDele = (item: any) => {
    deleList.push({ label: item.label, id: item.id, posts: item.posts, type: "deleted" });
    setPageList(pageList.filter((it) => it.id !== item.id));
    setPageCnt(pageCnt - 1);
    setIsEdit(isEdit.filter((it) => it.id !== item.id));
    console.log(deleList);
  };

  const handleSave = (item: any) => {
    if (!newName) {
      alert("카테고리명을 입력해주세요.");
      return;
    }
    setPageList(
      pageList.map((it: any) => {
        return it.id === item.id
          ? item.type === "new"
            ? { label: newName, id: it.id, posts: it.posts, type: "new" } // 추가한 것
            : { label: newName, id: it.id, posts: it.posts, type: "changing", oldName: it.label } // 기존 것
          : { label: it.label, id: it.id, posts: it.posts, type: it.type };
      }),
    );
    setIsEdit(
      isEdit.map((it: any) => {
        return it.id === item.id
          ? { key: newName, id: it.id, editable: false }
          : { key: it.key, id: it.id, editable: false };
      }),
    );
  };

  const onChangeEdit = (e: ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  return (
    <div>
      <div className={styles.gridContainer}>
        {pageList.length != 0 ? (
          <GridLayout
            className="layout"
            layout={layoutList}
            rowHeight={45}
            cols={1}
            width={gridWidth + 10}
            isResizable={false}
            onLayoutChange={handleLayoutChange}
          >
            {pageList.map((item: any, i: number) => {
              return (
                <div key={i}>
                  <PageLayoutItem
                    item={item}
                    isEdit={isEdit}
                    newName={newName}
                    onChangeEdit={onChangeEdit}
                    handleSave={handleSave}
                    handleDele={handleDele}
                    handleEdit={handleEdit}
                  />
                </div>
              );
            })}
          </GridLayout>
        ) : (
          <div className={styles.nonCategory}>
            <Text value="생성된 페이지가 없습니다." />
          </div>
        )}

        {pageList.length < 5 ? (
          <>
            <div ref={gridAddRef} className={styles.gridAddButton} onClick={addBox}>
              <AddCircleOutlineIcon fontSize="small" sx={{ p: 1, color: "gray" }} />
              <Text value="페이지 추가하기" type="caption" />
            </div>
          </>
        ) : (
          <div className={styles.gridNonButton}>
            <Text value="페이지를 생성할 수 없습니다." type="caption" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PageLayout;
