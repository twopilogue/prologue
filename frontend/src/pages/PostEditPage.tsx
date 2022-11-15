import React, { useEffect, useState } from "react";
import styles from "features/post/PostWrite.module.css";
import Text from "components/Text";
import Button from "components/Button";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import PostWriteTitle from "../features/post/PostWriteTitle";
import PostWriteContents from "../features/post/PostWriteContents";
import { useSelector } from "react-redux";
import { rootState } from "app/store";
import { useParams } from "react-router-dom";
import Axios from "api/MultipartAxios";
import api from "api/Api";
import PostViewerContents from "features/post/PostViewerContents";
import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  selectPostCategory,
  selectPostContent,
  selectPostDescription,
  selectPostEditList,
  selectPostFileList,
  selectPostFiles,
  selectPostTagList,
  selectPostTitle,
  setPostFileList,
} from "slices/postSlice";

interface modifyDetailPostRequestProps {
  accessToken: string;
  githubId: string;
  directory: string;
  content: string;
  images: any[];
}

const PostEditPage = () => {
  const dispatch = useAppDispatch();

  const { accessToken, githubId } = useSelector((state: rootState) => state.auth);
  const { directory } = useParams();

  const [loading, setLoading] = useState(false);
  const [contentData, setContentData] = useState("");
  const [saveData, setSaveData] = useState(useAppSelector(selectPostEditList));
  const [savedFileList, setSavedFileList] = useState([]);

  const title = useAppSelector(selectPostTitle);
  const description = useAppSelector(selectPostDescription);
  const category = useAppSelector(selectPostCategory);
  const tagList = useAppSelector(selectPostTagList);
  const content = useAppSelector(selectPostContent);
  const fileList = useAppSelector(selectPostFileList);
  const files = useAppSelector(selectPostFiles);

  const getPostDetail = async () => {
    await Axios.get(api.posts.getPostDetail(accessToken, githubId, directory))
      .then((res) => {
        console.log(res);
        setContentData(res.data.content);

        console.log("image length : ", res.data.images.length);
        for (let i = 0; i < res.data.images.length; i++) {
          const image = { name: res.data.images[i].name, url: res.data.images[i].url };
          console.log("res image : ", image);
          savedFileList.push(image);
          dispatch(setPostFileList([...savedFileList, image]));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setLoading(true);
    getPostDetail();
    setLoading(false);
  }, [loading]);

  const editPost = () => {
    const formData = new FormData();

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
      "\ntags: " +
      tagList +
      "\ndate: " +
      new Date().toISOString() +
      "\n---\n";

    const modifyDetailPostRequest: modifyDetailPostRequestProps = {
      accessToken: accessToken,
      githubId: githubId,
      directory: directory,
      content: frontMatter + content,
      images: [],
    };

    console.log("fileList : ", fileList);
    if (fileList.length) {
      for (let i = 0; i < fileList.length; i++) {
        const tmp = {
          url: fileList[i].url,
          name: fileList[i].name,
        };
        modifyDetailPostRequest.images.push(tmp);
      }
    }

    formData.append(
      "modifyDetailPostRequest",
      new Blob([JSON.stringify(modifyDetailPostRequest)], { type: "application/json" }),
    );
    console.log("modifyDetailPostRequest : ", modifyDetailPostRequest);

    Axios.put(api.posts.modifyPost(), formData)
      .then((res: any) => {
        console.log(res);
      })
      .catch((err: any) => {
        console.log(err);
      });
    dispatch(setPostFileList([]));
  };

  return (
    <div className={styles.postWrite}>
      <div className={styles.textBox}>
        <Text value="게시글 수정" type="groupTitle" bold />
        <br /> <br />
        <Text value="간편하게 깃허브 블로그 게시글을 수정해보세요." type="caption" color="dark_gray" />
        <div className={styles.postWriteButtons}>
          <Button label="돌아가기" color="sky" width="10vw" icon={<RefreshOutlinedIcon />} />
          &nbsp; &nbsp; &nbsp;
          <Button label="작성완료" width="10vw" icon={<CheckOutlinedIcon />} onClick={editPost} />
        </div>
        <div className={styles.postDeleteButton}>
          <Button label="삭제하기" width="10vw" icon={<CloseOutlinedIcon />} />
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
    </div>
  );
};

export default PostEditPage;
