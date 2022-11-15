import React from "react";
import styles from "../../Setting.module.css";
import RadioButton from "components/RadioButton";
import Text from "components/Text";
import { colorsConfig, selectColors, setColors } from "slices/settingSlice";
import { useAppSelector } from "app/hooks";
import { useDispatch } from "react-redux";
import { SketchPicker } from "react-color";

const ContentsSetting = () => {
  const dispatch = useDispatch();
  const colors: colorsConfig = useAppSelector(selectColors);

  const handleChangeComplete = (color: any) => {
    dispatch(setColors({ ...colors, contents: { ...colors.contents, background: color } }));
  };

  return (
    <div>
      <div className={styles.checkListTitle}>
        <Text value="글 목록" type="text" bold />
      </div>
      <div className={styles.detailContainer}>
        <div className={styles.detailItem}>
          <RadioButton label="색상 설정" value="color" checked />
          <div>
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
