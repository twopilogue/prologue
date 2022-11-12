import Text from "components/Text";
import React, { useEffect } from "react";
import DetailSelector from "./DetailSelector";
import styles from "../Setting.module.css";
import SettingLayout from "./SettingLayout";
import { useAppSelector } from "app/hooks";
import { colorsConfig, initialState, selectColors, setClickedComp, setColors } from "slices/settingSlice";
import ButtonStyled from "components/Button";
import { useDispatch } from "react-redux";

const DetailSetting = () => {
  const colors: colorsConfig = useAppSelector(selectColors);
  const dispatch = useDispatch();
  const handleOnSave = () => {
    console.log(colors);
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
        <DetailSelector />
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

export default DetailSetting;
