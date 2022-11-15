import React, { useRef, useState } from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import styles from "features/post/PostWrite.module.css";
import Text from "components/Text";
import { useAppDispatch } from "app/hooks";
import { setPostContent, setPostFileList, setPostFiles } from "slices/postSlice";
import { useSelector } from "react-redux";
import { rootState } from "app/store";
import Axios from "api/MultipartAxios";
import api from "api/Api";

interface PostViewerContentsProps {
  content: string;
}

const PostViewerContents = ({ content }: PostViewerContentsProps) => {
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
      <Text value="내용" type="text" />
      <div style={{ marginTop: "1%" }}></div>

      {content && (
        <Editor
          ref={editorRef}
          initialValue={content}
          previewStyle="vertical"
          height="70vh"
          initialEditType="markdown"
          plugins={[colorSyntax]}
          onChange={contentChange}
          hooks={{
            addImageBlobHook: async (blob, callback) => {
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

              const newFile = { name: file.name, url: imageUrl };
              console.log("newFile:", newFile);

              fileList.push(newFile);
              dispatch(setPostFileList([...fileList, newFile]));

              files.push(blob);
              dispatch(setPostFiles([...files, blob]));

              callback(imageUrl);
              return false;
            },
          }}
        ></Editor>
      )}
    </div>
  );
};

export default PostViewerContents;
