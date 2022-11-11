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
  profileImg: string;
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
  const [myInfo, setMyInfo] = useState<myInfoProps>({
    name: "",
    summary: "",
    profileImg: "",
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
        // console.log(res.data.profileImg);
        const originString: string = res.data.setting;
        const teststring = originString.replaceAll("${__dirname}", "dirname_Change");

        const test = "return (" + teststring + ")";
        const st: blogInfoConfig = new Function(test)();
        setOldString(st);
        console.log(st);
        dispatch(setBlogSettingInfo({ siteMetadata: st.siteMetadata, profileImg: res.data.profileImg }));
        setMyInfo({
          name: st.siteMetadata.author.name,
          summary: st.siteMetadata.author.summary,
          profileImg: st.profileImg,
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
  };

  useEffect(() => {
    getBlogInfo();
  }, []);

  return (
    <div>
      <MyGitInfo />
      <div className={styles.hr}></div>
      <MyInfoInput myInfo={myInfo} setMyInfo={setMyInfo} />
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
