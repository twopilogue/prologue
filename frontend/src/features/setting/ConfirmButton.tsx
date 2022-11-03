import React from "react";
import styles from "./Setting.module.css";
import ButtonStyled from "components/Button";
import palette from "styles/colorPalette";

interface Props {
  type: string;
}

const ConfirmButton = ({ type }: Props) => {
  const handleOnClick = () => {
    // if (type === "blogSetting")
  };

  return (
    <div className={styles.confirmButton}>
      <div style={{ margin: "10px" }}>
        <ButtonStyled color="sky" label="취소" />
      </div>
      <div style={{ margin: "10px" }}>
        <ButtonStyled label="저장" />
      </div>
    </div>
  );
};

export default ConfirmButton;
