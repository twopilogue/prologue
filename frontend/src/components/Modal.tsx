import React from "react";
import { Stack } from "@mui/material";
import Button from "./Button";
import styles from "./css/Modal.module.css";

interface Props {
  buttonNum: number;
  text: string;
  oneButtonLabel?: string;
  oneButtonSet?: () => void;
  twoButtonConfirm?: () => void;
  twoButtonCancle?: () => void;
}

Modal.defaultProps = {
  buttonNum: 2,
  text: `내용`,
  oneButtonLabel: "Button",
};

function Modal({
  text,
  buttonNum,
  oneButtonLabel,
  oneButtonSet,
  twoButtonConfirm,
  twoButtonCancle,
}: Props) {
  // 모달 끄기

  return (
    <div className={styles.background}>
      <div className={styles.inDiv}>
        <Stack justifyContent="center" alignItems="center" spacing={2}>
          <p className={styles.text}>
            {text}
          </p>
          {buttonNum === 1 ? (
            <Button label={oneButtonLabel} onClick={oneButtonSet} />
          ) : (
            <Stack direction="row" spacing={2}>
              <Button label="취소" color="sky" onClick={twoButtonCancle} />
              <Button label="확인" onClick={twoButtonConfirm} />
            </Stack>
          )}
        </Stack>
      </div>
    </div>
  );
}
export default Modal;
