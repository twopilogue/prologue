import React, { useState } from "react";
import styles from "features/post/PostWrite.module.css";
import Text from "components/Text";
import ButtonStyled from "components/Button";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import PostWriteTitle from "../features/post/PostWriteTitle";
import PostWriteContents from "../features/post/PostWriteContents";
import { useSelector } from "react-redux";
import { rootState } from "app/store";
import Axios from "api/MultipartAxios";
import api from "api/Api";
import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  resetPostFileList,
  selectPostCategory,
  selectPostContent,
  selectPostDescription,
  selectPostFileList,
  selectPostFiles,
  selectPostTagList,
  selectPostTitle,
} from "slices/postSlice";
import Modal from "components/Modal";
import { useNavigate } from "react-router-dom";

interface writeDetailPostRequestProps {
  accessToken: string;
  githubId: string;
  content: string;
  images: any[];
  blogType: number;
}

const PostWritePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { accessToken, githubId, blogType } = useSelector((state: rootState) => state.auth);

  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);

  const title = useAppSelector(selectPostTitle);
  const description = useAppSelector(selectPostDescription);
  const category = useAppSelector(selectPostCategory);
  const tagList = useAppSelector(selectPostTagList);
  const content = useAppSelector(selectPostContent);
  const fileList = useAppSelector(selectPostFileList);
  const files = useAppSelector(selectPostFiles);

  const savePost = () => {
    const formData = new FormData();
    console.log("files : ", files);
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
      const file: File = files[i];
      console.log("files[i] : ", file.name);
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

    const writeDetailPostRequest: writeDetailPostRequestProps = {
      accessToken: accessToken,
      githubId: githubId,
      content: frontMatter + content,
      images: [],
      blogType: blogType,
    };

    console.log("fileList length : ", fileList.length);
    if (fileList.length) {
      for (let i = 0; i < fileList.length; i++) {
        const tmp = {
          url: fileList[i].url,
          name: fileList[i].name,
        };
        console.log("tmp : ", tmp);
        writeDetailPostRequest.images.push(tmp);
      }
    }

    formData.append(
      "writeDetailPostRequest",
      new Blob([JSON.stringify(writeDetailPostRequest)], { type: "application/json" }),
    );

    Axios.post(api.posts.writePost(), formData)
      .then((res) => {
        console.log(res);
        navigate("/post");
      })
      .catch((err) => {
        console.log(err);
      });
    dispatch(resetPostFileList());
  };

  const showCancelModal = () => {
    setCancelModalOpen(true);
  };

  const showSaveModal = () => {
    setSaveModalOpen(true);
  };

  return (
    <div className={styles.postWrite}>
      <div className={styles.textBox}>
        <Text value="게시글 작성" type="groupTitle" bold />
        <br />
        <br />
        <Text value="간편하게 깃허브 블로그 게시글을 작성해보세요." type="caption" color="dark_gray" />

        <div className={styles.postWriteButtons}>
          <ButtonStyled
            label="돌아가기"
            color="sky"
            width="10vw"
            icon={<MeetingRoomOutlinedIcon />}
            onClick={showCancelModal}
          />
          &nbsp; &nbsp; &nbsp;
          {/* <ButtonStyled label="미리보기" width="10vw" /> */}
          <ButtonStyled label="작성완료" width="10vw" icon={<CheckOutlinedIcon />} onClick={showSaveModal} />
        </div>
      </div>

      <div style={{ display: "flex", marginTop: "1%" }}>
        <PostWriteTitle />
        <PostWriteContents />
      </div>

      {cancelModalOpen && (
        <Modal
          text={`정말 게시글 목록으로 돌아가시겠습니까?\n작성 중인 게시글은 사라집니다.`}
          twoButtonCancle={() => setCancelModalOpen(false)}
          twoButtonConfirm={() => navigate("/post")}
        />
      )}
      {saveModalOpen && (
        <Modal
          text={`게시글 작성을 완료하시겠습니까?`}
          twoButtonCancle={() => setSaveModalOpen(false)}
          twoButtonConfirm={savePost}
        />
      )}
    </div>
  );
};

export default PostWritePage;
