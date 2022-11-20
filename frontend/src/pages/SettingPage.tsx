import React, { useEffect } from "react";
import TabMenu from "../features/setting/TabMenu";
import Axios from "api/JsonAxios";
import {
  blogInfoConfig,
  editList,
  KeyConfig,
  PageConfig,
  setBlogSettingInfo,
  setCategoryCnt,
  setCategoryList,
  setIsEditCategory,
  setIsEditPage,
  setMyBlogInfo,
  setMyInfo,
  setPageCnt,
  setPageList,
} from "slices/settingSlice";
import api from "api/Api";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "app/store";
import { useNavigate } from "react-router-dom";

const SettingPage = () => {
  const dispatch = useDispatch();
  const { githubId, accessToken, blogType } = useSelector((state: rootState) => state.auth);

  const getBlogInfo = async () => {
    await Axios.get(api.setting.getBlog(accessToken, githubId))
      .then((res: any) => {
        const result: blogInfoConfig = res.data;

        dispatch(setBlogSettingInfo(result));
        dispatch(
          setMyInfo({
            nickName: result.nickName,
            summary: result.summary,
            profileImg: result.profileImg,
          }),
        );

        dispatch(
          setMyBlogInfo({
            title: result.title,
            description: result.description,
            social: result.social,
          }),
        );
      })

      .catch((err: any) => {
        console.log(err);
      });
  };

  const getCategory = async () => {
    await Axios.get(api.setting.getCategory(accessToken, githubId))
      .then((res: any) => {
        const response = res.data.category;
        const tmpList: KeyConfig[] = [];
        for (let i = 0; i < response.length; i++) {
          tmpList.push({ key: response[i], id: i });
        }
        dispatch(setCategoryList(tmpList));
        dispatch(setCategoryCnt(response.length));

        if (tmpList) {
          dispatch(
            setIsEditCategory(
              tmpList.map((it) => {
                return { key: it.key, id: it.id, editable: false };
              }),
            ),
          );
        }
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  const getPage = async () => {
    await Axios.get(api.setting.getPage(accessToken, githubId))
      .then((res: any) => {
        const result = res.data.pages;
        const tmpPageList: PageConfig[] = [];
        const tmpIsEdit: editList[] = [];
        let i = 0;
        result.map((it: any) => {
          tmpPageList.push({ label: it.label, posts: it.posts, id: i, type: "unchanging" });
          tmpIsEdit.push({ key: it.label, id: i, editable: false });
          i++;
        });
        dispatch(setPageList(tmpPageList));
        dispatch(setIsEditPage(tmpIsEdit));
        dispatch(setPageCnt(result.length));
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getBlogInfo();
    if (blogType !== 1) {
      getCategory();
      getPage();
    }
  }, []);

  return (
    <div style={{ backgroundColor: "white", width: "100%", marginTop: "3vh" }}>
      <TabMenu />
    </div>
  );
};

export default SettingPage;
