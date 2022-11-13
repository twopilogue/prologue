import React from "react";
import Text from "components/Text";
import RadioButton from "components/RadioButton";
import styles from "../../Setting.module.css";
import { SketchPicker } from "react-color";
import { useAppSelector } from "app/hooks";
import { selectColors, setColors } from "slices/settingSlice";
import { useDispatch } from "react-redux";

const PageSetting = () => {
  const colors = useAppSelector(selectColors);
  const dispatch = useDispatch();

  const handleChangeComplete = (color: any) => {
    dispatch(setColors({ ...colors, page: { background: color } }));
  };

  return (
    <div>
      <div className={styles.checkListTitle}>
        <Text value="페이지" type="text" bold />
      </div>
      <RadioButton label="색상 설정" value="color" checked />
      <div>
        <SketchPicker color={colors.page.background} onChangeComplete={(color) => handleChangeComplete(color.hex)} />
      </div>
    </div>
  );
};

export default PageSetting;
