import React, { ChangeEvent, useState } from "react";
import Text from "components/Text";
import RadioButton from "components/RadioButton";
import styles from "../../Setting.module.css";
import { SketchPicker } from "react-color";
import { useAppSelector } from "app/hooks";
import { colorsConfig, selectColors, setColors } from "slices/settingSlice";
import { useDispatch } from "react-redux";
import { RadioGroup } from "@mui/material";
import { detailItemUnfolded } from "./LogoSetting";

const PageSetting = () => {
  const colors: colorsConfig = useAppSelector(selectColors);
  const [checkOrder, setCheckOrder] = useState("flex-start");
  const dispatch = useDispatch();

  const orderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckOrder((e.target as HTMLInputElement).value);
    dispatch(setColors({ ...colors, page: { ...colors.page, sort: (e.target as HTMLInputElement).value } }));
  };

  const handleChangeComplete = (color: any) => {
    dispatch(setColors({ ...colors, page: { ...colors.page, background: color } }));
  };

  return (
    <div>
      <div className={styles.checkListTitle}>
        <Text value="페이지" type="text" bold />
      </div>
      <div className={styles.detailContainer}>
        <div className={styles.detailItem}>
          <div className={styles.textPaddingSm}>
            <Text value="정렬 방향" type="text" bold />
          </div>
          <div className={styles.pageOrder}>
            <RadioGroup value={checkOrder} onChange={orderChange}>
              <RadioButton label="왼쪽 정렬" value="flex-start" />
              <RadioButton label="중앙 정렬" value="center" />
              <RadioButton label="오른쪽 정렬" value="flex-end" />
            </RadioGroup>
          </div>
        </div>
        <div className={styles.detailHr} />
        <div className={styles.detailItem}>
          <div className={styles.textPaddingSm}>
            <Text value="배경색" type="text" bold />
          </div>
          <div style={detailItemUnfolded}>
            <SketchPicker
              width="200px"
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
