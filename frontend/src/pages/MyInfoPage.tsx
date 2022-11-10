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
import ConfirmButton from "features/setting/ConfirmButton";
import ButtonStyled from "components/Button";

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
  const [oldPic, setOldPic] = useState("");
  const [newPic, setNewPic] = useState<Blob>(null);
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
    name: {
      old: "",
      new: "",
    },
    summary: {
      old: "",
      new: "",
    },
    profileImg: {
      old: "",
      new: null,
    },
    title: {
      old: "",
      new: "",
    },
    description: {
      old: "",
      new: "",
    },
    social: {},
  });

  const getBlogInfo = async () => {
    await axios
      .get(api.setting.getBlog(accessToken, githubId))
      .then((res: any) => {
        // console.log(res.data.profileImg);
        const originString: string = res.data.setting;
        const teststring = originString.replaceAll("${__dirname}", "dirname_Change");

        const test = "return (" + teststring + ")";
        const st: blogInfoConfig = new Function(test)();
        setOldString(st);
        setOldPic(res.data.profileImg);
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
      name: {
        old: oldString.siteMetadata.author.name,
        new: myInfo.name,
      },
      summary: {
        old: oldString.siteMetadata.author.summary,
        new: myInfo.summary,
      },
      profileImg: {
        old: oldPic,
        new: myInfo.profileImg,
      },
      title: {
        old: oldString.siteMetadata.title,
        new: myBlogInfo.title,
      },
      description: {
        old: oldString.siteMetadata.description,
        new: myBlogInfo.description,
      },
      social: myBlogInfo.social,
    };
    setPayload(tmpPayload);
    console.log("결과: ", tmpPayload);
    sendBlogInfo();
  };

  const sendBlogInfo = async () => {
    const formData = new FormData();
    const result = {
      accessToken: accessToken,
      githubId: githubId,
      modified: payload,
    };
    // formData.append("imgFile", new Blob([newPic], { type: "multipart/form-data" }));

    formData.append("imgFile", newPic);
    formData.append("modifyBlogSettingRequest", new Blob([JSON.stringify(result)], { type: "application/json" }));

    await axios
      .put(api.setting.modifyBlog(), formData, {
        headers: { "Content-Type": `multipart/form-data` },
      })
      .then((res: any) => {
        console.log(res);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getBlogInfo();
    console.log(payload);
  }, [payload]);

  return (
    <div>
      <MyGitInfo />
      <div className={styles.hr}></div>
      <MyInfoInput myInfo={myInfo} setMyInfo={setMyInfo} setNewPic={setNewPic} />
      <div className={styles.hr}></div>
      <MyBlogInfoInput myBlogInfo={myBlogInfo} setMyBlogInfo={setMyBlogInfo} />
      <div>
        <div className={styles.confirmButton}>
          <div style={{ margin: "10px" }}>
            <ButtonStyled color="sky" label="취소" />
          </div>
          <div style={{ margin: "10px" }}>
            <ButtonStyled label="저장" onClick={handleOnEdit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyInfoPage;
