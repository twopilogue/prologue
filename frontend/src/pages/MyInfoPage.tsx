import React, { useEffect, useState } from "react";
import styles from "features/setting/Setting.module.css";
import MyGitInfo from "features/setting/myinfo/MyGitInfo";
import MyInfoInput from "features/setting/myinfo/MyInfoInput";
import MyBlogInfoInput from "features/setting/myinfo/MyBlogInfoInput";
import axios from "axios";
import api from "api/Api";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "app/store";
import {
  blogInfoConfig,
  ComponentConfig,
  setBlogSettingInfo,
  setUserCheckList,
  setUserComponentLayoutList,
  setUserComponentList,
} from "slices/settingSlice";
import ButtonStyled from "components/Button";
import Axios from "api/JsonAxios";
import { Layout } from "react-grid-layout";
import Modal from "components/Modal";
import { useNavigate } from "react-router-dom";

export interface myInfoProps {
  nickName: string;
  summary: string;
  profileImg: string | FormData;
}

export interface myBlogInfoProps {
  title: string;
  description: string;
  social: object;
}

const MyInfoPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { githubId, accessToken } = useSelector((state: rootState) => state.auth);
  const [newPic, setNewPic] = useState<Blob>(null);
  const [socialList, setSocialList] = useState({});
  const [saveModalOpen, setSaveModalOpen] = useState<boolean>(false);
  const [myInfo, setMyInfo] = useState<myInfoProps>({
    nickName: "",
    summary: "",
    profileImg: null,
  });
  const [myBlogInfo, setMyBlogInfo] = useState<myBlogInfoProps>({
    title: "",
    description: "",
    social: {},
  });

  const getBlogInfo = async () => {
    await axios
      .get(api.setting.getBlog(accessToken, githubId))
      .then((res: any) => {
        const result: blogInfoConfig = res.data;

        dispatch(setBlogSettingInfo(result));

        setMyInfo({
          nickName: result.nickName,
          summary: result.summary,
          profileImg: result.profileImg,
        });
        setMyBlogInfo({
          title: result.title,
          description: result.description,
          social: result.social,
        });
      })

      .catch((err: any) => {
        console.log(err);
      });
  };

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

  useEffect(() => {
    getBlogInfo();
  }, []);

  return (
    <div>
      <MyGitInfo />
      <div className={styles.hr}></div>
      <MyInfoInput myInfo={myInfo} setMyInfo={setMyInfo} setNewPic={setNewPic} />
      <div className={styles.hr}></div>
      <MyBlogInfoInput myBlogInfo={myBlogInfo} setMyBlogInfo={setMyBlogInfo} setSocialList={setSocialList} />
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
