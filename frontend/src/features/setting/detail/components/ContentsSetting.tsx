import React from "react";
import styles from "../../Setting.module.css";
import RadioButton from "components/RadioButton";
import Text from "components/Text";
import { colorsConfig, getTextColor, selectColors, setColors } from "slices/settingSlice";
import { useAppSelector } from "app/hooks";
import { useDispatch } from "react-redux";
import { SketchPicker } from "react-color";
import { detailItemUnfolded } from "./LogoSetting";

const ContentsSetting = () => {
  const dispatch = useDispatch();
  const colors: colorsConfig = useAppSelector(selectColors);

  const handleChangeComplete = (color: any) => {
    const textColor = getTextColor(color);
    dispatch(setColors({ ...colors, contents: { background: color, text: textColor } }));
  };

  return (
    <div>
      <div className={styles.checkListTitle}>
        <Text value="글 목록" type="text" bold />
      </div>
      <div className={styles.detailContainer}>
        <div className={styles.detailItem}>
          <div className={styles.textPaddingSm}>
            <Text value="배경색" type="text" bold />
          </div>
          <div style={detailItemUnfolded}>
            <SketchPicker
              color={colors.contents.background}
              onChangeComplete={(color) => handleChangeComplete(color.hex)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentsSetting;
