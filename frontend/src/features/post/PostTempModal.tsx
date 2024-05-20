import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "styles/PostWrite.module.css";
import Text from "components/Text";
import Button from "components/Button";
import Tooltip from "components/Tooltip";
import { Drawer } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useAuthStore } from "stores/authStore";
import { deleteTempPost, getTempList, getTempPost, writeTempPost } from "apis/api/temp";
import { TempPostConfig } from "interfaces/post.interface";
import dayjs from "dayjs";
import { usePostActions, usePostStore } from "stores/postStore";
import { useShallow } from "zustand/react/shallow";

interface Props {
  open: boolean;
  onClose: () => void;
  tempListCnt: number;
  setTempListCnt: Dispatch<SetStateAction<number>>;
}

const stringToDate = (date: string) => {
  const typedDate = new Date(date);
  return dayjs(typedDate).format("YYYY-MM-DD");
};

const PostTempModal = ({ open, onClose, tempListCnt, setTempListCnt }: Props) => {
  const githubId = useAuthStore((state) => state.githubId);
  const editPost = usePostStore(useShallow((state) => state.editPost));
  const [tempList, setTempList] = useState<TempPostConfig[]>([]);
  const { setEditPostAction, setTempIdAction } = usePostActions();

  const getTempLists = async () => {
    const res = await getTempList(githubId);
    setTempList(res);
  };

  const handleSave = async () => {
    const { title, description, category, tagList, content } = editPost;
    if (title === "" || description === "" || content === "") return;
    const data = {
      githubId,
      title,
      description,
      category,
      tags: tagList,
      content,
    };
    await writeTempPost(data);
    setTempListCnt(tempListCnt + 1);
    onClose();
  };

  const handleDelete = async (id: number) => {
    const res = confirm("임시저장 글을 정말 삭제하시겠습니까?");
    if (res) {
      await deleteTempPost(githubId, id);
      getTempLists();
      setTempListCnt(tempListCnt - 1);
    }
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
    setTempIdAction(id);
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
                    <DeleteOutlineIcon className={styles["delete"]} onClick={() => handleDelete(item.tempPostId)} />
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
            <Button color="blue" label="임시저장" onClick={handleSave} />
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default PostTempModal;
