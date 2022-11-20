import React, { useEffect, useState } from "react";
import styles from "features/post/PostWrite.module.css";
import Text from "components/Text";
import Button from "components/Button";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import PostWriteContents from "features/post/PostWriteContents";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { rootState } from "app/store";
import Axios from "api/MultipartAxios";
import api from "api/Api";
import PageViewerContents from "features/post/PageViewerContents";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectPostContent, selectPostFileList, selectPostFiles, setPostFileList } from "slices/postSlice";
import Modal from "components/Modal";

interface modifyDetailPageRequestProps {
  accessToken: string;
  githubId: string;
  pageName: string;
  content: string;
  images: any[];
}

const PageEditPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { accessToken, githubId } = useSelector((state: rootState) => state.auth);
  const { pageName } = useParams();

  const [loading, setLoading] = useState(false);
  const [contentData, setContentData] = useState("");
  const [savedFileList, setSavedFileList] = useState([]);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);

  const content = useAppSelector(selectPostContent);
  const fileList = useAppSelector(selectPostFileList);
  const files = useAppSelector(selectPostFiles);

  const getPageDetail = async () => {
    await Axios.get(api.posts.getPage(accessToken, githubId, pageName)).then((res) => {
      setContentData(res.data.content);

      for (let i = 0; i < res.data.images.length; i++) {
        const image = { name: res.data.images[i].name, url: res.data.images[i].url };
        savedFileList.push(image);
        dispatch(setPostFileList([...savedFileList, image]));
      }
    });
  };

  useEffect(() => {
    setLoading(true);
    getPageDetail();
    setLoading(false);
  }, [loading]);

  const editPage = () => {
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
      const file: File = files[i];
    }

    const modifyDetailPageRequest: modifyDetailPageRequestProps = {
      accessToken: accessToken,
      githubId: githubId,
      pageName: pageName,
      content: content,
      images: [],
    };

    if (fileList.length) {
      for (let i = 0; i < fileList.length; i++) {
        const tmp = {
          url: fileList[i].url,
          name: fileList[i].name,
        };
        modifyDetailPageRequest.images.push(tmp);
      }
    }

    formData.append(
      "modifyDetailPageRequest",
      new Blob([JSON.stringify(modifyDetailPageRequest)], { type: "application/json" }),
    );

    Axios.put(api.posts.modifyPage(), formData).then((res) => {
      // navigate(-1);
    });

    dispatch(setPostFileList([]));
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
        <Text value="페이지 수정" type="groupTitle" bold />
        <br /> <br />
        <Text value="간편하게 페이지 글을 수정해보세요." type="caption" color="dark_gray" />
        <div className={styles.postWriteButtons}>
          <Button label="돌아가기" color="sky" width="10vw" icon={<RefreshOutlinedIcon />} onClick={showCancelModal} />
          &nbsp; &nbsp; &nbsp;
          <Button label="작성완료" width="10vw" icon={<CheckOutlinedIcon />} onClick={showSaveModal} />
        </div>
      </div>

      <div style={{ marginTop: "1%" }}>
        {/* <PostWriteContents /> */}
        <PageViewerContents content={contentData} />
      </div>

      {cancelModalOpen && (
        <Modal
          text={`정말 페이지 설정으로 돌아가시겠습니까?\n수정 중인 페이지 내용은 사라집니다.`}
          twoButtonCancle={() => setCancelModalOpen(false)}
          twoButtonConfirm={() => navigate(-1)}
        />
      )}
      {saveModalOpen && (
        <Modal
          text={`페이지 수정을 완료하시겠습니까?`}
          twoButtonCancle={() => setSaveModalOpen(false)}
          twoButtonConfirm={editPage}
        />
      )}
    </div>
  );
};

export default PageEditPage;
