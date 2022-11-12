import React, { useEffect, useState } from "react";
import styles from "features/setting/Setting.module.css";
import MyGitInfo from "features/setting/myinfo/MyGitInfo";
import MyInfoInput from "features/setting/myinfo/MyInfoInput";
import MyBlogInfoInput from "features/setting/myinfo/MyBlogInfoInput";
import axios from "axios";
import api from "api/Api";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "app/store";
import { blogInfoConfig, selectColors, selectComponentList, setBlogSettingInfo, setColors } from "slices/settingSlice";
import ButtonStyled from "components/Button";
import { useAppSelector } from "app/hooks";

export interface myInfoProps {
  name: string;
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
  const [oldString, setOldString] = useState<blogInfoConfig>(null);
  const [newPic, setNewPic] = useState<Blob>(null);
  const [socialList, setSocialList] = useState({});
  const [myInfo, setMyInfo] = useState<myInfoProps>({
    name: "",
    summary: "",
    profileImg: null,
  });
  const [myBlogInfo, setMyBlogInfo] = useState<myBlogInfoProps>({
    title: "",
    description: "",
    social: [],
  });
  const [payload, setPayload] = useState({
    nickName: [],
    summary: [],
    profileImg: [],
    title: [],
    description: [],
  });

  const getBlogInfo = async () => {
    await axios
      .get(api.setting.getBlog(accessToken, githubId))
      .then((res: any) => {
        const originString: string = res.data.setting;
        const teststring = originString.replaceAll("${__dirname}", "dirname_Change");

        const test = "return (" + teststring + ")";
        const st: blogInfoConfig = new Function(test)();
        setOldString(st);
        dispatch(setBlogSettingInfo({ siteMetadata: st.siteMetadata, profileImg: res.data.profileImg }));

        setMyInfo({
          name: st.siteMetadata.author.name,
          summary: st.siteMetadata.author.summary,
          profileImg: res.data.profileImg,
        });
        setMyBlogInfo({
          title: st.siteMetadata.title,
          description: st.siteMetadata.description,
          social: st.siteMetadata.social,
        });
        console.log(st.siteMetadata.social);
      })

      .catch((err: any) => {
        console.log(err);
      });
  };

  const handleOnEdit = () => {
    console.log("저장?");
    console.log("오리지널", oldString);
    console.log("수정된 내 정보", myInfo);
    const tmpPayload = {
      nickName: [oldString.siteMetadata.author.name, myInfo.name],
      summary: [oldString.siteMetadata.author.summary, myInfo.summary],
      profileImg: ["../src/images/profile-pic.png", ""],
      title: [oldString.siteMetadata.title, myBlogInfo.title],
      description: [oldString.siteMetadata.description, myBlogInfo.description],
    };
    setPayload(tmpPayload);
    console.log("결과: ", tmpPayload);
    return tmpPayload;
  };

  const sendBlogInfo = async () => {
    const formData = new FormData();
    const result = {
      accessToken: accessToken,
      githubId: githubId,
      modified: handleOnEdit(),
      social: socialList,
    };

    console.log("리퀘스트: ", result);
    console.log(JSON.stringify(result));

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
