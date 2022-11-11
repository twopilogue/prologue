import React from "react";
import Text from "components/Text";
import RadioButton from "components/RadioButton";
import styles from "../../Setting.module.css";
import { SketchPicker } from "react-color";
import { useAppSelector } from "app/hooks";
import { selectColors, setColors } from "slices/settingSlice";
import { useDispatch } from "react-redux";

const CategorySetting = () => {
  const colors = useAppSelector(selectColors);
  const dispatch = useDispatch();

  const handleChangeComplete = (color: any) => {
    dispatch(setColors({ ...colors, category: { background: color } }));
  };

  return (
    <div>
      <div className={styles.checkListTitle}>
        <Text value="카테고리" type="text" bold />
      </div>
      <div className={styles.detailItem}>
        <RadioButton label="색상 설정" value="color" checked />
        <div>
          <SketchPicker
            color={colors.category.background}
            onChangeComplete={(color) => handleChangeComplete(color.hex)}
          />
        </div>
      </div>
    </div>
  );
};

export default CategorySetting;
