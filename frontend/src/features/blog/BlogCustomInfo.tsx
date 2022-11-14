import React, { useRef, useState } from "react";
import { Avatar, Paper, Stack } from "@mui/material";
import ButtonCoustom from "components/Button";
import ModeIcon from "@mui/icons-material/Mode";
import Input from "components/Input";
import Text from "components/Text";
import styles from "features/blog/Blog.module.css";
import BlogDashboardMoveModal from "./BlogDashboardMoveModal";
import api from "api/Api";
import { useSelector } from "react-redux";
import { rootState } from "app/store";
import Axios from "api/MultipartAxios";

function BlogCustomInfo() {
  const { githubId, accessToken } = useSelector((state: rootState) => state.auth);
  const [imgPreview, setImgPreview] = useState(null);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isInfo, setInfo] = useState({
    profile_name: "",
    profile_summary: "",
    profile_image: null,
    blog_name: "",
    blog_summary: "",
  });
  const [successModal, openSuccessModal] = useState(false);

  const onClickNext = async () => {
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
    console.log("Json", modified);

    formData.append("modifyBlogSettingRequest", new Blob([JSON.stringify(modified)], { type: "application/json" }));
    formData.append("imageFile", isInfo.profile_image);
    console.log("폼 데이터", formData);
    //axois 보내기
    await Axios.put(api.setting.modifyBlog(), formData)
      .then((res) => {
        console.log("블로그 정보 데이터 보내기", res.data);
        openSuccessModal(true);
      })
      .catch((err) => {
        console.error("블로그 정보 데이터 보내기", err);
      });
  };

  const profileOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfo({ ...isInfo, [e.target.name]: e.target.value });
  };

  const onUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    <Stack direction="column" alignItems="center" spacing={3}>
      <Paper className={styles.customInfo_container} elevation={3} sx={{ mt: 3, px: 6, py: 4 }}>
        <Stack spacing={4}>
          <Stack spacing={2}>
            <Text value="내 프로필 정보" type="groupTitle" bold />
            <Stack direction="row" justifyContent="space-between">
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
                  <Avatar sx={{ width: 150, height: 150 }} src={imgPreview} />
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
            <Stack direction="row" justifyContent="space-between">
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
              <div></div>
            </Stack>
          </Stack>
        </Stack>
      </Paper>
      <ButtonCoustom label="Next" onClick={onClickNext} />
      {successModal && <BlogDashboardMoveModal />}
    </Stack>
  );
}

export default BlogCustomInfo;
