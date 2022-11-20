import React, { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";
import Text from "components/Text";
import RadioButton from "components/RadioButton";
import styles from "../../Setting.module.css";
import Input from "components/Input";
import { SketchPicker } from "react-color";
import ButtonStyled from "components/Button";
import { controlImgRef } from "../DetailSelector";
import { useAppSelector } from "app/hooks";
import { colorsConfig, getTextColor, selectColors, setColors } from "slices/settingSlice";
import { useDispatch } from "react-redux";
import { RadioGroup } from "@mui/material";
import { detailItemFolded, detailItemUnfolded } from "./LogoSetting";

interface TitleSettingProps {
  titleImg: File;
  setTitleImg: Dispatch<SetStateAction<File>>;
}

const TitleSetting = ({ titleImg, setTitleImg }: TitleSettingProps) => {
  const titleImgRef = useRef<HTMLInputElement | null>(null);
  const colors: colorsConfig = useAppSelector(selectColors);
  const [radioValue, setRadioValue] = useState("titleColor");
  const detailItemColor = useRef<any>();
  const detailItemImg = useRef<any>();
  const dispatch = useDispatch();
  const maxLength = 15;

  const radioChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRadioValue((event.target as HTMLInputElement).value);
    dispatch(setColors({ ...colors, title: { ...colors.title, type: radioValue } }));
  };

  const handleChangeComplete = (color: string) => {
    const textColor = getTextColor(color);
    dispatch(setColors({ ...colors, title: { ...colors.title, background: color, text: textColor } }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    setTitleImg(e.target.files[0]);
  };

  // 높이 설정 보류
  // const handleTitleHeight = (e: any) => {
  //   if (typeof parseInt(e.target.value) != "number") {
  //     alert("숫자만 입력 가능.");
  //     e.target.value = 0;
  //   }

  //   dispatch(setColors({ ...colors, title: { ...colors.title, titleHeight: e.target.value } }));
  // };

  const handleTitleText = (e: any) => {
    if (e.length > maxLength) {
      e = e.substring(0, maxLength);
    }
    dispatch(setColors({ ...colors, title: { ...colors.title, titleText: e } }));
  };

  const changeLogoHeight = (e: ChangeEvent<HTMLInputElement>) => {
    if (detailItemColor.current && detailItemImg.current) {
      if (e.target.value === "titleColor") {
        Object.assign(detailItemColor.current.style, detailItemUnfolded);
        Object.assign(detailItemImg.current.style, detailItemFolded);
      } else {
        Object.assign(detailItemColor.current.style, detailItemFolded);
        Object.assign(detailItemImg.current.style, detailItemUnfolded);
      }
    } else {
      console.log("에러");
    }
  };

  return (
    <>
      <div className={styles.checkListTitle}>
        <Text value="타이틀" type="text" bold />
      </div>
      <div className={styles.detailContainer}>
        <div className={styles.detailItem}></div>
        {/* <div className={styles.detailItemThree}>
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
        <div className={styles.detailHr} /> */}

        <div className={styles.detailItem}>
          <div className={styles.textPaddingSm}>
            <Text value="타이틀 텍스트" type="text" bold />
          </div>
        </div>
        <div style={{ margin: "0 10px 10px 10px" }}>
          <Input
            placeholder="텍스트 입력"
            value={colors.title.titleText}
            onChange={(e) => handleTitleText(e.target.value)}
          />
        </div>
        <div className={styles.detailHr} />

        <div className={styles.detailItem}>
          <RadioGroup
            value={radioValue}
            onChange={(e) => {
              radioChange(e);
              changeLogoHeight(e);
            }}
          >
            <RadioButton label="배경색" value="titleColor" />
          </RadioGroup>
          <div ref={detailItemColor} style={detailItemUnfolded}>
            <SketchPicker
              color={colors.title.background}
              onChangeComplete={(color) => handleChangeComplete(color.hex)}
            />
          </div>
        </div>
        <div className={styles.detailHr} />
        <div className={styles.detailItem}>
          <RadioGroup
            value={radioValue}
            onChange={(e) => {
              radioChange(e);
              changeLogoHeight(e);
            }}
          >
            <RadioButton label="이미지" value="titleImg" />
          </RadioGroup>
        </div>
        <div ref={detailItemImg} style={detailItemFolded}>
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
      </div>
    </>
  );
};

export default TitleSetting;
