import React from "react";
import styles from "features/post/PostWrite.module.css";
import Text from "components/Text";
import ButtonStyled from "components/Button";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import PostWriteTitle from "../features/post/PostWriteTitle";
import PostWriteContents from "../features/post/PostWriteContents";
import { useSelector } from "react-redux";
import { rootState } from "app/store";
import Axios from "api/MultipartAxios";
import api from "api/Api";
import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  selectPostCategory,
  selectPostContent,
  selectPostDescription,
  selectPostFileList,
  selectPostTagList,
  selectPostTitle,
  setPostFileList,
} from "slices/postSlice";

interface writeDetailPostRequestProps {
  accessToken: string;
  githubId: string;
  content: string;
  images: any[];
}

const PostWritePage = () => {
  const dispatch = useAppDispatch();

  const { accessToken, githubId } = useSelector((state: rootState) => state.auth);
  const title = useAppSelector(selectPostTitle);
  const description = useAppSelector(selectPostDescription);
  const category = useAppSelector(selectPostCategory);
  const tagList = useAppSelector(selectPostTagList);
  const content = useAppSelector(selectPostContent);
  const fileList = useAppSelector(selectPostFileList);

  const savePost = () => {
    const formData = new FormData();
    console.log("fileList : ", fileList);
    // for (let i = 0; i < fileList.length; i++) {
    //   formData.append("files", fileList[i]);
    //   const file: File = fileList[i];
    //   console.log("fileList[i] : ", file.name);
    // }

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

    const writeDetailPostRequest: writeDetailPostRequestProps = {
      accessToken: accessToken,
      githubId: githubId,
      content: frontMatter + content,
      images: [],
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
        <Text value="게시글 작성" type="groupTitle" bold />
        <br />
        <br />
        <Text value="간편하게 깃허브 블로그 게시글을 작성해보세요." type="caption" color="dark_gray" />

        <div className={styles.postWriteButtons}>
          <ButtonStyled label="돌아가기" color="sky" width="10vw" icon={<RefreshOutlinedIcon />} />
          &nbsp; &nbsp; &nbsp;
          {/* <ButtonStyled label="미리보기" width="10vw" /> */}
          <ButtonStyled label="작성완료" width="10vw" icon={<CheckOutlinedIcon />} onClick={savePost} />
        </div>
      </div>

      <div style={{ display: "flex", marginTop: "1%" }}>
        <PostWriteTitle />
        <PostWriteContents />
      </div>
    </div>
  );
};

export default PostWritePage;
