import { useState } from "react";
import styles from "styles/Setting.module.css";
import MyGitInfo from "features/setting/myinfo/MyGitInfo";
import MyInfoInput from "features/setting/myinfo/MyInfoInput";
import MyBlogInfoInput from "features/setting/myinfo/MyBlogInfoInput";
import ButtonStyled from "components/Button";
import Modal from "components/Modal";
import { useAuthStore } from "stores/authStore";
import { useShallow } from "zustand/react/shallow";
import { useSettingStore } from "stores/settingStore";
import Axios from "apis/MultipartAxios";
import api from "apis/BaseUrl";

const MyInfoPage = () => {
  const [accessToken, githubId] = useAuthStore(useShallow((state) => [state.accessToken, state.githubId]));
  const [myInfo, myBlogInfo] = useSettingStore(useShallow((state) => [state.myInfo, state.myBlogInfo]));
  const [newPic, setNewPic] = useState<Blob>(null);
  const [saveModalOpen, setSaveModalOpen] = useState<boolean>(false);
  const [loadingModalOpen, setLoadingModalOpen] = useState<boolean>(false);
  const [finModalOpen, setFinModalOpen] = useState<boolean>(false);

  const handleOnEdit = () => {
    const tmpPayload = {
      accessToken,
      githubId,
      title: myBlogInfo.title,
      summary: myInfo.summary,
      nickName: myInfo.nickName,
      description: myBlogInfo.description,
      social: myBlogInfo.social,
    };
    return tmpPayload;
  };

  const sendBlogInfo = async () => {
    setSaveModalOpen(false);
    setLoadingModalOpen(true);

    const formData = new FormData();
    const result = handleOnEdit();

    formData.append("imageFile", newPic);
    formData.append("modifyBlogSettingRequest", new Blob([JSON.stringify(result)], { type: "application/json" }));
    // await modifyBlogApi(formData); // 추후 수정
    await Axios.put(api.setting.modifyBlog(), formData);
    setLoadingModalOpen(false);
    setFinModalOpen(true);
  };

  return (
    <div>
      <MyGitInfo />
      <div className={styles.hr}></div>
      <MyInfoInput setNewPic={setNewPic} />
      <div className={styles.hr}></div>
      <MyBlogInfoInput />
      <div>
        <div className={styles.confirmButton}>
          <div style={{ margin: "10px" }}>
            <ButtonStyled label="저장" onClick={() => setSaveModalOpen(true)} />
          </div>
        </div>
      </div>

      {saveModalOpen && (
        <Modal
          text={`작성한 정보를 저장하시겠습니까?`}
          twoButtonCancel={() => setSaveModalOpen(false)}
          twoButtonConfirm={sendBlogInfo}
        />
      )}
      {loadingModalOpen && <Modal text={`설정한 레이아웃을 저장하시겠습니까?`} loding />}
      {finModalOpen && (
        <Modal
          saveButtonClose={() => {
            setFinModalOpen(false);
            window.location.reload(); // 새로고침
          }}
          save
        />
      )}
    </div>
  );
};

export default MyInfoPage;
