import { ChangeEvent, CSSProperties, Dispatch, MutableRefObject, SetStateAction, useRef } from "react";
import Text from "components/Text";
import RadioButton from "components/RadioButton";
import styles from "styles/Setting.module.css";
import ButtonStyled from "components/Button";
import Input from "components/Input";
import { RadioGroup } from "@mui/material";
import { useSettingActions, useSettingStore } from "stores/settingStore";

interface LogoSettingProps {
  logoImg: File;
  setLogoImg: Dispatch<SetStateAction<File>>;
  logoType: string;
  setLogoType: Dispatch<SetStateAction<string>>;
}

export const detailItemFolded: CSSProperties = {
  margin: "0 10px 0px 10px",
  maxHeight: "0",
  overflow: "hidden",
};
export const detailItemUnfolded: CSSProperties = {
  margin: "0 10px 10px 10px",
  maxHeight: "100%",
  overflow: "hidden",
};

const LogoSetting = ({ logoImg, setLogoImg, logoType, setLogoType }: LogoSettingProps) => {
  const colorList = useSettingStore((state) => state.colorList);
  const { setColorListAction } = useSettingActions();
  const logoImgRef = useRef<HTMLInputElement | null>(null);
  const detailItemText = useRef<any>();
  const detailItemImg = useRef<any>();
  const maxTextLength = 10;

  const radioChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLogoType((event.target as HTMLInputElement).value);
  };

  const changeLogoHeight = (e: ChangeEvent<HTMLInputElement>) => {
    if (detailItemText.current && detailItemImg.current) {
      if (e.target.value === "logoText") {
        Object.assign(detailItemText.current.style, detailItemUnfolded);
        Object.assign(detailItemImg.current.style, detailItemFolded);
      } else {
        Object.assign(detailItemText.current.style, detailItemFolded);
        Object.assign(detailItemImg.current.style, detailItemUnfolded);
      }
    } else {
      console.log("에러");
    }
  };

  const handleLogoText = (e: string) => {
    if (e.length > maxTextLength) {
      e = e.substring(0, maxTextLength);
    }
    setColorListAction({ ...colorList, logo: { ...colorList.logo, logoText: e } });
  };

  const controlImgRef = (type: MutableRefObject<HTMLInputElement>) => {
    if (!type.current) return;
    type.current.click();
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    setLogoImg(e.target.files[0]);
  };

  return (
    <div>
      <div className={styles.checkListTitle}>
        <Text value="블로그 로고" type="text" bold />
      </div>
      <div className={styles.detailContainer}>
        <div className={styles.detailItem}>
          <RadioGroup
            value={logoType}
            onChange={(e) => {
              radioChange(e);
              changeLogoHeight(e);
            }}
          >
            <RadioButton label="텍스트 설정" value="logoText" />
          </RadioGroup>
        </div>
        <div ref={detailItemText} style={detailItemUnfolded}>
          <Input
            placeholder="텍스트 입력"
            value={colorList.logo.logoText}
            onChange={(e) => handleLogoText(e.target.value)}
          />
        </div>
        <div className={styles.detailHr} />
        <div className={styles.detailItem}>
          <RadioGroup
            value={logoType}
            onChange={(e) => {
              radioChange(e);
              changeLogoHeight(e);
            }}
          >
            <RadioButton label="이미지 설정" value="logoImg" />
          </RadioGroup>
        </div>
        <div ref={detailItemImg} style={detailItemFolded}>
          <input type="file" style={{ display: "none" }} ref={logoImgRef} onChange={(e) => handleImageUpload(e)} />
          <div className={styles.detailItemImgBtn} onClick={() => controlImgRef(logoImgRef)}>
            <ButtonStyled color="blue" label="이미지 첨부" />
          </div>
          <div>
            {logoImg ? (
              <div className={styles.textInfo}>
                <Text value="이미지가 첨부되었습니다." type="caption" color="blue_4" />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoSetting;
