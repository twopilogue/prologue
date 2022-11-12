import React, { useRef, useState } from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import styles from "features/post/PostWrite.module.css";
import Text from "components/Text";
import { useAppDispatch } from "app/hooks";
import { setPostContent, setPostFileList } from "slices/postSlice";

interface PostViewerContentsProps {
  content: string;
}

const PostViewerContents = ({ content }: PostViewerContentsProps) => {
  const dispatch = useAppDispatch();

  const [showImages, setShowImages] = useState([]);
  const [fileList, setFileList] = useState([]);

  const editorRef = useRef<Editor>();

  const contentChange = () => {
    dispatch(setPostContent(editorRef.current?.getInstance().getMarkdown()));
    dispatch(setPostFileList(fileList));
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
            addImageBlobHook: (blob, callback) => {
              const uploadFileLists = [...fileList];
              const imageUrlLists = [...showImages];

              const currentImageUrl = URL.createObjectURL(blob);
              imageUrlLists.push(currentImageUrl);
              uploadFileLists.push(blob);

              setShowImages(imageUrlLists);
              setFileList(uploadFileLists);

              console.log(imageUrlLists);
              console.log(uploadFileLists);
              console.log(fileList);

              callback(currentImageUrl);
              return false;
            },
          }}
        ></Editor>
      )}
    </div>
  );
};

export default PostViewerContents;
