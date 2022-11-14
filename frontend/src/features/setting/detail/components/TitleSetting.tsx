import React, { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";
import Text from "components/Text";
import RadioButton from "components/RadioButton";
import styles from "../../Setting.module.css";
import Input from "components/Input";
import { SketchPicker } from "react-color";
import ButtonStyled from "components/Button";
import { controlImgRef } from "../DetailSelector";
import { useAppSelector } from "app/hooks";
import { colorsConfig, selectColors, setColors } from "slices/settingSlice";
import { useDispatch } from "react-redux";
import { RadioGroup } from "@mui/material";

interface TitleSettingProps {
  titleImg: File;
  setTitleImg: Dispatch<SetStateAction<File>>;
}

const TitleSetting = ({ titleImg, setTitleImg }: TitleSettingProps) => {
  const titleImgRef = useRef<HTMLInputElement | null>(null);
  const colors: colorsConfig = useAppSelector(selectColors);
  const [radioValue, setRadioValue] = useState("titleColor");
  const dispatch = useDispatch();

  const radioChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRadioValue((event.target as HTMLInputElement).value);
    dispatch(setColors({ ...colors, title: { ...colors.title, type: radioValue } }));
  };

  const handleChangeComplete = (color: string) => {
    dispatch(setColors({ ...colors, title: { ...colors.title, background: color } }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    setTitleImg(e.target.files[0]);
  };

  const handleTitleHeight = (e: any) => {
    if (!e.target.value) return;
    if (typeof e.target.value != "number") {
      alert("숫자만 입력 가능.");
      e.target.value = 0;
    }

    dispatch(setColors({ ...colors, title: { titleHeight: e.target.value } }));
  };

  return (
    <>
      <div className={styles.checkListTitle}>
        <Text value="타이틀" type="text" bold />
      </div>
      <div className={styles.detailContainer}>
        <div className={styles.detailItem}>
          <div className={styles.detailItemThree}>
            <div style={{ textAlign: "center" }}>
              <Text value="높이" type="text" />
            </div>
            <div style={{ display: "flex", justifyContent: "end" }}>
              <div style={{ width: "7vw", marginRight: "10px" }}>
                <Input
                  placeholder="숫자 입력"
                  value={colors.title.titleHeight}
                  onChange={(e) => handleTitleHeight(e)}
                />
              </div>
            </div>
            <div style={{ textAlign: "left" }}>
              <Text value="px" type="text" />
            </div>
          </div>
          <div className={styles.textInfo}>
            <Text value="미리보기가 제공되지 않습니다." type="caption" color="dark_gray" />
          </div>
        </div>
        <div className={styles.detailHr} />
        <div className={styles.detailItem}>
          <RadioGroup value={radioValue} onChange={radioChange}>
            <RadioButton label="색상 설정" value="titleColor" />
          </RadioGroup>
          <div>
            <SketchPicker
              color={colors.title.background}
              onChangeComplete={(color) => handleChangeComplete(color.hex)}
            />
          </div>
        </div>
        <div className={styles.detailHr} />
        <div className={styles.detailItem}>
          <RadioGroup value={radioValue} onChange={radioChange}>
            <RadioButton label="이미지 설정" value="titleImg" />
          </RadioGroup>
        </div>
        <input type="file" style={{ display: "none" }} ref={titleImgRef} onChange={(e) => handleImageUpload(e)} />
        <div className={styles.detailItemImgBtn} onClick={() => controlImgRef(titleImgRef)}>
          <ButtonStyled color="blue" label="이미지 첨부" />
        </div>
        <div>
          {titleImg ? (
            <div className={styles.textInfo}>
              <Text value="이미지가 첨부되었습니다." type="caption" color="blue_4" />
            </div>
          ) : (
            <div className={styles.textInfo}>
              <Text value="" type="caption" color="blue_4" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TitleSetting;
