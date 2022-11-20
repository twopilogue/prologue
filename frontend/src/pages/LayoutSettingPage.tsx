import api from "api/Api";
import Axios from "api/JsonAxios";
import { useAppSelector } from "app/hooks";
import { rootState } from "app/store";
import ButtonStyled from "components/Button";
import Modal from "components/Modal";
import Text from "components/Text";
import DefaultLayoutStyles from "features/setting/layout/DefaultLayoutStyles";
import LayoutContainer from "features/setting/layout/LayoutContainer";
import LayoutSelector from "features/setting/layout/LayoutSelector";
import React, { useEffect, useState } from "react";
import { Layout } from "react-grid-layout";
import { useDispatch, useSelector } from "react-redux";
import {
  ComponentConfig,
  selectClickedLayoutIdx,
  setComponentCreated,
  setOrigin,
  setUserCheckList,
  setUserComponentLayoutList,
  setUserComponentList,
} from "slices/settingSlice";
import styles from "../features/setting/Setting.module.css";

const LayoutSettingPage = () => {
  const dispatch = useDispatch();
  const clickedIdx = useAppSelector(selectClickedLayoutIdx);
  const { githubId, accessToken } = useSelector((state: rootState) => state.auth);
  const DefaultLayoutList = DefaultLayoutStyles();
  const [saveModalOpen, setSaveModalOpen] = useState<boolean>(false);
  const [loadingModalOpen, setLoadingModalOpen] = useState<boolean>(false);
  const [finModalOpen, setFinModalOpen] = useState<boolean>(false);

  const getUserLayout = async () => {
    await Axios.get(api.setting.getLayout(accessToken, githubId))
      .then((res: any) => {
        const response = JSON.parse(res.data.layout);
        const userComponents: ComponentConfig[] = [];
        response.layout.map((it: Layout) => {
          if (it.i === "블로그 로고") userComponents.push({ key: "블로그 로고", id: "logo" });
          else if (it.i === "프로필") userComponents.push({ key: "프로필", id: "profile" });
          else if (it.i === "카테고리") userComponents.push({ key: "카테고리", id: "category" });
          else if (it.i === "페이지") userComponents.push({ key: "페이지", id: "page" });
          else if (it.i === "타이틀") userComponents.push({ key: "타이틀", id: "title" });
          else if (it.i === "글 목록") userComponents.push({ key: "글 목록", id: "contents" });
        });
        dispatch(setUserComponentLayoutList(response.layout));
        dispatch(setUserComponentList(userComponents));
        dispatch(setUserCheckList(response.checkList));
        dispatch(
          setOrigin({
            originComponentLayoutList: response.layout,
            originComponentList: userComponents,
            originCheckList: response.checkList,
          }),
        );
        dispatch(setComponentCreated(true));
      })
      .catch((err: any) => {
        console.log("실패@", err);
      });
  };

  const handleOnSave = () => {
    setSaveModalOpen(false);
    setLoadingModalOpen(true);
    const layoutJson = {
      layout: DefaultLayoutList[clickedIdx].layout,
      checkList: DefaultLayoutList[clickedIdx].checkList,
    };

    const result = {
      accessToken: accessToken,
      githubId: githubId,
      layout: DefaultLayoutList[clickedIdx].struct,
      layoutJson: JSON.stringify(layoutJson),
    };
    sendUserLayout(result);
  };

  const sendUserLayout = async (result: object) => {
    await Axios.put(api.setting.modifyLayout(), result)
      .then((res: any) => {
        setLoadingModalOpen(false);
        setFinModalOpen(true);
      })
      .catch((err: any) => {
        console.log("실패", err);
      });
  };

  useEffect(() => {
    getUserLayout();
  }, []);

  return (
    <>
      <div className={styles.textPadding} style={{ paddingTop: "0", paddingBottom: "10px" }}>
        <Text value="레이아웃 선택" type="groupTitle" bold />
      </div>
      <div style={{ paddingLeft: "20px" }}>
        <Text value="블로그에 적용할 레이아웃을 선택하세요." type="caption" />
      </div>
      <LayoutSelector />
      <LayoutContainer />
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
          text={`설정한 레이아웃을 저장하시겠습니까?`}
          twoButtonCancle={() => setSaveModalOpen(false)}
          twoButtonConfirm={handleOnSave}
        />
      )}
      {loadingModalOpen && <Modal text={`설정한 레이아웃을 저장하시겠습니까?`} loding />}
      {finModalOpen && <Modal saveButtonClose={() => setFinModalOpen(false)} save />}
    </>
  );
};

export default LayoutSettingPage;
