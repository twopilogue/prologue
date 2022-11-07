import React from "react";
import styles from "./Setting.module.css";
import ButtonStyled from "components/Button";
import palette from "styles/colorPalette";
import { useDispatch } from "react-redux";
import { setCheckList, setComponentLayoutList } from "slices/settingSlice";

interface Props {
  type: string;
  payload: any;
}

const ConfirmButton = ({ type, payload }: Props) => {
  const dispatch = useDispatch();
  const handleOnClick = () => {
    // if (type === "blogSetting")
    if (type === "layoutSetting") {
      console.log("체크", payload.checkList);
      console.log("컴포넌트", payload.componentLayoutList);
      dispatch(setCheckList(payload.checkList));
      dispatch(setComponentLayoutList(payload.componentLayoutList));
    }
  };

  return (
    <div className={styles.confirmButton}>
      <div style={{ margin: "10px" }}>
        <ButtonStyled color="sky" label="취소" />
      </div>
      <div style={{ margin: "10px" }}>
        <ButtonStyled label="저장" onClick={handleOnClick} />
      </div>
    </div>
  );
};

export default ConfirmButton;
