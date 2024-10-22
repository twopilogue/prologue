import { useEffect, useRef, useState } from "react";
import styles from "styles/PostWrite.module.css";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import { getImgUrlApi } from "apis/api/posts";
import { useAuthStore } from "stores/authStore";
import { useShallow } from "zustand/react/shallow";
import { usePostActions, usePostStore } from "stores/postStore";

const PostEditor = () => {
  const [accessToken, githubId] = useAuthStore(useShallow((state) => [state.accessToken, state.githubId]));
  const editPost = usePostStore(useShallow((state) => state.editPost));
  const { setPostContentAction, setPostFileListAction, setPostFileAction } = usePostActions();

  const [fileList] = useState([]);
  const [files] = useState([]);

  const editorRef = useRef<Editor>();

  const contentChange = () => {
    setPostContentAction(editorRef.current?.getInstance().getMarkdown());
    setPostFileListAction(fileList);
  };

  useEffect(() => {
    editorRef.current.getInstance().setMarkdown(editPost.content);
  }, [editPost.content]);

  return (
    <div className={styles.editor}>
      {/* <Text value="내용" type="text" />
      <div style={{ marginTop: "1%" }}></div> */}

      <Editor
        usageStatistics={false}
        ref={editorRef}
        initialValue={editPost.content}
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
              accessToken,
              githubId,
            };
            formData.append(
              "tempImageUploadRequest",
              new Blob([JSON.stringify(tempImageUploadRequest)], { type: "application/json" }),
            );
            formData.append("file", blob);

            const imageUrl = await getImgUrlApi(formData);
            const newFile = { name: file.name, url: imageUrl };

            fileList.push(newFile);
            setPostFileListAction([...fileList]);

            files.push(blob);
            setPostFileAction([...files]);

            callback(imageUrl);
            return false;
          },
        }}
      ></Editor>
    </div>
  );
};

export default PostEditor;
