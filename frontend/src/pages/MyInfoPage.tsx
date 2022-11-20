import React, { useEffect, useState } from "react";
import styles from "features/setting/Setting.module.css";
import MyGitInfo from "features/setting/myinfo/MyGitInfo";
import MyInfoInput from "features/setting/myinfo/MyInfoInput";
import MyBlogInfoInput from "features/setting/myinfo/MyBlogInfoInput";
import axios from "axios";
import api from "api/Api";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "app/store";

import ButtonStyled from "components/Button";

import Modal from "components/Modal";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "app/hooks";
import { selectMyBlogInfo, selectMyInfo } from "slices/settingSlice";

const MyInfoPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { githubId, accessToken } = useSelector((state: rootState) => state.auth);
  const [newPic, setNewPic] = useState<Blob>(null);
  const [socialList, setSocialList] = useState({});
  const [saveModalOpen, setSaveModalOpen] = useState<boolean>(false);
  const myBlogInfo = useAppSelector(selectMyBlogInfo);
  const myInfo = useAppSelector(selectMyInfo);

  const handleOnEdit = () => {
    const tmpPayload = {
      accessToken: accessToken,
      githubId: githubId,
      title: myBlogInfo.title,
      summary: myInfo.summary,
      nickName: myInfo.nickName,
      description: myBlogInfo.description,
      social: myBlogInfo.social,
    };
    return tmpPayload;
  };

  const sendBlogInfo = async () => {
    const formData = new FormData();
    const result = handleOnEdit();

    formData.append("imageFile", newPic);
    formData.append("modifyBlogSettingRequest", new Blob([JSON.stringify(result)], { type: "application/json" }));

    await axios
      .put(api.setting.modifyBlog(), formData, {
        headers: { "Content-Type": `multipart/form-data` },
      })
      .then((res: any) => {
        console.log("됨?", res);
        alert("저장되었습니다.");
        setSaveModalOpen(false);
        window.location.reload(); // 새로고침
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const showSaveModal = () => {
    setSaveModalOpen(true);
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
            <ButtonStyled label="저장" onClick={showSaveModal} />
          </div>
        </div>
      </div>

      {saveModalOpen && (
        <Modal
          text={`작성한 정보를 저장하시겠습니까?`}
          twoButtonCancle={() => setSaveModalOpen(false)}
          twoButtonConfirm={sendBlogInfo}
        />
      )}
    </div>
  );
};

export default MyInfoPage;
