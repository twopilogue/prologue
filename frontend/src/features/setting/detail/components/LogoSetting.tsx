import React, { ChangeEvent, Dispatch, MutableRefObject, SetStateAction, useRef, useState } from "react";
import Text from "components/Text";
import RadioButton from "components/RadioButton";
import styles from "../../Setting.module.css";
import ButtonStyled from "components/Button";
import { colorsConfig, selectColors, setColors } from "slices/settingSlice";
import { useAppSelector } from "app/hooks";
import { useDispatch } from "react-redux";
import Input from "components/Input";
import { RadioGroup } from "@mui/material";

interface LogoSettingProps {
  logoImg: File;
  setLogoImg: Dispatch<SetStateAction<File>>;
}

const LogoSetting = ({ logoImg, setLogoImg }: LogoSettingProps) => {
  const logoImgRef = useRef<HTMLInputElement | null>(null);
  const colors: colorsConfig = useAppSelector(selectColors);
  const [radioValue, setRadioValue] = useState("logoText");
  const dispatch = useDispatch();

  const radioChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRadioValue((event.target as HTMLInputElement).value);
  };

  const handleLogoText = (e: string) => {
    dispatch(setColors({ ...colors, logo: { inputText: e } }));
  };

  const controlImgRef = (type: MutableRefObject<HTMLInputElement>) => {
    if (!type.current) return;
    type.current.click();
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    setLogoImg(e.target.files[0]);
  };

  return (
    <div>
      <div className={styles.checkListTitle}>
        <Text value="블로그 로고" type="text" bold />
      </div>
      <div className={styles.detailItem}>
        <RadioGroup value={radioValue} onChange={radioChange}>
          <RadioButton label="텍스트 설정" value="logoText" />
        </RadioGroup>
      </div>
      <div style={{ margin: "0 10px 0 10px" }}>
        <Input
          placeholder="텍스트 입력"
          value={colors.logo.inputText}
          onChange={(e) => handleLogoText(e.target.value)}
        />
      </div>
      <div className={styles.detailItem}>
        <RadioGroup value={radioValue} onChange={radioChange}>
          <RadioButton label="이미지 설정" value="logoImg" />
        </RadioGroup>
      </div>
      <input type="file" style={{ display: "none" }} ref={logoImgRef} onChange={(e) => handleImageUpload(e)} />
      <div className={styles.detailItemImgBtn} onClick={() => controlImgRef(logoImgRef)}>
        <ButtonStyled color="blue" label="이미지 첨부" />
      </div>
      <div>
        {logoImg ? (
          <div className={styles.textInfo}>
            <Text value="이미지가 첨부되었습니다." type="caption" color="blue_4" />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default LogoSetting;
