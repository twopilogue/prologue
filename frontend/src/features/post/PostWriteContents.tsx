import React, { useEffect, useRef, useState } from "react";
import styles from "features/post/PostWrite.module.css";
import Text from "components/Text";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { useAppDispatch } from "app/hooks";
import { setPostContents } from "slices/postSlice";

const PostWriteContents = () => {
  const dispatch = useAppDispatch();

  const [showImages, setShowImages] = useState([]);
  const [fileList, setFileList] = useState([]);

  const editorRef = useRef<Editor>();

  useEffect(() => {
    // dispatch(setPostContents());
  }, [editorRef]);

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
    </div>
  );
};

export default PostWriteContents;
