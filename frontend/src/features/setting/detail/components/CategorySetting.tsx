import React from "react";
import Text from "components/Text";
import RadioButton from "components/RadioButton";
import styles from "../../Setting.module.css";
import { SketchPicker } from "react-color";
import { useAppSelector } from "app/hooks";
import { colorsConfig, getTextColor, selectColors, setColors } from "slices/settingSlice";
import { useDispatch } from "react-redux";
import { detailItemUnfolded } from "./LogoSetting";

const CategorySetting = () => {
  const colors: colorsConfig = useAppSelector(selectColors);
  const dispatch = useDispatch();

  const handleChangeComplete = (color: any) => {
    const textColor = getTextColor(color);
    dispatch(setColors({ ...colors, category: { background: color, text: textColor } }));
  };

  return (
    <div>
      <div className={styles.checkListTitle}>
        <Text value="카테고리" type="text" bold />
      </div>
      <div className={styles.detailContainer}>
        <div className={styles.detailItem}>
          <div className={styles.textPaddingSm}>
            <Text value="배경색" type="text" bold />
          </div>
          <div style={detailItemUnfolded}>
            <SketchPicker
              color={colors.category.background}
              onChangeComplete={(color) => handleChangeComplete(color.hex)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySetting;
