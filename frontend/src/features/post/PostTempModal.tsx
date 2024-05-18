import { useEffect, useState } from "react";
import styles from "styles/PostWrite.module.css";
import Text from "components/Text";
import Button from "components/Button";
import Tooltip from "components/Tooltip";
import { Drawer } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useAuthStore } from "stores/authStore";
import { getTempList } from "apis/api/temp";
import { TempPostConfig } from "interfaces/post.interface";
import dayjs from "dayjs";

interface Props {
  open: boolean;
  onClose: () => void;
}

const stringToDate = (date: string) => {
  const typedDate = new Date(date);
  return dayjs(typedDate).format("YYYY-MM-DD");
};

const PostTempModal = ({ open, onClose }: Props) => {
  const githubId = useAuthStore((state) => state.githubId);
  const [tempList, setTempList] = useState<TempPostConfig[]>([]);
  const getTempLists = async () => {
    const res = await getTempList(githubId);
    setTempList(res);
  };

  const saveTempItem = () => {
    console.log("save");
  };

  useEffect(() => {
    getTempLists();
  }, []);

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
                  <Text value={stringToDate(item.updatedAt)} type="caption" />
                  <div>
                    <Text value={item.title} type="caption" />
                    <DeleteOutlineIcon className={styles["delete"]} />
                    <div className={styles["tooltip"]}>
                      <Tooltip>{item.summary === "" ? "[ 내용 없음 ]" : item.summary}</Tooltip>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles["temp__button--save"]}>
            <Button color="gray" label="취소" onClick={onClose} />
            <Button color="blue" label="임시저장" onClick={saveTempItem} />
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default PostTempModal;
