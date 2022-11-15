import React, { useEffect } from "react";
import styles from "features/setting/Setting.module.css";
import Text from "components/Text";
import PageLayout from "features/setting/page/PageLayout";
import Axios from "api/JsonAxios";
import api from "api/Api";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "app/store";
import { setPageList } from "slices/settingSlice";

const PageSettingPage = () => {
  const { githubId, accessToken } = useSelector((state: rootState) => state.auth);
  const dispatch = useDispatch();

  const getPage = async () => {
    await Axios.get(api.setting.getPage(accessToken, githubId))
      .then((res: any) => {
        console.log(res);
        dispatch(setPageList(res.data.pages));
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getPage();
  }, []);

  return (
    <div>
      <div className={styles.textPadding} style={{ paddingTop: "0", paddingBottom: "10px" }}>
        <Text value="페이지 설정" type="groupTitle" bold />
      </div>
      <div style={{ paddingLeft: "20px" }}>
        <Text value="드래그 앤 드롭으로 페이지 순서를 변경할 수 있습니다." type="caption" />
      </div>
      <PageLayout />
    </div>
  );
};

export default PageSettingPage;
