import React, { useEffect } from "react";
import Text from "components/Text";
import styles from "./Setting.module.css";
import ButtonStyled from "components/Button";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "app/store";
import { authActions } from "slices/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { blogInfoConfig, setBlogSettingInfo } from "slices/settingSlice";
import api from "api/Api";

const MyGitInfo = () => {
  const { githubId, githubImage, accessToken } = useSelector((state: rootState) => state.auth);
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const getBlogInfo = async () => {
    await axios
      .get(api.setting.getBlog(accessToken, githubId))
      .then((res: any) => {
        // console.log(res.data.profileImg);
        let teststring: string = res.data.setting;
        teststring = teststring.replaceAll("${__dirname}", "dirname_Change");

        const test = "return (" + teststring + ")";
        const st: blogInfoConfig = new Function(test)();
        console.log("됨", st);
        dispatch(setBlogSettingInfo({ siteMetadata: st.siteMetadata, profileImg: res.data.profileImg }));
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const logout = () => {
    dispatch(authActions.logout());
    navigator("/");
  };

  useEffect(() => {
    getBlogInfo();
  }, []);

  return (
    <div>
      <div className={styles.textPadding} style={{ paddingTop: "0" }}>
        <Text value="Github 정보" type="groupTitle" bold />
      </div>
      <div className={styles.flexContainer}>
        <div className={styles.githubBox}>
          <img className={styles.githubProfileImg} alt="Remy Sharp" src={githubImage} />
          <div className={styles.githubProfileTexts}>
            <div className={styles.githubProfileText}>
              <Text value={githubId} type="groupTitle" bold />
            </div>
            <div className={styles.githubProfileText}>
              <Text value={`github.com/${githubId}`} type="caption" />
            </div>
          </div>
          <div className={styles.githubProfileLogout}>
            <ButtonStyled label="로그아웃" onClick={logout} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyGitInfo;
