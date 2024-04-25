import { useEffect } from "react";
import TabMenu from "../features/setting/TabMenu";
import {
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

import { useDispatch } from "react-redux";
import { useAuthStore } from "stores/authStore";
import { getBlogInfoApi, getCategoryApi, getPageApi } from "apis/api/setting";
import { getBlogInfoService } from "apis/services/setting";

const SettingPage = () => {
  const dispatch = useDispatch();
  const accessToken = useAuthStore((state) => state.accessToken);
  const githubId = useAuthStore((state) => state.githubId);
  const blogType = useAuthStore((state) => state.blogType);

  const getBlogInfo = async () => {
    const res = await getBlogInfoApi(accessToken, githubId);
    const { userInfo, blogInfo } = await getBlogInfoService(res);
    dispatch(setBlogSettingInfo(res));
    dispatch(setMyInfo(userInfo));
    dispatch(setMyBlogInfo(blogInfo));
  };

  const getCategory = async () => {
    const category = await getCategoryApi(accessToken, githubId);
    const tmpCategoryList: KeyConfig[] = [];
    category.map((c, i) => {
      tmpCategoryList.push({ key: c, id: i });
    });
    dispatch(setCategoryList(tmpCategoryList));
    dispatch(setCategoryCnt(category.length));

    if (tmpCategoryList.length > 0) {
      dispatch(
        setIsEditCategory(
          tmpCategoryList.map((it) => {
            return { key: it.key, id: it.id, editable: false };
          }),
        ),
      );
    }
  };

  const getPage = async () => {
    const pages = await getPageApi(accessToken, githubId);
    const tmpPageList: PageConfig[] = [];
    const tmpIsEdit: editList[] = [];

    pages.map((it, i) => {
      tmpPageList.push({ label: it.label, posts: it.posts, id: i, type: "unchanging" });
      tmpIsEdit.push({ key: it.label, id: i, editable: false });
    });

    dispatch(setPageList(tmpPageList));
    dispatch(setIsEditPage(tmpIsEdit));
    dispatch(setPageCnt(pages.length));
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
