import React from "react";
import { CircularProgress, Stack } from "@mui/material";
import Text from "./Text";
import Button from "./Button";
import styles from "./css/Modal.module.css";
import palette from "styles/colorPalette";
import { useNavigate } from "react-router-dom";

interface Props {
  buttonNum: 1 | 2;
  text: string;
  oneButtonLabel?: string;
  oneButtonSet?: () => void;
  twoButtonConfirm?: () => void;
  twoButtonCancle?: () => void;
  saveButtonClose?: () => void;
  loding?: boolean;
  save?: boolean;
}

Modal.defaultProps = {
  buttonNum: 2,
  text: `저장이 완료되었습니다.`,
  oneButtonLabel: "Button",
};

function Modal({
  text,
  buttonNum,
  oneButtonLabel,
  oneButtonSet,
  twoButtonConfirm,
  twoButtonCancle,
  saveButtonClose,
  loding,
  save,
}: Props) {
  const navigate = useNavigate();
  // 모달 끄기

  return (
    <div className={styles.background}>
      <div className={styles.inDiv}>
        <Stack justifyContent="center" alignItems="center" spacing={2}>
          {loding ? (
            <>
              <p className={styles.hiddenDiv}>{text}</p>
              <div className={styles.hiddenDiv}>
                <Button />
              </div>
              <CircularProgress className={styles.progress} sx={{ color: "gray" }} />
            </>
          ) : save ? (
            <>
              <div style={{ margin: "1rem 0" }}>
                <Stack spacing={2}>
                  <span>저장이 완료되었습니다.</span>
                  <span style={{ fontSize: "0.875rem", color: "gray" }}>
                    저장된 내용은 대시보드의 <b>변경사항 배포</b> 클릭 시 반영됩니다.
                  </span>
                </Stack>
              </div>

              <Stack direction="row" spacing={2}>
                <Button label="닫기" color="sky" onClick={saveButtonClose} />
                <Button label="대시보드 이동" onClick={() => navigate("/dashboard")} />
              </Stack>
            </>
          ) : (
            <>
              <p>{text}</p>
              {buttonNum === 1 ? (
                <Button label={oneButtonLabel} onClick={oneButtonSet} />
              ) : (
                <Stack direction="row" spacing={2}>
                  <Button label="취소" color="sky" onClick={twoButtonCancle} />
                  <Button label="확인" onClick={twoButtonConfirm} />
                </Stack>
              )}
            </>
          )}
        </Stack>
      </div>
    </div>
  );
}
export default Modal;
