import React, { useEffect, useState } from "react";
import styles from "features/setting/Setting.module.css";
import MyGitInfo from "features/setting/myinfo/MyGitInfo";
import MyInfoInput from "features/setting/myinfo/MyInfoInput";
import MyBlogInfoInput from "features/setting/myinfo/MyBlogInfoInput";
import axios from "axios";
import api from "api/Api";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "app/store";
import { blogInfoConfig, setBlogSettingInfo } from "slices/settingSlice";
import ButtonStyled from "components/Button";

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
  const { githubId, accessToken } = useSelector((state: rootState) => state.auth);
  const [newPic, setNewPic] = useState<Blob>(null);
  const [socialList, setSocialList] = useState({});
  const [myInfo, setMyInfo] = useState<myInfoProps>({
    nickName: "",
    summary: "",
    profileImg: null,
  });
  const [myBlogInfo, setMyBlogInfo] = useState<myBlogInfoProps>({
    title: "",
    description: "",
    social: [],
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
          /* 임시 데이터 */
          social: { github: "github", gmail: "gmail", twitter: "twitter", instagram: "instagram" },
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
      /* 임시 데이터 */
      social: { github: "github", gmail: "gmail", twitter: "twitter", instagram: "instagram" },
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
      })
      .catch((err: any) => {
        console.log(err);
      });
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
            <ButtonStyled color="sky" label="취소" />
          </div>
          <div style={{ margin: "10px" }}>
            <ButtonStyled label="저장" onClick={sendBlogInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyInfoPage;
