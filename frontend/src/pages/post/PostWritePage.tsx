import styles from "styles/PostWrite.module.css";
import Text from "components/Text";
import Button from "components/Button";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ListIcon from "@mui/icons-material/List";
import { usePostActions, usePostStore } from "stores/postStore";
import PostInfo from "features/post/PostInfo";
import PostEditor from "features/post/PostEditor";
import { useEffect, useState } from "react";
import { useAuthStore } from "stores/authStore";
import { useShallow } from "zustand/react/shallow";
import { useNavigate, useParams } from "react-router-dom";
import { deletePostApi } from "apis/api/posts";
import Modal from "components/Modal";
import PostTempModal from "features/post/PostTempModal";
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

  const [autoTempTime, setAutoTempTime] = useState("07:03:30");
  const [tempModalOpen, setTempModalOpen] = useState(false);
  const [isAutoTempExist, setIsAutoTempExist] = useState(true);
  const [tempListCnt, setTempListCnt] = useState(0);

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

  useEffect(() => {
    if (isAutoTempExist) {
      const result = setTimeout(() => {
        confirm(`${autoTempTime}에 저장된 글이 있습니다.\n이어서 작성하시겠습니까?`);
      }, 1000);
      return () => {
        clearTimeout(result);
      };
    }
  }, []);

  const tempButton = () => {
    return (
      <div className={styles.temp__button}>
        <Text value="임시저장" />
        <div></div>
        <Text value={tempListCnt.toString()} />
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div>
          <Text value={`게시글 ${isEdit}`} type="groupTitle" bold />
          <Text value={`간편하게 깃허브 블로그 게시글을 ${isEdit}해보세요.`} type="caption" color="dark_gray" />
        </div>

        <div>
          <div>
            <Button label="돌아가기" color="sky" icon={<MeetingRoomOutlinedIcon />} onClick={showCancelModal} />
            {isEdit === "수정" && <Button label="삭제하기" icon={<CloseOutlinedIcon />} onClick={showDeleteModal} />}
          </div>
          <div>
            <Text value={`자동 저장 완료 ${autoTempTime}`} color="dark_gray" type="caption" />
            <Button label={tempButton()} color="gray" icon={<ListIcon />} onClick={() => setTempModalOpen(true)} />
            <Button label="작성완료" icon={<CheckOutlinedIcon />} onClick={showSaveModal} />
          </div>
        </div>
      </div>

      <div className={styles.contents}>
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
      {tempModalOpen && <PostTempModal open={tempModalOpen} onClose={() => setTempModalOpen(false)} />}
    </div>
  );
};

export default PostWritePage;
