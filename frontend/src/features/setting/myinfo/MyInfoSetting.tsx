import React, { useEffect, useState } from "react";
import MyGitInfo from "./MyGitInfo";
import MyInfoInput from "./MyInfoInput";
import MyBlogInfoInput from "./MyBlogInfoInput";
import styles from "../Setting.module.css";
import axios from "axios";
import { blogInfoConfig, setBlogSettingInfo } from "slices/settingSlice";
import api from "api/Api";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "app/store";
import ConfirmButton from "../ConfirmButton";

const MyInfoSetting = () => {
  const { accessToken, githubId } = useSelector((state: rootState) => state.auth);
  const dispatch = useDispatch();

  const getBlogInfo = async () => {
    await axios
      .get(api.setting.getBlog(accessToken, githubId))
      .then((res: any) => {
        const origin: string = res.data.setting;
        const teststring = origin.replaceAll("${__dirname}", "dirname_Change");

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
      {/* <ConfirmButton /> */}
    </div>
  );
};

export default MyInfoSetting;
