import React, { ChangeEvent, Dispatch, MutableRefObject, SetStateAction, useRef } from "react";
import Text from "components/Text";
import RadioButton from "components/RadioButton";
import styles from "../../Setting.module.css";
import ButtonStyled from "components/Button";

interface LogoSettingProps {
  logoImg: File;
  setLogoImg: Dispatch<SetStateAction<File>>;
}

const LogoSetting = ({ logoImg, setLogoImg }: LogoSettingProps) => {
  const logoImgRef = useRef<HTMLInputElement | null>(null);

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
      <div className={styles.detailItem}>
        <RadioButton label="이미지 설정" value="color" checked />
      </div>
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
  );
};

export default LogoSetting;
