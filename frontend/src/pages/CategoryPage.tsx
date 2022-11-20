import CategoryCntSetting from "features/setting/category/CategoryCntSetting";
import CategoryLayout from "features/setting/category/CategoryLayout";
import React, { useEffect, useState } from "react";
import { Layout } from "react-grid-layout";
import { KeyConfig, editList } from "slices/settingSlice";
import ButtonStyled from "components/Button";
import styles from "features/setting/Setting.module.css";
import Axios from "api/JsonAxios";
import api from "api/Api";
import { useSelector } from "react-redux";
import { rootState } from "app/store";
import Modal from "components/Modal";

const CategoryPage = () => {
  const { githubId, accessToken } = useSelector((state: rootState) => state.auth);
  const [categoryList, setCategoryList] = useState<KeyConfig[]>([]);
  const [layoutList, setLayoutList] = useState<Layout[]>([]);
  const [isEdit, setIsEdit] = useState<editList[]>([]);
  const [categoryCnt, setCategoryCnt] = useState<number>(0);
  const [saveModalOpen, setSaveModalOpen] = useState<boolean>(false);

  const getCategory = async () => {
    await Axios.get(api.setting.getCategory(accessToken, githubId))
      .then((res: any) => {
        const response = res.data.category;
        const tmpList: KeyConfig[] = [];
        for (let i = 0; i < response.length; i++) {
          tmpList.push({ key: response[i], id: i });
        }
        setCategoryList(tmpList);
        setCategoryCnt(response.length);

        if (tmpList) {
          setIsEdit(
            tmpList.map((it) => {
              return { key: it.key, id: it.id, editable: false };
            }),
          );
        }
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  const saveCategoryList = () => {
    console.log("카테고리", categoryList);
    console.log("레이아웃", layoutList);
    // 병합
    const map = new Map();
    layoutList.forEach((item) => map.set(parseInt(item.i), item));
    categoryList.forEach((item) => map.set(item.id, { ...map.get(item.id), ...item }));
    const merged = Array.from(map.values());
    console.log(merged);

    // 정렬
    const sorted = merged.sort((a, b) => a.y - b.y);
    console.log(sorted);
    const result: string[] = [];

    sorted.map((item) => result.push(item.key));
    sendCategory(result);
  };

  const sendCategory = async (result: string[]) => {
    await Axios.put(api.setting.modifyCategory(), {
      accessToken: accessToken,
      githubId: githubId,
      category: result,
    })
      .then((res: any) => {
        console.log("됨? ", res);
        alert("저장되었습니다.");
        setSaveModalOpen(false);
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  const showSaveModal = () => {
    setSaveModalOpen(true);
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
      <div>
        <CategoryLayout
          categoryList={categoryList}
          layoutList={layoutList}
          categoryCnt={categoryCnt}
          isEdit={isEdit}
          setCategoryList={setCategoryList}
          setLayoutList={setLayoutList}
          setCategoryCnt={setCategoryCnt}
          setIsEdit={setIsEdit}
        />
        <CategoryCntSetting />
      </div>
      <div className={styles.confirmButton}>
        <div style={{ margin: "10px" }}>
          <ButtonStyled color="sky" label="취소" />
        </div>
        <div style={{ margin: "10px" }}>
          <ButtonStyled label="저장" onClick={showSaveModal} />
        </div>
      </div>
      {saveModalOpen && (
        <Modal
          text={`작성한 정보를 저장하시겠습니까?`}
          twoButtonCancle={() => setSaveModalOpen(false)}
          twoButtonConfirm={saveCategoryList}
        />
      )}
    </>
  );
};

export default CategoryPage;
