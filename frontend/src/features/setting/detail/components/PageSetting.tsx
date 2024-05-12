import { ChangeEvent, useState } from "react";
import Text from "components/Text";
import RadioButton from "components/RadioButton";
import styles from "styles/Setting.module.css";
import { SketchPicker } from "react-color";
import { RadioGroup } from "@mui/material";
import { detailItemUnfolded } from "./LogoSetting";
import { useSettingActions, useSettingStore } from "stores/settingStore";

const PageSetting = () => {
  const colorList = useSettingStore((state) => state.colorList);
  const { setColorListAction } = useSettingActions();
  const [checkOrder, setCheckOrder] = useState("flex-start");

  const orderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckOrder((e.target as HTMLInputElement).value);
    setColorListAction({ ...colorList, page: { ...colorList.page, sort: (e.target as HTMLInputElement).value } });
  };

  const handleChangeComplete = (color: string) => {
    setColorListAction({ ...colorList, page: { ...colorList.page, background: color } });
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
              color={colorList.page.background}
              onChangeComplete={(color) => handleChangeComplete(color.hex)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageSetting;
