import styles from "styles/PostWrite.module.css";
import Text from "components/Text";
import Button from "components/Button";
import { Drawer, Tooltip } from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";

interface Props {
  open: boolean;
  onClose: () => void;
}

const PostTempModal = ({ open, onClose }: Props) => {
  const tempList = [
    { title: "title", content: "content" },
    { title: "title", content: "content" },
    { title: "title", content: "content" },
    { title: "title", content: "content" },
    { title: "title", content: "content" },
    { title: "title", content: "content" },
    { title: "title", content: "content" },
    { title: "title", content: "content" },
    { title: "title", content: "content" },
    { title: "title", content: "content" },
    { title: "title", content: "content" },
    { title: "title", content: "content" },
    { title: "title", content: "content" },
    { title: "title", content: "content" },
    { title: "title", content: "content" },
    { title: "title", content: "content" },
    { title: "title", content: "content" },
    { title: "title", content: "content" },
    { title: "title", content: "content" },
    { title: "title", content: "content" },
    { title: "title", content: "content" },
    { title: "title", content: "content" },
  ];
  return (
    <Drawer anchor="bottom" open={open} onClose={onClose}>
      <div className={styles.temp__container}>
        <div className={styles.temp__contents}>
          <div>
            <Text value="임시저장 목록" bold />
            {/* <Tooltip title={`최대 10개의 글을 임시저장 할 수 있습니다. \n 임시저장된 글은 저장일로부터 1`} arrow>
              <HelpIcon />
            </Tooltip> */}
          </div>
          <div />
          <div className={styles.temp__list}>
            {tempList.map((item, i) => {
              return (
                <div key={i}>
                  <Text value={item.title} />
                </div>
              );
            })}
          </div>
          <div className={styles.temp_button}>
            <Button color="gray" label="취소" onClick={onClose} />
            <Button color="blue" label="임시저장" />
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default PostTempModal;
