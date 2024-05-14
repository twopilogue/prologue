import styles from "styles/PostWrite.module.css";
import Text from "components/Text";
import Button from "components/Button";
import Tooltip from "components/Tooltip";
import { Drawer } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

interface Props {
  open: boolean;
  onClose: () => void;
}

const PostTempModal = ({ open, onClose }: Props) => {
  const tempList = [
    { date: "2024.01.01", title: "제목 없음", content: "" },
    { date: "2024.01.01", title: "hi~ hihihi", content: "" },
    { date: "2024.01.01", title: "[Algorithm] 비트마스킹 (Bitmasking)", content: "asdfasdfasdf" },
    { date: "2024.01.01", title: "[Prologue] 프롤로그 개선기 #1. 환경 개선", content: "asdfasdfasdf" },
    { date: "2024.01.01", title: "[Prologue] 프롤로그 개선기 #1. 환경 개선", content: "asdfasdfasdf" },
    { date: "2024.01.01", title: "[Prologue] 프롤로그 개선기 #1. 환경 개선", content: "asdfasdfasdf" },
    { date: "2024.01.01", title: "[Prologue] 프롤로그 개선기 #1. 환경 개선", content: "asdfasdfasdf" },
    { date: "2024.01.01", title: "[Prologue] 프롤로그 개선기 #1. 환경 개선", content: "asdfasdfasdf" },
    { date: "2024.01.01", title: "[Prologue] 프롤로그 개선기 #1. 환경 개선", content: "asdfasdfasdf" },
    { date: "2024.01.01", title: "[Prologue] 프롤로그 개선기 #1. 환경 개선", content: "asdfasdfasdf" },
  ];
  return (
    <Drawer anchor="bottom" open={open} onClose={onClose}>
      <div className={styles.temp__container}>
        <div className={styles.temp__contents}>
          <div>
            <Text value="임시저장 목록" bold />
          </div>
          <div />
          <div className={styles["temp__list"]}>
            {tempList.map((item, i) => {
              return (
                <div key={i}>
                  <Text value={item.date} type="caption" />
                  <div>
                    <Text value={item.title} type="caption" />
                    <DeleteOutlineIcon className={styles["delete"]} />
                    <div className={styles["tooltip"]}>
                      <Tooltip>{item.content === "" ? "[ 내용 없음 ]" : item.content}</Tooltip>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles["temp__button--save"]}>
            <Button color="gray" label="취소" onClick={onClose} />
            <Button color="blue" label="임시저장" />
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default PostTempModal;
