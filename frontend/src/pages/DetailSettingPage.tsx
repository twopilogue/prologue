import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "app/store";
import styles from "features/setting/Setting.module.css";
import Text from "components/Text";
import ButtonStyled from "components/Button";
import ReplayIcon from "@mui/icons-material/Replay";
import { useAppSelector } from "app/hooks";
import { colorsConfig, initialState, selectColors, setClickedComp, setColors } from "slices/settingSlice";
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
  const { githubId, accessToken } = useSelector((state: rootState) => state.auth);
  const colors: colorsConfig = useAppSelector(selectColors);
  const [originColors, setOriginColors] = useState(null);
  const [saveModalOpen, setSaveModalOpen] = useState<boolean>(false);
  const [loadingModalOpen, setLoadingModalOpen] = useState<boolean>(false);
  const [finModalOpen, setFinModalOpen] = useState<boolean>(false);
  const [resetModalOpen, setResetModalOpen] = useState<boolean>(false);

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

          const colors = {
            title: {
              background: result.children.title.attributes["background-color"],
              text: result.children.titleh3.attributes["color"],
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
              background: "#ffffff",
              text: "#000000",
              logoText: res.data.logoText,
            },
          };
          dispatch(setColors(colors));
          setOriginColors(colors);
        }
      })
      .catch((err) => {
        console.error(err);
      });
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
    await Axios.put(api.setting.modifyDetail(), formData)
      .then((res: any) => {
        setLoadingModalOpen(false);
        setFinModalOpen(true);
      })
      .catch((err: any) => {
        console.log(err);
      });
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
          twoButtonCancle={() => setSaveModalOpen(false)}
          twoButtonConfirm={handleOnSave}
        />
      )}
      {loadingModalOpen && <Modal text={`설정한 레이아웃을 저장하시겠습니까?`} loding />}
      {finModalOpen && <Modal saveButtonClose={() => setFinModalOpen(false)} save />}
      {resetModalOpen && (
        <Modal
          text={`기존 설정으로 돌아갑니다.\n\n계속하시겠습니까?`}
          twoButtonCancle={() => setResetModalOpen(false)}
          twoButtonConfirm={onReset}
        />
      )}
    </div>
  );
};

export default DetailSettingPage;
