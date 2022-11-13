import React, { ChangeEvent, Dispatch, SetStateAction, useRef } from "react";
import Text from "components/Text";
import RadioButton from "components/RadioButton";
import styles from "../../Setting.module.css";
import Input from "components/Input";
import { SketchPicker } from "react-color";
import ButtonStyled from "components/Button";
import { controlImgRef } from "../DetailSelector";
import { useAppSelector } from "app/hooks";
import { selectColors, setColors } from "slices/settingSlice";
import { useDispatch } from "react-redux";

interface TitleSettingProps {
  titleImg: File;
  setTitleImg: Dispatch<SetStateAction<File>>;
}

const TitleSetting = ({ titleImg, setTitleImg }: TitleSettingProps) => {
  const titleImgRef = useRef<HTMLInputElement | null>(null);
  const colors = useAppSelector(selectColors);
  const dispatch = useDispatch();

  const handleChangeComplete = (color: any) => {
    dispatch(setColors({ ...colors, title: { background: color } }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>, type: string, func: any) => {
    if (!e.target.files) {
      return;
    }
    setTitleImg(e.target.files[0]);
  };

  return (
    <>
      <div className={styles.checkListTitle}>
        <Text value="타이틀" type="text" bold />
      </div>
      <div className={styles.detailContents}>
        <div className={styles.detailItem}>
          <div className={styles.detailItemThree}>
            <div style={{ textAlign: "center" }}>
              <Text value="높이" type="text" />
            </div>
            <div style={{ display: "flex", justifyContent: "end" }}>
              <div style={{ width: "7vw", marginRight: "10px" }}>
                <Input placeholder="숫자 입력" />
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
        <div className={styles.detailItem}>
          <RadioButton label="색상 설정" value="color" checked />
          <div>
            <SketchPicker
              color={colors.title.background}
              onChangeComplete={(color) => handleChangeComplete(color.hex)}
            />
          </div>
        </div>
        <div className={styles.detailItem}>
          <RadioButton label="이미지 설정" value="color" checked />
        </div>
        <input
          type="file"
          style={{ display: "none" }}
          ref={titleImgRef}
          onChange={(e) => handleImageUpload(e, "title", setTitleImg)}
        />
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
