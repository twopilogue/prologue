import { useState } from "react";
import styles from "styles/Setting.module.css";
import Text from "components/Text";
import PageLayout from "features/setting/page/PageLayout";
import { PageConfig, selectPageList, selectPageLayoutList, selectPageDeleList } from "slices/settingSlice";
import ButtonStyled from "components/Button";
import Modal from "components/Modal";
import { useAppSelector } from "app/hooks";
import { modifyPageApi } from "apis/api/setting";
import { useAuthStore } from "stores/authStore";
import { useShallow } from "zustand/react/shallow";

export interface ModifiedPageConfig {
  label: string;
  posts: boolean;
  type: string;
  oldName?: string;
}

const PageSettingPage = () => {
  const [accessToken, githubId] = useAuthStore(useShallow((state) => [state.accessToken, state.githubId]));
  // const [pageList, setPageList] = useState<PageConfig[]>([]);
  // const [layoutList, setLayoutList] = useState<Layout[]>([]);
  // const [pageCnt, setPageCnt] = useState<number>(0);
  // const [isEdit, setIsEdit] = useState<editList[]>([]);
  // const [deleList, setDeleList] = useState<PageConfig[]>([]);
  const pageList = useAppSelector(selectPageList);
  const layoutList = useAppSelector(selectPageLayoutList);
  const deleList = useAppSelector(selectPageDeleList);
  const [saveModalOpen, setSaveModalOpen] = useState<boolean>(false);
  const [loadingModalOpen, setLoadingModalOpen] = useState<boolean>(false);
  const [finModalOpen, setFinModalOpen] = useState<boolean>(false);

  const savePageList = () => {
    setSaveModalOpen(false);
    setLoadingModalOpen(true);

    // 페이지리스트 + 삭제리스트
    const pageResult: PageConfig[] = pageList.concat(deleList);

    // 병합
    const map = new Map();
    layoutList.forEach((item) => map.set(parseInt(item.i), item));
    pageResult.forEach((item) => map.set(item.id, { ...map.get(item.id), ...item }));
    const merged = Array.from(map.values());

    // 정렬
    const sorted = merged.sort((a, b) => a.y - b.y);
    const result: ModifiedPageConfig[] = [];
    sorted.map((item) =>
      item.oldName
        ? result.push({ label: item.label, posts: item.posts, type: item.type, oldName: item.oldName })
        : result.push({ label: item.label, posts: item.posts, type: item.type }),
    );
    sendPage(result);
  };

  const sendPage = async (result: ModifiedPageConfig[]) => {
    await modifyPageApi(accessToken, githubId, result);
    setLoadingModalOpen(false);
    setFinModalOpen(true);
  };

  return (
    <>
      <div className={styles.textPadding} style={{ paddingTop: "0", paddingBottom: "10px" }}>
        <Text value="페이지 설정" type="groupTitle" bold />
      </div>
      <div style={{ paddingLeft: "20px" }}>
        <Text value="드래그 앤 드롭으로 페이지 순서를 변경할 수 있습니다." type="caption" />
      </div>
      <PageLayout />
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
          text={`작성한 페이지 정보를 저장하시겠습니까?`}
          twoButtonCancel={() => setSaveModalOpen(false)}
          twoButtonConfirm={savePageList}
        />
      )}
      {loadingModalOpen && <Modal text={`작성한 페이지 정보를 저장하시겠습니까?`} loding />}
      {finModalOpen && <Modal saveButtonClose={() => setFinModalOpen(false)} save />}
    </>
  );
};

export default PageSettingPage;
