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
import SettingLayout from "features/setting/detail/SettingLayout";
import DetailSelector from "features/setting/detail/DetailSelector";
import Axios from "api/MultipartAxios";
import api from "api/Api";
import { toJSON } from "cssjson";
import Modal from "components/Modal";

const DetailSettingPage = () => {
  const [titleImg, setTitleImg] = useState(null);
  const [logoImg, setLogoImg] = useState(null);
  const [saveModalOpen, setSaveModalOpen] = useState<boolean>(false);
  const { githubId, accessToken } = useSelector((state: rootState) => state.auth);
  const colors: colorsConfig = useAppSelector(selectColors);

  const formData = new FormData();
  const dispatch = useDispatch();

  const getDetailSetting = async () => {
    await Axios.get(api.setting.getDetail(accessToken, githubId))
      .then((res) => {
        if (res.data.css === "\n") {
          console.log("설정 없음");
        } else {
          const removedResult = res.data.css.replaceAll(".", "").replaceAll(" ", "");
          const result = toJSON(removedResult);
          console.log(result);

          console.log("카테고리 변환 결과: ", result.children.category.attributes);
          console.log("프로필 반환 결과: ", result.children.profile.attributes);

          dispatch(
            setColors({
              title: {
                background: result.children.title.attributes["background-color"],
                text: result.children.titleh3.attributes["color"],
                // titleHeight:
                type: res.data.titleColor, // 색이면 true, 이미지면 false
                titleText: res.data.titleText,
              },
              category: {
                background: result.children.category.attributes["background-color"],
                text: result.children.categorya.attributes["color"],
              },
              page: {
                background: result.children["page-container"].attributes["background-color"],
                text: result.children.pagea.attributes["color"],
                sort: result.children["page-container"].attributes["justify-content"],
              },
              profile: {
                background: result.children.profile.attributes["background-color"],
                text: result.children.profile.attributes["color"],
              },
              contents: {
                background: result.children["post-list-container"].attributes["background-color"],
                text: result.children["post-list-container"].attributes["color"],
              },
              logo: {
                background: "#d3d3eb",
                text: "#ffffff",
                logoText: res.data.logoText,
              },
            }),
          );
        }
        console.log("DURL?");
      })
      .catch((err) => {
        console.error(err);
      });
  };

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

    formData.append("logoImage", logoImg);
    formData.append("titleImage", titleImg);
    formData.append("modifyBlogLayoutCssRequest", new Blob([JSON.stringify(result)], { type: "application/json" }));

    sendDetailSetting(formData);
  };

  const sendDetailSetting = async (formData: FormData) => {
    await Axios.put(api.setting.modifyDetail(), formData)
      .then((res: any) => {
        console.log("디테일 전송됨? ", res);
        alert("저장되었습니다.");
        setSaveModalOpen(false);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const showSaveModal = () => {
    setSaveModalOpen(true);
  };

  useEffect(() => {
    getDetailSetting();
  }, []);

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
          <ButtonStyled label="저장" onClick={showSaveModal} />
        </div>
      </div>
      {saveModalOpen && (
        <Modal
          text={`변경된 디자인을 저장하시겠습니까?`}
          twoButtonCancle={() => setSaveModalOpen(false)}
          twoButtonConfirm={handleOnSave}
        />
      )}
    </div>
  );
};

export default DetailSettingPage;
