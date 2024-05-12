import Text from "components/Text";
import styles from "styles/Setting.module.css";
import { SketchPicker } from "react-color";
import { detailItemUnfolded } from "./LogoSetting";
import { useSettingActions, useSettingStore } from "stores/settingStore";
import getTextColor from "utils/getTextColor";

const ProfileSetting = () => {
  const colorList = useSettingStore((state) => state.colorList);
  const { setColorListAction } = useSettingActions();
  const handleChangeComplete = (color: string) => {
    const textColor = getTextColor(color);
    setColorListAction({ ...colorList, profile: { background: color, text: textColor } });
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
              color={colorList.profile.background}
              onChangeComplete={(color) => handleChangeComplete(color.hex)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetting;
