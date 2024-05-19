import { useEffect, useState } from "react";
import styles from "styles/PostWrite.module.css";
import Text from "components/Text";
import Button from "components/Button";
import Tooltip from "components/Tooltip";
import { Drawer } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useAuthStore } from "stores/authStore";
import { getTempList, getTempPost, writeTempPost } from "apis/api/temp";
import { TempPostConfig } from "interfaces/post.interface";
import dayjs from "dayjs";
import { usePostActions, usePostStore } from "stores/postStore";
import { useShallow } from "zustand/react/shallow";

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
  const editPost = usePostStore(useShallow((state) => state.editPost));
  const [tempList, setTempList] = useState<TempPostConfig[]>([]);
  const { setEditPostAction } = usePostActions();

  const getTempLists = async () => {
    const res = await getTempList(githubId);
    setTempList(res);
  };

  const saveTempItem = async () => {
    const { title, description, category, tagList, content } = editPost;
    const data = {
      githubId,
      title,
      description,
      category,
      tags: tagList,
      content,
    };
    await writeTempPost(data);
    getTempLists();
  };

  const setEditPost = async (id: number) => {
    const res = await getTempPost(githubId, id);
    const { title, description, category, tags, content } = res;
    setEditPostAction({
      title,
      description,
      category,
      tagList: tags,
      content,
    });
    onClose();
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
                    <div onClick={() => setEditPost(item.tempPostId)}>
                      <Text value={item.title} type="caption" />
                    </div>
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
