import styles from "features/post_before/Post.module.css";
import Text from "components/Text";
import Button from "components/Button";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

interface PostWriteProps {
  isEdit: boolean;
}

const PostWrite = ({ isEdit }: PostWriteProps) => {
  const edit = isEdit ? "수정" : "작성";
  return (
    <div className={styles.postWrite}>
      <div className={styles.textBox}>
        <Text value={`게시글 ${edit}`} type="groupTitle" bold />
        <br /> <br />
        <Text value={`간편하게 깃허브 블로그 게시글을 ${edit}해보세요.`} type="caption" color="dark_gray" />
        <div className={styles.postWriteButtons}>
          <Button
            label="돌아가기"
            color="sky"
            width="10vw"
            icon={<MeetingRoomOutlinedIcon />}
            // onClick={showCancelModal}
          />
          &nbsp; &nbsp; &nbsp;
          <Button
            label="작성완료"
            width="10vw"
            icon={<CheckOutlinedIcon />}
            // onClick={showSaveModal}
          />
        </div>
        {isEdit && (
          <div className={styles.postDeleteButton}>
            <Button
              label="삭제하기"
              width="10vw"
              icon={<CloseOutlinedIcon />}
              // onClick={showDeleteModal}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostWrite;
