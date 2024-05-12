import { useEffect } from "react";
import TabMenu from "../../features/setting/TabMenu";
import { PageConfig, setIsEditPage, setPageCnt, setPageList } from "slices/settingSlice";
import { useDispatch } from "react-redux";
import { useAuthStore } from "stores/authStore";
import { getBlogInfoApi, getCategoryApi, getPageApi } from "apis/api/setting";
import { getBlogInfoService } from "apis/services/setting";
import { useShallow } from "zustand/react/shallow";
import { useSettingActions } from "stores/settingStore";
import { EditListConfig, KeyConfig } from "interfaces/setting.interface";

const SettingPage = () => {
  const dispatch = useDispatch();
  const [accessToken, githubId, blogType] = useAuthStore(
    useShallow((state) => [state.accessToken, state.githubId, state.blogType]),
  );
  const { setMyInfoAction, setMyBlogInfoAction, setCategoryListAction, setCategoryCntAction, setIsEditCategoryAction } =
    useSettingActions();

  const getBlogInfo = async () => {
    const res = await getBlogInfoApi(accessToken, githubId);
    const { userInfo, blogInfo } = await getBlogInfoService(res);
    setMyInfoAction(userInfo);
    setMyBlogInfoAction(blogInfo);
  };

  const getCategory = async () => {
    const category = await getCategoryApi(accessToken, githubId);
    const tmpCategoryList: KeyConfig[] = [];
    const tmpisEditCategoryList: EditListConfig[] = [];
    category.map((c, i) => {
      const item = { key: c, id: i };
      tmpCategoryList.push(item);
      tmpisEditCategoryList.push({ ...item, editable: false });
    });
    setCategoryListAction(tmpCategoryList);
    setCategoryCntAction(category.length);
    setIsEditCategoryAction(tmpisEditCategoryList);
  };

  // 추후 수정
  const getPage = async () => {
    const pages = await getPageApi(accessToken, githubId);
    const tmpPageList: PageConfig[] = [];
    const tmpIsEdit: EditListConfig[] = [];

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
