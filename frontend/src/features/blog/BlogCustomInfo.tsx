import { ChangeEvent, useRef, useState } from "react";
import { Avatar, Button, Paper, Stack } from "@mui/material";
import ButtonCoustom from "components/Button";
import ModeIcon from "@mui/icons-material/Mode";
import Input from "components/Input";
import Text from "components/Text";
import styles from "features/blog/Blog.module.css";
import BlogDashboardMoveModal from "./BlogDashboardMoveModal";
import api from "apis/BaseUrl";
import Axios from "apis/MultipartAxios";
import BlogLoding from "features/blog/BlogLoding";
import axios from "axios";
import moment from "moment";
import { useAuthActions, useAuthStore } from "stores/authStore";
import { useShallow } from "zustand/react/shallow";
import { useDashboardActions } from "stores/dashboardStore";
import { getMonthPosts, getNewPosts } from "apis/api/dashboard";

function BlogCustomInfo(props: { template: string }) {
  const [accessToken, githubId] = useAuthStore(useShallow((state) => [state.accessToken, state.githubId]));
  const { setTemplateAction } = useAuthActions();
  const { setMonthPostsAction, setNewPostsAction, setBlogInfoAction, setBuildTimeAction } = useDashboardActions();
  const [imgPreview, setImgPreview] = useState(null);
  const [lodingView, openLodingView] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [successModal, openSuccessModal] = useState(false);
  const [isInfo, setInfo] = useState({
    profile_name: "",
    profile_summary: "",
    profile_image: null,
    blog_name: "",
    blog_summary: "",
  });

  const onClickNext = async () => {
    openLodingView(true);

    const formData = new FormData();
    const modified = {
      accessToken: accessToken,
      githubId: githubId,
      title: isInfo.blog_name,
      summary: isInfo.profile_summary,
      nickName: isInfo.profile_name,
      description: isInfo.blog_summary,
      social: {
        twitter: "",
        instagram: "",
        gmail: "",
        github: "",
      },
    };

    formData.append("modifyBlogSettingRequest", new Blob([JSON.stringify(modified)], { type: "application/json" }));
    formData.append("imageFile", isInfo.profile_image);

    await Axios.put(api.setting.modifyBlog(), formData);
    triggerStart();
  };

  async function triggerStart() {
    await Axios.put(api.blog.triggerStart(accessToken, githubId)).then(() => {
      getDashboardInfo();
    });
  }

  function getDashboardInfo() {
    getMonthList();
    getNewPost();
    getBlogInfo();
    getNewBuildTime();
  }

  async function getMonthList() {
    const dateList = await getMonthPosts(accessToken, githubId);
    setMonthPostsAction(dateList);
  }

  const getNewPost = async () => {
    const newPosts = await getNewPosts(accessToken, githubId);
    setNewPostsAction(newPosts);
  };

  async function getBlogInfo() {
    await axios
      .all([
        Axios.get(api.dashboard.getTotalPost(accessToken, githubId)),
        Axios.get(api.dashboard.getRepoSize(accessToken, githubId, props.template)),
      ])
      .then(
        axios.spread((res1, res2) => {
          setBlogInfoAction({
            totalPost: res1.data.total,
            repoSize: res2.data.size,
          });
          setTemplateAction(props.template);
          openLodingView(false);
          openSuccessModal(true);
        }),
      );
  }

  async function getNewBuildTime() {
    await Axios.get(api.dashboard.getNewBuildTime(accessToken, githubId)).then((res) => {
      const value = res.data.latestBuildTime;
      setBuildTimeAction(moment(value, "YYYYMMDDHHmmss").format("YYYY MM/DD HH:mm"));
    });
  }

  const profileOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInfo({ ...isInfo, [e.target.name]: e.target.value });
  };

  const onUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    reader.onloadend = () => {
      setInfo({
        ...isInfo,
        profile_image: e.target.files[0],
      });
      setImgPreview(reader.result);
    };
  };
  const handleImageUpload = () => {
    if (!inputRef.current) return;
    inputRef.current.click();
  };

  return (
    <>
      <Paper
        className={`${styles.Box},${styles.customInfo_container}`}
        elevation={3}
        sx={{ mt: 3, px: 6, py: 4, borderRadius: 5 }}
      >
        <Stack spacing={4}>
          <Stack spacing={2}>
            <Text value="내 프로필 정보" type="groupTitle" bold />
            <Stack direction="row" justifyContent="space-between" spacing={3}>
              <div className={styles.flexRow}>
                <div className={styles.infoTitle}>
                  <Text value="닉네임" />
                </div>
                <Stack className={styles.infoInput} spacing={2}>
                  <Input
                    value={isInfo.profile_name}
                    onChange={profileOnChange}
                    name="profile_name"
                    placeholder="닉네임을 입력하세요."
                  />
                  <Input
                    value={isInfo.profile_summary}
                    onChange={profileOnChange}
                    name="profile_summary"
                    placeholder="나를 소개하는 글을 입력하세요"
                    multiline
                    rows={5}
                  />
                </Stack>
              </div>
              <Stack width="180px">
                <Text value="프로필 사진" />
                <div className={styles.profile_img_container}>
                  <Avatar sx={{ width: 150, height: 150, border: "0.5px solid #f5f5f5" }} src={imgPreview} />
                  <input type="file" hidden ref={inputRef} onChange={onUploadImage} />
                  <Stack direction="row" spacing={0.3} className={styles.profile_editBtn} onClick={handleImageUpload}>
                    <ModeIcon fontSize="small" />
                    <Text value="Edit" type="caption" />
                  </Stack>
                </div>
              </Stack>
            </Stack>
          </Stack>
          <Stack spacing={2}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
              <div className={styles.flexRow}>
                <Stack className={styles.infoTitle} spacing={4}>
                  <Text value="블로그명" />
                  <Text value="블로그 소개" />
                </Stack>
                <Stack className={styles.infoInput} spacing={2}>
                  <Input
                    value={isInfo.blog_name}
                    onChange={profileOnChange}
                    name="blog_name"
                    placeholder="블로그 명을 입력하세요"
                  />
                  <Input
                    value={isInfo.blog_summary}
                    onChange={profileOnChange}
                    name="blog_summary"
                    placeholder="블로그 소개글을 입력하세요"
                    multiline
                    rows={5}
                  />
                </Stack>
              </div>
              <Stack spacing={1}>
                {isInfo.profile_name.length > 0 &&
                isInfo.profile_summary.length > 0 &&
                isInfo.blog_name.length > 0 &&
                isInfo.blog_summary.length > 0 ? (
                  <ButtonCoustom label="Next" onClick={onClickNext} />
                ) : (
                  <>
                    <Text value="모두 입력하세요!" type="caption" color="red" />
                    <Button
                      disabled
                      sx={{
                        borderRadius: "10px",
                        backgroundColor: "SlateGrey",
                        "&.MuiButton-text": {
                          color: "white",
                        },
                      }}
                    >
                      Next
                    </Button>
                  </>
                )}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Paper>
      {lodingView && <BlogLoding />}
      {successModal && <BlogDashboardMoveModal />}
    </>
  );
}

export default BlogCustomInfo;
