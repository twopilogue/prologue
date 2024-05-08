import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styles from "features/setting/Setting.module.css";
import Text from "components/Text";
import ButtonStyled from "components/Button";
import ReplayIcon from "@mui/icons-material/Replay";
import { useAppSelector } from "app/hooks";
import { colorsConfig, initialState, selectColors, setClickedComp, setColors } from "slices/settingSlice";
import { DetailSettingStyles } from "features/setting/detail/DetailSettingStyles";
import SettingLayout from "features/setting/detail/SettingLayout";
import DetailSelector from "features/setting/detail/DetailSelector";
import { toJSON } from "cssjson";
import Modal from "components/Modal";
import { getDetailApi, modifyDetailApi } from "apis/api/setting";
import { getDetailService } from "apis/services/setting";
import { useAuthStore } from "stores/authStore";
import { useShallow } from "zustand/react/shallow";

export interface DetailConfig {
  css: string;
  logoText: string;
  titleText: string;
  titleColor: boolean;
}

const DetailSettingPage = () => {
  const [titleImg, setTitleImg] = useState(null);
  const [logoImg, setLogoImg] = useState(null);
  const colors: colorsConfig = useAppSelector(selectColors);
  const [originColors, setOriginColors] = useState(null);
  const [saveModalOpen, setSaveModalOpen] = useState<boolean>(false);
  const [loadingModalOpen, setLoadingModalOpen] = useState<boolean>(false);
  const [finModalOpen, setFinModalOpen] = useState<boolean>(false);
  const [resetModalOpen, setResetModalOpen] = useState<boolean>(false);

  const [accessToken, githubId] = useAuthStore(useShallow((state) => [state.accessToken, state.githubId]));

  const formData = new FormData();
  const dispatch = useDispatch();

  const getDetailSetting = async () => {
    const data = await getDetailApi(accessToken, githubId);
    const { css, logoText, titleText, titleColor } = await getDetailService(data);

    if (css === "\n") {
      console.log("설정 없음");
    } else {
      const removedResult = css.replaceAll(".", "").replaceAll(" ", "");
      const result = toJSON(removedResult);

      const colors = {
        title: {
          background: result.children.title.attributes["background-color"],
          text: result.children.titleh3.attributes["color"],
          type: titleColor, // 색이면 true, 이미지면 false
          titleText,
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
          background: "#ffffff",
          text: "#000000",
          logoText,
        },
      };
      dispatch(setColors(colors));
      setOriginColors(colors);
    }
  };

  const handleOnSave = () => {
    setSaveModalOpen(false);
    setLoadingModalOpen(true);
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
    await modifyDetailApi(formData);
    setLoadingModalOpen(false);
    setFinModalOpen(true);
  };

  const onReset = () => {
    dispatch(setColors(originColors));
    dispatch(setClickedComp(initialState.clickedComp));
    setResetModalOpen(false);
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
      <div className={styles.textPadding} style={{ display: "flex", paddingTop: "0", paddingBottom: "10px" }}>
        <Text value="세부 레이아웃 설정" type="groupTitle" bold />
        <div
          style={{ marginLeft: "10px", marginTop: "4px", cursor: "pointer" }}
          onClick={() => setResetModalOpen(true)}
        >
          <ReplayIcon fontSize="small" />
        </div>
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
          <ButtonStyled label="저장" onClick={() => setSaveModalOpen(true)} />
        </div>
      </div>
      {saveModalOpen && (
        <Modal
          text={`변경된 디자인을 저장하시겠습니까?`}
          twoButtonCancel={() => setSaveModalOpen(false)}
          twoButtonConfirm={handleOnSave}
        />
      )}
      {loadingModalOpen && <Modal text={`설정한 레이아웃을 저장하시겠습니까?`} loding />}
      {finModalOpen && <Modal saveButtonClose={() => setFinModalOpen(false)} save />}
      {resetModalOpen && (
        <Modal
          text={`기존 설정으로 돌아갑니다.\n\n계속하시겠습니까?`}
          twoButtonCancel={() => setResetModalOpen(false)}
          twoButtonConfirm={onReset}
        />
      )}
    </div>
  );
};

export default DetailSettingPage;
