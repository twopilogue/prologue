import Input from "components/Input";
import Text from "components/Text";
import React, { Dispatch, SetStateAction } from "react";
import styles from "../Setting.module.css";
import ModeIcon from "@mui/icons-material/Mode";
import { useAppSelector } from "app/hooks";
import { selectBlogSettingInfo } from "slices/settingSlice";
import { myInfoProps } from "pages/MyInfoPage";

interface Props {
  myInfo: myInfoProps;
  setMyInfo: Dispatch<SetStateAction<myInfoProps>>;
}

const MemberInfoInput = ({ myInfo, setMyInfo }: Props) => {
  return (
    <div style={{ width: "100%" }}>
      <div className={styles.textPadding}>
        <Text value="내 프로필 정보" type="groupTitle" bold />
      </div>
      <div className={styles.grid_container}>
        <div>
          <div className={styles.textMargin}>
            <div className={styles.inputTag}>
              <Text value="닉네임" type="text" />
              <Input
                value={myInfo.name}
                placeholder="닉네임을 입력하세요."
                onChange={(e: any) => {
                  setMyInfo({
                    ...myInfo,
                    name: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <div className={styles.textMargin}>
            <div className={styles.inputTag}>
              <Text value="내 소개" type="text" />
              <Input
                value={myInfo.summary}
                placeholder="나를 소개하는 글을 입력하세요."
                multiline
                rows={8}
                onChange={(e: any) => {
                  setMyInfo({
                    ...myInfo,
                    summary: e.target.value,
                  });
                }}
              />
            </div>
          </div>
        </div>
        {/* 오른쪽: 프로필 */}
        <div>
          <div className={styles.textMargin}>
            <Text value="프로필 사진" type="text" />
            <div className={styles.profile_img_container}>
              <img className={styles.profile_img} src={myInfo.profileImg} alt="프로필 사진" />
              <div className={styles.profile_editBtn}>
                <ModeIcon className={styles.profile_editBtn_icon} />
                <div className={styles.profile_editBtn_text}>
                  <Text value="Edit" type="caption" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberInfoInput;
