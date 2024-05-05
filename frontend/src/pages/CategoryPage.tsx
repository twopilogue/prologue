import CategoryLayout from "features/setting/category/CategoryLayout";
import { useState } from "react";
import { selectCategoryList, selectCategoryLayoutList } from "slices/settingSlice";
import ButtonStyled from "components/Button";
import styles from "features/setting/Setting.module.css";
import Modal from "components/Modal";
import { useAppSelector } from "app/hooks";
import { modifyCategoryApi } from "apis/api/setting";
import { useAuthStore } from "stores/authStore";
import { useShallow } from "zustand/react/shallow";

const CategoryPage = () => {
  const [accessToken, githubId] = useAuthStore(useShallow((state) => [state.accessToken, state.githubId]));
  const categoryList = useAppSelector(selectCategoryList);
  const layoutList = useAppSelector(selectCategoryLayoutList);
  const [saveModalOpen, setSaveModalOpen] = useState<boolean>(false);
  const [loadingModalOpen, setLoadingModalOpen] = useState<boolean>(false);
  const [finModalOpen, setFinModalOpen] = useState<boolean>(false);

  const saveCategoryList = () => {
    setSaveModalOpen(false);
    setLoadingModalOpen(true);
    // 병합
    const map = new Map();
    layoutList.forEach((item) => map.set(parseInt(item.i), item));
    categoryList.forEach((item) => map.set(item.id, { ...map.get(item.id), ...item }));
    const merged = Array.from(map.values());

    // 정렬
    const sorted = merged.sort((a, b) => a.y - b.y);
    const result: string[] = [];

    sorted.map((item) => result.push(item.key));
    sendCategory(result);
  };

  const sendCategory = async (category: string[]) => {
    const statusCode = await modifyCategoryApi(accessToken, githubId, category);
    if (statusCode === 200) {
      setLoadingModalOpen(false);
      setFinModalOpen(true);
    }
  };

  return (
    <>
      <div>
        <CategoryLayout />
      </div>
      <div className={styles.confirmButton}>
        <div style={{ margin: "10px" }}>
          <ButtonStyled color="sky" label="취소" />
        </div>
        <div style={{ margin: "10px" }}>
          <ButtonStyled label="저장" onClick={() => setSaveModalOpen(true)} />
        </div>
      </div>
      {saveModalOpen && (
        <Modal
          text={`작성한 카테고리 정보를 저장하시겠습니까?`}
          twoButtonCancle={() => setSaveModalOpen(false)}
          twoButtonConfirm={saveCategoryList}
        />
      )}
      {loadingModalOpen && <Modal text={`작성한 카테고리 정보를 저장하시겠습니까?`} loding />}
      {finModalOpen && <Modal saveButtonClose={() => setFinModalOpen(false)} save />}
    </>
  );
};

export default CategoryPage;
