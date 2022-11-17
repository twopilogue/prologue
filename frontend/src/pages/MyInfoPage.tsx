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
          /* 임시 데이터 */
          social: result.social,
        });
      })

      .catch((err: any) => {
        console.log(err);
      });
  };

  const getUserLayout = async () => {
    await Axios.get(api.setting.getLayout(accessToken, githubId))
      .then((res: any) => {
        const response = JSON.parse(res.data.layout);
        console.log("사용자 레이아웃 조회", response);
        const userLayout: ComponentConfig[] = [];
        response.layout.map((it: Layout) => {
          if (it.i === "블로그 로고") userLayout.push({ key: "블로그 로고", id: "logo" });
          else if (it.i === "프로필") userLayout.push({ key: "프로필", id: "profile" });
          else if (it.i === "카테고리") userLayout.push({ key: "카테고리", id: "category" });
          else if (it.i === "페이지") userLayout.push({ key: "페이지", id: "page" });
          else if (it.i === "타이틀") userLayout.push({ key: "타이틀", id: "title" });
          else if (it.i === "글 목록") userLayout.push({ key: "글 목록", id: "contents" });
        });
        dispatch(setUserComponentLayoutList(response.layout));
        dispatch(setUserComponentList(userLayout));
        dispatch(setUserCheckList(response.checkList));
      })
      .catch((err: any) => {
        console.log("실패@", err);
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
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getBlogInfo();
  }, []);

  useEffect(() => {
    getUserLayout();
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
