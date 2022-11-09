import React from "react";
import Text from "components/Text";
import styles from "./Setting.module.css";
import ButtonStyled from "components/Button";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "app/store";
import { authActions } from "slices/authSlice";
import { useNavigate } from "react-router-dom";

const MyGitInfo = () => {
  const { githubId, githubImage } = useSelector((state: rootState) => state.auth);
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const logout = () => {
    dispatch(authActions.logout());
    navigator("/");
  };

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
