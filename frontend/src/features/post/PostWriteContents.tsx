import React from "react";
import styles from "features/post/PostWrite.module.css";
import Text from "components/Text";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

const PostWriteContents = () => {
  return (
    <div className={styles.postWriteContents}>
      <Text value="내용" type="text" />
      <Editor
        initialValue=""
        previewStyle="vertical"
        height="60vh"
        initialEditType="markdown"
      ></Editor>
    </div>
  );
};

export default PostWriteContents;
