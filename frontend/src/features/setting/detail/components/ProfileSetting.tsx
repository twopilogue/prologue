import React from "react";
import Text from "components/Text";
import RadioButton from "components/RadioButton";
import styles from "../../Setting.module.css";
import { SketchPicker } from "react-color";
import { useDispatch } from "react-redux";
import { colorsConfig, selectColors, setColors } from "slices/settingSlice";
import { useAppSelector } from "app/hooks";

const ProfileSetting = () => {
  const dispatch = useDispatch();
  const colors: colorsConfig = useAppSelector(selectColors);

  const handleChangeComplete = (color: any) => {
    dispatch(setColors({ ...colors, profile: { ...colors.profile, background: color } }));
  };
  return (
    <div>
      <div className={styles.checkListTitle}>
        <Text value="프로필" type="text" bold />
      </div>
      <div className={styles.detailContainer}>
        <div className={styles.detailItem}>
          <RadioButton label="색상 설정" value="color" checked />
          <div>
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
