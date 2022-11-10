import Text from "components/Text";
import RadioButton from "components/RadioButton";
import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import styles from "./Setting.module.css";
import { SketchPicker } from "react-color";
import { colorsConfig } from "./DetailSetting";

interface Props {
  colors: colorsConfig;
  setColors: Dispatch<SetStateAction<colorsConfig>>;
}

const DetailSelector = ({ colors, setColors }: Props) => {
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
      }
    },
    [colors],
  );

  return (
    <div className={styles.checkListContainer}>
      <div className={styles.checkListTitle}>
        <Text value="타이틀" type="text" bold />
      </div>
      <div className={styles.detailContents}>
        {/* <div className={styles.detailItem}>
          <Text value="영역 설정" type="text" />
        </div> */}
        <div className={styles.detailItem}>
          <Text value="높이 설정" type="text" />
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
      </div>
      <div className={styles.checkListTitle}>
        <Text value="블로그 로고" type="text" bold />
      </div>
      <div className={styles.detailItem}>
        <RadioButton label="색상 설정" value="color" checked />
      </div>
      <div className={styles.checkListTitle}>
        <Text value="프로필" type="text" bold />
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
