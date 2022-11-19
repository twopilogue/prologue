import api from "api/Api";
import Axios from "api/JsonAxios";
import { useAppSelector } from "app/hooks";
import { rootState } from "app/store";
import ButtonStyled from "components/Button";
import Text from "components/Text";
import DefaultLayoutStyles from "features/setting/layout/DefaultLayoutStyles";
import LayoutContainer from "features/setting/layout/LayoutContainer";
import LayoutSample from "features/setting/layout/LayoutSample";
import LayoutSelector from "features/setting/layout/LayoutSelector";
import React, { useEffect } from "react";
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

  const getUserLayout = async () => {
    await Axios.get(api.setting.getLayout(accessToken, githubId))
      .then((res: any) => {
        const response = JSON.parse(res.data.layout);
        console.log("사용자 레이아웃 조회", response);
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
        console.log("-------레이아웃 dispatch 완료-------");
      })
      .catch((err: any) => {
        console.log("실패@", err);
      });
  };

  const handleOnSave = () => {
    const layoutJson = {
      layout: DefaultLayoutList[clickedIdx].layout,
      checkList: DefaultLayoutList[clickedIdx].checkList,
    };
    console.log(layoutJson.checkList);

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
        console.log("레이아웃 수정 완!", res);
        alert("저장되었습니다.");
      })
      .catch((err: any) => {
        console.log("ㅡㅡ빠꾸", err);
      });
  };

  useEffect(() => {
    getUserLayout();
  }, []);

  return (
    <>
      <div className={styles.textPadding} style={{ paddingTop: "0", paddingBottom: "10px" }}>
        <Text value="기본 레이아웃 선택" type="groupTitle" bold />
      </div>
      <div style={{ paddingLeft: "20px" }}>
        <Text value="기본으로 사용할 레이아웃을 선택하세요." type="caption" />
      </div>
      <LayoutSelector />
      <LayoutContainer />
      <div className={styles.confirmButton}>
        <div style={{ margin: "10px" }}>
          <ButtonStyled color="sky" label="취소" />
        </div>
        <div style={{ margin: "10px" }}>
          <ButtonStyled label="저장 후 레이아웃 설정" onClick={handleOnSave} />
        </div>
      </div>
    </>
  );
};

export default LayoutSettingPage;
