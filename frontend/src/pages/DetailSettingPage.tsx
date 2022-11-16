import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "app/store";
import styles from "features/setting/Setting.module.css";
import Text from "components/Text";
import ButtonStyled from "components/Button";
import { useAppSelector } from "app/hooks";
import {
  colorsConfig,
  initialState,
  selectClickedLayoutIdx,
  selectColors,
  setClickedComp,
  setColors,
} from "slices/settingSlice";
import { DetailSettingStyles } from "features/setting/detail/DetailSettingStyles";
import DefaultLayoutStyles from "features/setting/layout/DefaultLayoutStyles";
import SettingLayout from "features/setting/detail/SettingLayout";
import DetailSelector from "features/setting/detail/DetailSelector";
import Axios from "api/MultipartAxios";
import api from "api/Api";
import axios from "axios";

const DetailSettingPage = () => {
  const [titleImg, setTitleImg] = useState(null);
  const [logoImg, setLogoImg] = useState(null);
  const { githubId, accessToken } = useSelector((state: rootState) => state.auth);
  const colors: colorsConfig = useAppSelector(selectColors);
  const layoutList = DefaultLayoutStyles();
  const clickedIdx = useAppSelector(selectClickedLayoutIdx);

  const formData = new FormData();
  const dispatch = useDispatch();

  const handleOnSave = () => {
    // 디테일 세팅
    const modified = DetailSettingStyles(colors);
    const result = {
      accessToken: accessToken,
      githubId: githubId,
      css: modified,
      logoText: colors.logo.logoText,
      titleText: colors.title.titleText,
      titleColor: true,
    };
    const layout = layoutList[clickedIdx - 1].struct;
    const layoutResult = layout.replaceAll("\n", "").replaceAll("  ", "").trim();

    formData.append("logoImage", logoImg);
    formData.append("titleImage", titleImg);
    formData.append("modifyBlogLayoutCssRequest", new Blob([JSON.stringify(result)], { type: "application/json" }));

    sendDetailSetting(formData, layoutResult);
  };

  const sendDetailSetting = async (formData: FormData, layoutResult: string) => {
    await axios.all([
      Axios.put(api.setting.modifyDetail(), formData)
        .then((res: any) => {
          console.log("디테일 전송됨? ", res);
        })
        .catch((err: any) => {
          console.log(err);
        }),
      // axios
      //   .put(api.setting.modifyLayout(), {
      //     accessToken: accessToken,
      //     githubId: githubId,
      //     layout: layoutResult,
      //   })
      //   .then((res: any) => {
      //     console.log("완료", res);
      //   })
      //   .catch((err: any) => {
      //     console.log("돌ㅇ가", err);
      //   }),
    ]);
  };

  // 언마운트 시 초기화 실행
  useEffect(() => {
    return () => {
      dispatch(setClickedComp(initialState.clickedComp));
      dispatch(setColors(initialState.colorList));
    };
  }, []);

  return (
    <div>
      <div className={styles.textPadding} style={{ paddingTop: "0", paddingBottom: "10px" }}>
        <Text value="세부 레이아웃 설정" type="groupTitle" bold />
      </div>
      <div style={{ paddingLeft: "20px" }}>
        <Text value="레이아웃에 원하는 디자인을 선택하여 적용하세요." type="caption" />
      </div>
      <div className={styles.layoutSelectContainer}>
        <DetailSelector titleImg={titleImg} setTitleImg={setTitleImg} logoImg={logoImg} setLogoImg={setLogoImg} />
        <SettingLayout />
      </div>
      <div className={styles.confirmButton}>
        <div style={{ margin: "10px" }}>
          <ButtonStyled color="sky" label="취소" />
        </div>
        <div style={{ margin: "10px" }}>
          <ButtonStyled label="저장" onClick={handleOnSave} />
        </div>
      </div>
    </div>
  );
};

export default DetailSettingPage;
