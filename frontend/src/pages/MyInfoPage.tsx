import React, { useEffect } from "react";
import styles from "features/setting/Setting.module.css";
import MyGitInfo from "features/setting/myinfo/MyGitInfo";
import MyInfoInput from "features/setting/myinfo/MyInfoInput";
import MyBlogInfoInput from "features/setting/myinfo/MyBlogInfoInput";
import axios from "axios";
import api from "api/Api";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "app/store";
import { blogInfoConfig, setBlogSettingInfo } from "slices/settingSlice";

const MyInfoPage = () => {
  const { githubId, accessToken } = useSelector((state: rootState) => state.auth);
  const dispatch = useDispatch();

  const getBlogInfo = async () => {
    await axios
      .get(api.setting.getBlog(accessToken, githubId))
      .then((res: any) => {
        // console.log(res.data.profileImg);
        const originString: string = res.data.setting;
        const teststring = originString.replaceAll("${__dirname}", "dirname_Change");

        const test = "return (" + teststring + ")";
        const st: blogInfoConfig = new Function(test)();
        console.log("됨", st);
        dispatch(setBlogSettingInfo({ siteMetadata: st.siteMetadata, profileImg: res.data.profileImg }));
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
      <MyInfoInput />
      <div className={styles.hr}></div>
      <MyBlogInfoInput />
    </div>
  );
};

export default MyInfoPage;
