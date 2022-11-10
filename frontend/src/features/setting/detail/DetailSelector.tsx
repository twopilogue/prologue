import Text from "components/Text";
import RadioButton from "components/RadioButton";
import React, { ChangeEvent, Dispatch, MutableRefObject, SetStateAction, useCallback, useRef, useState } from "react";
import styles from "../Setting.module.css";
import { SketchPicker } from "react-color";
import { colorsConfig } from "./DetailSetting";
import Input from "components/Input";
import ButtonStyled from "components/Button";

interface Props {
  colors: colorsConfig;
  setColors: Dispatch<SetStateAction<colorsConfig>>;
}

const DetailSelector = ({ colors, setColors }: Props) => {
  const titleImgRef = useRef<HTMLInputElement | null>(null);
  const logoImgRef = useRef<HTMLInputElement | null>(null);
  const [titleImg, setTitleImg] = useState(null);
  const [logoImg, setLogoImg] = useState(null);

  const handleChangeComplete = useCallback(
    (color: any, type: string) => {
      console.log("색상: ", colors);
      switch (type) {
        case "title":
          setColors({ ...colors, title: { background: color, text: color } });
          break;
        case "category":
          setColors({ ...colors, category: { background: color, text: color } });
          break;
        case "page":
          setColors({ ...colors, page: { background: color, text: color } });
          break;
        case "profile":
          setColors({ ...colors, profile: { background: color, text: color } });
          break;
      }
    },
    [colors],
  );

  const controlImgRef = useCallback((type: MutableRefObject<HTMLInputElement>) => {
    if (!type.current) return;
    type.current.click();
  }, []);

  const handleImageUpload = useCallback((e: ChangeEvent<HTMLInputElement>, type: string) => {
    if (!e.target.files) {
      return;
    }
    console.log(e.target.files[0].name);
    switch (type) {
      case "title":
        setTitleImg(e.target.files[0]);
        break;
      case "logo":
        setLogoImg(e.target.files[0]);
        break;
    }
  }, []);

  return (
    <div className={styles.checkListContainer}>
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
              onChangeComplete={(color) => handleChangeComplete(color.hex, "title")}
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
          onChange={(e) => handleImageUpload(e, "title")}
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
            <></>
          )}
        </div>
      </div>
      <div className={styles.checkListTitle}>
        <Text value="블로그 로고" type="text" bold />
      </div>
      <div className={styles.detailItem}>
        <RadioButton label="색상 설정" value="color" checked />
      </div>
      <div className={styles.detailItem}>
        <RadioButton label="이미지 설정" value="color" checked />
      </div>
      <input type="file" style={{ display: "none" }} ref={logoImgRef} onChange={(e) => handleImageUpload(e, "logo")} />
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
      <div className={styles.checkListTitle}>
        <Text value="프로필" type="text" bold />
      </div>
      <div className={styles.detailItem}>
        <RadioButton label="색상 설정" value="color" checked />
        <div>
          <SketchPicker
            color={colors.profile.background}
            onChangeComplete={(color) => handleChangeComplete(color.hex, "profile")}
          />
        </div>
      </div>
      <div className={styles.checkListTitle}>
        <Text value="카테고리" type="text" bold />
      </div>
      <div className={styles.detailItem}>
        <RadioButton label="색상 설정" value="color" checked />
        <div>
          <SketchPicker
            color={colors.category.background}
            onChangeComplete={(color) => handleChangeComplete(color.hex, "category")}
          />
        </div>
      </div>
      <div className={styles.checkListTitle}>
        <Text value="페이지" type="text" bold />
      </div>
      <RadioButton label="색상 설정" value="color" checked />
      <div>
        <SketchPicker
          color={colors.page.background}
          onChangeComplete={(color) => handleChangeComplete(color.hex, "page")}
        />
      </div>
    </div>
  );
};

export default DetailSelector;
