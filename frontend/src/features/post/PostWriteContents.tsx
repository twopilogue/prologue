import React, { useRef, useState } from "react";
import styles from "features/post/PostWrite.module.css";
import Text from "components/Text";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import { useAppDispatch } from "app/hooks";
import { setPostContent, setPostFileList, setPostFiles } from "slices/postSlice";
import api from "api/Api";
import { useSelector } from "react-redux";
import { rootState } from "app/store";
import Axios from "api/MultipartAxios";

const PostWriteContents = () => {
  const dispatch = useAppDispatch();

  const { accessToken, githubId } = useSelector((state: rootState) => state.auth);

  const [fileList, setFileList] = useState([]);
  const [files, setFiles] = useState([]);

  const editorRef = useRef<Editor>();

  const contentChange = () => {
    dispatch(setPostContent(editorRef.current?.getInstance().getMarkdown()));
    // dispatch(setPostFileList(fileList));
  };

  return (
    <div className={styles.postWriteContents}>
      {/* <Text value="내용" type="text" />
      <div style={{ marginTop: "1%" }}></div> */}

      <Editor
        usageStatistics={false}
        ref={editorRef}
        initialValue=""
        previewStyle="vertical"
        height="100%"
        initialEditType="markdown"
        hideModeSwitch={true}
        plugins={[colorSyntax]}
        onChange={contentChange}
        hooks={{
          addImageBlobHook: async (blob, callback) => {
            const formData = new FormData();
            const file: any = blob;

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
            await Axios.put(api.posts.getImgUrl(), formData).then((res) => {
              imageUrl = res.data.tempImageUrl;
            });

            const newFile = { name: file.name, url: imageUrl };

            fileList.push(newFile);
            dispatch(setPostFileList([...fileList]));

            files.push(blob);
            dispatch(setPostFiles([...files]));

            callback(imageUrl);
            return false;
          },
        }}
      ></Editor>
    </div>
  );
};

export default PostWriteContents;
