import styles from "styles/Post.module.css";
import Text from "components/Text";
import Button from "components/Button";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { usePostActions, usePostStore } from "stores/postStore";
import PostInfo from "features/post/PostInfo";
import PostEditor from "features/post/PostEditor";
import { useState } from "react";
import { useAuthStore } from "stores/authStore";
import { useShallow } from "zustand/react/shallow";
import { useNavigate, useParams } from "react-router-dom";
import { deletePostApi } from "apis/api/posts";
import Modal from "components/Modal";
import Axios from "apis/MultipartAxios";
import api from "apis/BaseUrl";

interface writeDetailPostRequestProps {
  accessToken: string;
  githubId: string;
  content: string;
  images: any[];
  blogType: number;
}
interface modifyDetailPostRequestProps {
  accessToken: string;
  githubId: string;
  directory: string;
  content: string;
  images: any[];
  blogType: number;
}

const PostWritePage = () => {
  const navigate = useNavigate();
  const { directory } = useParams();
  const [accessToken, githubId, blogType] = useAuthStore(
    useShallow((state) => [state.accessToken, state.githubId, state.blogType]),
  );
  const isEdit = usePostStore((state) => state.isEdit) ? "수정" : "작성";
  const editPost = usePostStore((state) => state.editPost);
  const { title, description, category, content, tagList, images: fileList, files = [] } = editPost;
  const { resetPostFileListAction } = usePostActions();

  const [loadingModalOpen, setLoadingModalOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  const handleSave = async () => {
    if (title == "") {
      setSaveModalOpen(false);
      document.getElementById("titleError").style.display = "inline";
      setTimeout(() => {
        document.getElementById("titleError").style.display = "none";
      }, 3500);
    }

    if (description == "") {
      setSaveModalOpen(false);
      document.getElementById("descriptionError").style.display = "inline";
      setTimeout(() => {
        document.getElementById("descriptionError").style.display = "none";
      }, 3500);
    }

    if (title != "" && description != "" && content != "") {
      const formData = new FormData();
      console.log(fileList);
      console.log(files);
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }

      const frontMatter =
        "---\ntitle: " +
        title +
        "\ndescription: " +
        description +
        "\ncategory: " +
        category +
        "\ntags: [" +
        tagList +
        "]\ndate: " +
        new Date().toISOString() +
        "\n---\n";

      if (isEdit === "수정") {
        console.log("isEdit: ", isEdit);
        const tmpArray = [];

        if (fileList.length) {
          for (let i = 0; i < fileList.length; i++) {
            const tmp = {
              url: fileList[i].url,
              name: fileList[i].name,
            };

            tmpArray.push(tmp);
          }
        }

        const modifyDetailPostRequest: modifyDetailPostRequestProps = {
          accessToken,
          githubId,
          directory,
          content: frontMatter + content,
          images: tmpArray,
          blogType,
        };

        formData.append(
          "modifyDetailPostRequest",
          new Blob([JSON.stringify(modifyDetailPostRequest)], { type: "application/json" }),
        );

        setSaveModalOpen(false);
        setLoadingModalOpen(true);

        // await modifyPostApi(formData); // 추후 수정 (+ post)
        await Axios.put(api.posts.modifyPost(), formData);

        setLoadingModalOpen(false);
        setUploadModalOpen(true);
      } else {
        // 작성
        const writeDetailPostRequest: writeDetailPostRequestProps = {
          accessToken,
          githubId,
          content: frontMatter + content,
          images: [],
          blogType,
        };

        if (fileList.length) {
          for (let i = 0; i < fileList.length; i++) {
            const tmp = {
              url: fileList[i].url,
              name: fileList[i].name,
            };
            writeDetailPostRequest.images.push(tmp);
          }
        }

        formData.append(
          "writeDetailPostRequest",
          new Blob([JSON.stringify(writeDetailPostRequest)], { type: "application/json" }),
        );

        setSaveModalOpen(false);
        setLoadingModalOpen(true);
        await Axios.post(api.posts.writePost(), formData);

        setLoadingModalOpen(false);
        setUploadModalOpen(true);
      }

      navigate("/post");
      resetPostFileListAction();
    }
  };

  const handleDelete = async () => {
    setDeleteModalOpen(false);
    setLoadingModalOpen(true);
    await deletePostApi(accessToken, githubId, directory);

    setLoadingModalOpen(false);
    setUploadModalOpen(true);
    navigate("/post");

    resetPostFileListAction();
  };

  const showSaveModal = () => setSaveModalOpen(true);
  const showCancelModal = () => setCancelModalOpen(true);
  const showDeleteModal = () => setDeleteModalOpen(true);

  return (
    <div className={styles.postWrite}>
      <div className={styles.textBox}>
        <Text value={`게시글 ${isEdit}`} type="groupTitle" bold />
        <br /> <br />
        <Text value={`간편하게 깃허브 블로그 게시글을 ${isEdit}해보세요.`} type="caption" color="dark_gray" />
        <div className={styles.postWriteButtons}>
          <Button
            label="돌아가기"
            color="sky"
            width="10vw"
            icon={<MeetingRoomOutlinedIcon />}
            onClick={showCancelModal}
          />
          &nbsp; &nbsp; &nbsp;
          <Button label="작성완료" width="10vw" icon={<CheckOutlinedIcon />} onClick={showSaveModal} />
        </div>
        {isEdit === "수정" && (
          <div className={styles.postDeleteButton}>
            <Button label="삭제하기" width="10vw" icon={<CloseOutlinedIcon />} onClick={showDeleteModal} />
          </div>
        )}
      </div>

      <div style={{ display: "flex", marginTop: "1%" }}>
        <PostInfo />
        <PostEditor />
      </div>

      {loadingModalOpen && <Modal text={`게시글 ${isEdit}을 완료하시겠습니까?`} loding />}

      {cancelModalOpen && (
        <Modal
          text={`정말 게시글 목록으로 돌아가시겠습니까?\n작성 중인 게시글은 사라집니다.`}
          twoButtonCancel={() => setCancelModalOpen(false)}
          twoButtonConfirm={() => navigate("/post")}
        />
      )}
      {deleteModalOpen && (
        <Modal
          text={`정말 해당 게시글을 삭제하시겠습니까?\n삭제한 게시물은 복구가 불가합니다.`}
          twoButtonCancel={() => setDeleteModalOpen(false)}
          twoButtonConfirm={handleDelete}
        />
      )}
      {saveModalOpen && (
        <Modal
          text={`게시글 ${isEdit}을 완료하시겠습니까?`}
          twoButtonCancel={() => setSaveModalOpen(false)}
          twoButtonConfirm={handleSave}
        />
      )}
      {uploadModalOpen && <Modal saveButtonClose={() => setUploadModalOpen(false)} save />}
    </div>
  );
};

export default PostWritePage;
