import { useEffect } from "react";
import TabMenu from "../../features/setting/TabMenu";
import { useAuthStore } from "stores/authStore";
import { getBlogInfoApi, getCategoryApi } from "apis/api/setting";
import { getBlogInfoService } from "apis/services/setting";
import { useShallow } from "zustand/react/shallow";
import { useSettingActions } from "stores/settingStore";
import { EditListConfig, KeyConfig } from "interfaces/setting.interface";

const SettingPage = () => {
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

  useEffect(() => {
    getBlogInfo();
    if (blogType !== 1) {
      getCategory();
    }
  }, []);

  return (
    <div style={{ backgroundColor: "white", width: "100%", marginTop: "3vh" }}>
      <TabMenu />
    </div>
  );
};

export default SettingPage;
