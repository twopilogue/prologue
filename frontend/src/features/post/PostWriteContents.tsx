import React, { useEffect, useRef, useState } from "react";
import styles from "features/post/PostWrite.module.css";
import Text from "components/Text";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectPostFileList, setPostContent, setPostFileList } from "slices/postSlice";
import api from "api/Api";
import { useSelector } from "react-redux";
import { rootState } from "app/store";
import Axios from "api/MultipartAxios";

const PostWriteContents = () => {
  const dispatch = useAppDispatch();

  const { accessToken, githubId } = useSelector((state: rootState) => state.auth);

  const [showImages, setShowImages] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [tmpFileList, setTmpFileList] = useState<any[]>(useAppSelector(selectPostFileList));

  const editorRef = useRef<Editor>();

  const contentChange = () => {
    dispatch(setPostContent(editorRef.current?.getInstance().getMarkdown()));
    // dispatch(setPostFileList(fileList));
  };

  return (
    <div className={styles.postWriteContents}>
      <Text value="내용" type="text" />
      <div style={{ marginTop: "1%" }}></div>
      <Editor
        ref={editorRef}
        initialValue=""
        previewStyle="vertical"
        height="70vh"
        initialEditType="markdown"
        plugins={[colorSyntax]}
        onChange={contentChange}
        hooks={{
          addImageBlobHook: async (blob, callback) => {
            // const uploadFileLists = [...fileList];
            // const imageUrlLists = [...showImages];

            const formData = new FormData();
            const file: any = blob;
            console.log(blob);

            const tempImageUploadRequest = {
              accessToken: accessToken,
              githubId: githubId,
            };
            formData.append(
              "tempImageUploadRequest",
              new Blob([JSON.stringify(tempImageUploadRequest)], { type: "application/json" }),
            );
            formData.append("file", blob);

            let imageUrl;
            await Axios.put(api.posts.getImgUrl(), formData)
              .then((res: any) => {
                console.log(res);
                imageUrl = res.data.tempImageUrl;
              })
              .catch((err: any) => {
                console.log(err);
              });

            // console.log("tempFileList : ", tempFileList);
            const newFile = { name: file.name, url: imageUrl };
            console.log("newFile : ", newFile);

            dispatch(setPostFileList([...tmpFileList, newFile]));
            // imageUrlLists.push(imageUrl);
            // uploadFileLists.push(blob);

            // setShowImages(imageUrlLists);
            // setFileList(uploadFileLists);

            // console.log(imageUrlLists);
            // console.log(uploadFileLists);
            // console.log(fileList);

            callback(imageUrl);
            return false;
          },
        }}
      ></Editor>
    </div>
  );
};

export default PostWriteContents;
