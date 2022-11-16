import React, { useEffect, useState } from "react";
import styles from "features/setting/Setting.module.css";
import MyGitInfo from "features/setting/myinfo/MyGitInfo";
import MyInfoInput from "features/setting/myinfo/MyInfoInput";
import MyBlogInfoInput from "features/setting/myinfo/MyBlogInfoInput";
import axios from "axios";
import api from "api/Api";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "app/store";
import { blogInfoConfig, colorsConfig, setBlogSettingInfo, setColors } from "slices/settingSlice";
import ButtonStyled from "components/Button";
import { toJSON } from "cssjson";
import Axios from "api/JsonAxios";

export interface myInfoProps {
  nickName: string;
  summary: string;
  profileImg: string | FormData;
}

export interface myBlogInfoProps {
  title: string;
  description: string;
  social: object;
}

const MyInfoPage = () => {
  const dispatch = useDispatch();
  const { githubId, accessToken } = useSelector((state: rootState) => state.auth);
  const [newPic, setNewPic] = useState<Blob>(null);
  const [socialList, setSocialList] = useState({});
  const [myInfo, setMyInfo] = useState<myInfoProps>({
    nickName: "",
    summary: "",
    profileImg: null,
  });
  const [myBlogInfo, setMyBlogInfo] = useState<myBlogInfoProps>({
    title: "",
    description: "",
    social: {},
  });

  const getBlogInfo = async () => {
    await axios
      .get(api.setting.getBlog(accessToken, githubId))
      .then((res: any) => {
        const result: blogInfoConfig = res.data;

        dispatch(setBlogSettingInfo(result));

        setMyInfo({
          nickName: result.nickName,
          summary: result.summary,
          profileImg: result.profileImg,
        });
        setMyBlogInfo({
          title: result.title,
          description: result.description,
          /* 임시 데이터 */
          social: result.social,
        });
      })

      .catch((err: any) => {
        console.log(err);
      });
  };

  const getDetailSetting = async () => {
    await Axios.get(api.setting.getDetail(accessToken, githubId))
      .then((res) => {
        if (res.data.css === "\n") {
          console.log("설정 없음");
        } else {
          const removedResult = res.data.css.replaceAll(".", "").replaceAll(" ", "");
          const result = toJSON(removedResult);
          console.log(result);

          console.log("카테고리 변환 결과: ", result.children.category.attributes);
          console.log("프로필 반환 결과: ", result.children.profile.attributes);

          dispatch(
            setColors({
              title: {
                background: result.children.title.attributes["background-color"],
                text: result.children.titleh3.attributes["color"],
                // titleHeight:
                type: res.data.titleColor, // 색이면 true, 이미지면 false
                titleText: res.data.titleText,
              },
              category: {
                background: result.children.category.attributes["background-color"],
                text: result.children.categorya.attributes["color"],
              },
              page: {
                background: result.children["page-container"].attributes["background-color"],
                text: result.children.pagea.attributes["color"],
                sort: result.children["page-container"].attributes["justify-content"],
              },
              profile: {
                background: result.children.profile.attributes["background-color"],
                text: result.children.profile.attributes["color"],
              },
              contents: {
                background: result.children["post-list-container"].attributes["background-color"],
                text: result.children["post-list-container"].attributes["color"],
              },
              logo: {
                background: "#d3d3eb",
                text: "#ffffff",
                logoText: res.data.logoText,
              },
            }),
          );
        }
        console.log("DURL?");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleOnEdit = () => {
    const tmpPayload = {
      accessToken: accessToken,
      githubId: githubId,
      title: myBlogInfo.title,
      summary: myInfo.summary,
      nickName: myInfo.nickName,
      description: myBlogInfo.description,
      /* 임시 데이터 */
      social: myBlogInfo.social,
    };
    return tmpPayload;
  };

  const sendBlogInfo = async () => {
    const formData = new FormData();
    const result = handleOnEdit();

    formData.append("imageFile", newPic);
    formData.append("modifyBlogSettingRequest", new Blob([JSON.stringify(result)], { type: "application/json" }));

    await axios
      .put(api.setting.modifyBlog(), formData, {
        headers: { "Content-Type": `multipart/form-data` },
      })
      .then((res: any) => {
        console.log("됨?", res);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getBlogInfo();
  }, []);

  useEffect(() => {
    getDetailSetting();
  }, []);

  return (
    <div>
      <MyGitInfo />
      <div className={styles.hr}></div>
      <MyInfoInput myInfo={myInfo} setMyInfo={setMyInfo} setNewPic={setNewPic} />
      <div className={styles.hr}></div>
      <MyBlogInfoInput myBlogInfo={myBlogInfo} setMyBlogInfo={setMyBlogInfo} setSocialList={setSocialList} />
      <div>
        <div className={styles.confirmButton}>
          <div style={{ margin: "10px" }}>
            <ButtonStyled color="sky" label="취소" />
          </div>
          <div style={{ margin: "10px" }}>
            <ButtonStyled label="저장" onClick={sendBlogInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyInfoPage;
