import { useRef, useState } from "react";
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
import Axios from "apis/MultipartAxios";
import api from "apis/BaseUrl";

interface PageViewerContentsProps {
  content: string;
}

const PageViewerContents = ({ content }: PageViewerContentsProps) => {
  const dispatch = useAppDispatch();

  const { accessToken, githubId } = useSelector((state: rootState) => state.auth);

  const [fileList] = useState([]);
  const [files] = useState([]);

  const editorRef = useRef<Editor>();

  const contentChange = () => {
    dispatch(setPostContent(editorRef.current?.getInstance().getMarkdown()));
    // dispatch(setPostFileList(fileList));
  };

  return (
    <div className={styles.pageWriteContents}>
      <Text value="내용" type="text" />
      <div style={{ marginTop: "1%" }}></div>

      {content && (
        <Editor
          usageStatistics={false}
          ref={editorRef}
          initialValue={content}
          previewStyle="vertical"
          height="70vh"
          initialEditType="markdown"
          hideModeSwitch={true}
          plugins={[colorSyntax]}
          onChange={contentChange}
          hooks={{
            addImageBlobHook: async (blob, callback) => {
              const formData = new FormData();
              const file: any = blob; // 추후 에디터 설정 변경 후 수정하기.

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

export default PageViewerContents;
