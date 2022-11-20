import React, { useEffect, useState } from "react";
import styles from "features/setting/Setting.module.css";
import Text from "components/Text";
import PageLayout from "features/setting/page/PageLayout";
import Axios from "api/JsonAxios";
import api from "api/Api";
import { useSelector } from "react-redux";
import { rootState } from "app/store";
import {
  PageConfig,
  editList,
  selectPageList,
  selectPageLayoutList,
  selectPageCnt,
  selectIsEditPage,
  selectPageDeleList,
} from "slices/settingSlice";
import ButtonStyled from "components/Button";
import { Layout } from "react-grid-layout";
import Modal from "components/Modal";
import { useAppSelector } from "app/hooks";

interface resultConfig {
  label: string;
  posts: boolean;
  type: string;
  oldName?: string;
}

const PageSettingPage = () => {
  const { githubId, accessToken } = useSelector((state: rootState) => state.auth);
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
    const result: resultConfig[] = [];
    sorted.map((item) =>
      item.oldName
        ? result.push({ label: item.label, posts: item.posts, type: item.type, oldName: item.oldName })
        : result.push({ label: item.label, posts: item.posts, type: item.type }),
    );
    sendPage(result);
  };

  const sendPage = async (result: resultConfig[]) => {
    await Axios.put(api.setting.modifyPage(), { accessToken: accessToken, githubId: githubId, pages: result })
      .then((res: any) => {
        setLoadingModalOpen(false);
        setFinModalOpen(true);
      })
      .catch((err: any) => {
        console.log(err);
      });
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
          twoButtonCancle={() => setSaveModalOpen(false)}
          twoButtonConfirm={savePageList}
        />
      )}
      {loadingModalOpen && <Modal text={`작성한 페이지 정보를 저장하시겠습니까?`} loding />}
      {finModalOpen && <Modal saveButtonClose={() => setFinModalOpen(false)} save />}
    </>
  );
};

export default PageSettingPage;
