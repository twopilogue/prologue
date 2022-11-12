import React, { ChangeEvent, useState } from "react";
import Text from "components/Text";
import RadioButton from "components/RadioButton";
import styles from "../../Setting.module.css";
import { SketchPicker } from "react-color";
import { useAppSelector } from "app/hooks";
import { colorsConfig, selectColors, setColors } from "slices/settingSlice";
import { useDispatch } from "react-redux";
import { RadioGroup } from "@mui/material";

const PageSetting = () => {
  const colors: colorsConfig = useAppSelector(selectColors);
  const [checkOrder, setCheckOrder] = useState("right");
  const dispatch = useDispatch();

  const orderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckOrder((e.target as HTMLInputElement).value);
  };

  const handleChangeComplete = (color: any) => {
    dispatch(setColors({ ...colors, page: { background: color } }));
  };

  return (
    <div>
      <div className={styles.checkListTitle}>
        <Text value="페이지" type="text" bold />
      </div>
      <div className={styles.detailContents}>
        <div className={styles.detailItem}>
          <div className={styles.textPaddingSm}>
            <Text value="정렬 선택" type="text" />
          </div>
          <div className={styles.pageOrder}>
            <RadioGroup value={checkOrder} onChange={orderChange}>
              <RadioButton label="오른쪽 정렬" value="right" />
              <RadioButton label="왼쪽 정렬" value="left" />
            </RadioGroup>
          </div>
          <div className={styles.textPaddingSm}>
            <RadioButton label="색상 설정" value="color" checked />
          </div>
          <div>
            <SketchPicker
              color={colors.page.background}
              onChangeComplete={(color) => handleChangeComplete(color.hex)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageSetting;
