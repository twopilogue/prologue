import React from "react";
import Text from "components/Text";
import RadioButton from "components/RadioButton";
import styles from "../../Setting.module.css";
import { SketchPicker } from "react-color";
import { useDispatch } from "react-redux";
import { colorsConfig, getTextColor, selectColors, setColors } from "slices/settingSlice";
import { useAppSelector } from "app/hooks";
import { detailItemUnfolded } from "./LogoSetting";

const ProfileSetting = () => {
  const dispatch = useDispatch();
  const colors: colorsConfig = useAppSelector(selectColors);

  const handleChangeComplete = (color: any) => {
    const textColor = getTextColor(color);
    dispatch(setColors({ ...colors, profile: { background: color, text: textColor } }));
  };
  return (
    <div>
      <div className={styles.checkListTitle}>
        <Text value="프로필" type="text" bold />
      </div>
      <div className={styles.detailContainer}>
        <div className={styles.detailItem}>
          <div className={styles.textPaddingSm}>
            <Text value="배경색" type="text" bold />
          </div>
          <div style={detailItemUnfolded}>
            <SketchPicker
              color={colors.profile.background}
              onChangeComplete={(color) => handleChangeComplete(color.hex)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetting;
