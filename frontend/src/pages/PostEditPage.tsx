import { useEffect, useState } from "react";
import styles from "features/post/PostWrite.module.css";
import Text from "components/Text";
import Button from "components/Button";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import PostWriteTitle from "../features/post/PostWriteTitle";
import { useSelector } from "react-redux";
import { rootState } from "app/store";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "apis/MultipartAxios";
import JsonAxios from "apis/JsonAxios";
import api from "apis/BaseUrl";
import PostViewerContents from "features/post/PostViewerContents";
import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  resetPostFileList,
  selectPostCategory,
  selectPostContent,
  selectPostDescription,
  selectPostEditList,
  selectPostFileList,
  selectPostFiles,
  selectPostTagList,
  selectPostTitle,
} from "slices/postSlice";
import Modal from "components/Modal";
import { deletePostApi, getPostDetailApi, modifyPostApi } from "apis/api/posts";

interface modifyDetailPostRequestProps {
  accessToken: string;
  githubId: string;
  directory: string;
  content: string;
  images: any[];
  blogType: number;
}

const PostEditPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { accessToken, githubId, blogType } = useSelector((state: rootState) => state.auth);
  const { directory } = useParams();

  // const [loading, setLoading] = useState(false);
  const [contentData, setContentData] = useState("");
  const [saveData] = useState(useAppSelector(selectPostEditList));
  const [savedFileList, setSavedFileList] = useState([]);
  const [loadingModalOpen, setLoadingModalOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  const title = useAppSelector(selectPostTitle);
  const description = useAppSelector(selectPostDescription);
  const category = useAppSelector(selectPostCategory);
  const tagList = useAppSelector(selectPostTagList);
  const content = useAppSelector(selectPostContent);
  const fileList = useAppSelector(selectPostFileList);
  const files = useAppSelector(selectPostFiles);

  const getPostDetail = async () => {
    const res = await getPostDetailApi(accessToken, githubId, directory);
    const { content, image } = res;

    setContentData(content);
    setSavedFileList(image);
  };

  useEffect(() => {
    // setLoading(true);
    getPostDetail();
    // setLoading(false);
  }, []);

  const editPost = async () => {
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
      // const file: File = files[i];
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

    if (savedFileList.length) {
      for (let i = 0; i < savedFileList.length; i++) {
        const tmp = {
          url: savedFileList[i].url,
          name: savedFileList[i].name,
        };
        tmpArray.push(tmp);
      }
    }

    const modifyDetailPostRequest: modifyDetailPostRequestProps = {
      accessToken: accessToken,
      githubId: githubId,
      directory: directory,
      content: frontMatter + content,
      images: tmpArray,
      blogType: blogType,
    };

    formData.append(
      "modifyDetailPostRequest",
      new Blob([JSON.stringify(modifyDetailPostRequest)], { type: "application/json" }),
    );

    setSaveModalOpen(false);
    setLoadingModalOpen(true);

    await modifyPostApi(formData);
    setLoadingModalOpen(false);
    setUploadModalOpen(true);
    navigate("/post");

    dispatch(resetPostFileList());
  };

  const deletePost = async () => {
    setDeleteModalOpen(false);
    setLoadingModalOpen(true);
    await deletePostApi(accessToken, githubId, directory);

    setLoadingModalOpen(false);
    setUploadModalOpen(true);
    navigate("/post");

    dispatch(resetPostFileList());
  };

  const showCancelModal = () => {
    setCancelModalOpen(true);
  };

  const showSaveModal = () => {
    setSaveModalOpen(true);
  };

  const showDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  return (
    <div className={styles.postWrite}>
      <div className={styles.textBox}>
        <Text value="게시글 수정" type="groupTitle" bold />
        <br /> <br />
        <Text value="간편하게 깃허브 블로그 게시글을 수정해보세요." type="caption" color="dark_gray" />
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
        <div className={styles.postDeleteButton}>
          <Button label="삭제하기" width="10vw" icon={<CloseOutlinedIcon />} onClick={showDeleteModal} />
        </div>
      </div>

      <div style={{ display: "flex", marginTop: "1%" }}>
        <PostWriteTitle
          savedTitle={saveData.title}
          savedDescription={saveData.description}
          savedCategory={saveData.category}
          savedTag={saveData.tag}
        />
        <PostViewerContents content={contentData} />
      </div>

      {loadingModalOpen && <Modal text={`게시글 수정을 완료하시겠습니까?`} loding />}
      {cancelModalOpen && (
        <Modal
          text={`정말 게시글 목록으로 돌아가시겠습니까?\n수정 중인 게시글은 사라집니다.`}
          twoButtonCancle={() => setCancelModalOpen(false)}
          twoButtonConfirm={() => {
            navigate("/post");
            dispatch(resetPostFileList());
          }}
        />
      )}
      {saveModalOpen && (
        <Modal
          text={`게시글 수정을 완료하시겠습니까?`}
          twoButtonCancle={() => setSaveModalOpen(false)}
          twoButtonConfirm={editPost}
        />
      )}
      {deleteModalOpen && (
        <Modal
          text={`정말 해당 게시글을 삭제하시겠습니까?\n삭제한 게시물은 복구가 불가합니다.`}
          twoButtonCancle={() => setDeleteModalOpen(false)}
          twoButtonConfirm={deletePost}
        />
      )}
      {uploadModalOpen && <Modal saveButtonClose={() => setUploadModalOpen(false)} save />}
    </div>
  );
};

export default PostEditPage;
