import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "../Setting.module.css";
import Text from "components/Text";
import Input from "components/Input";
import SelectInput from "features/setting/SelectInput";
import { blogInfoConfig } from "slices/settingSlice";
import { myBlogInfoProps } from "pages/MyInfoPage";

interface Props {
  myBlogInfo: myBlogInfoProps;
  setMyBlogInfo: Dispatch<SetStateAction<myBlogInfoProps>>;
}

export interface linkConfig {
  site: string;
  url: string;
}

const MyBlogInfoInput = ({ myBlogInfo, setMyBlogInfo }: Props) => {
  const [link, setLink] = useState({
    site: "",
    url: "",
  });

  const addSocial = () => {
    if (!link.site || !link.url) {
      return;
    }
    setMyBlogInfo({
      ...myBlogInfo,
      social: {
        ...myBlogInfo.social,
        [link.site]: link.url,
      },
    });
  };

  return (
    <div>
      <div className={styles.textPadding}>
        <Text value="내 블로그 정보" type="groupTitle" bold />
      </div>
      <div>
        <div className={styles.textMargin}>
          <div className={styles.inputTag}>
            <Text value="블로그명" type="text" />
            <div style={{ width: "45vw" }}>
              <Input
                value={myBlogInfo.title}
                placeholder="블로그명을 입력하세요."
                onChange={(e: any) => {
                  setMyBlogInfo({
                    ...myBlogInfo,
                    title: e.target.value,
                  });
                }}
              />
            </div>
          </div>
        </div>
        <div className={styles.textMargin}>
          <div className={styles.inputTag}>
            <Text value="블로그 소개" type="text" />
            <div style={{ width: "45vw" }}>
              <Input
                value={myBlogInfo.description}
                placeholder="블로그 소개글을 입력하세요."
                multiline
                rows={4}
                onChange={(e: any) => {
                  setMyBlogInfo({
                    ...myBlogInfo,
                    description: e.target.value,
                  });
                }}
              />
            </div>
          </div>
        </div>

        <div className={styles.textMargin}>
          <div className={styles.inputTagThree}>
            <Text value="링크 연결" type="text" />
            <div style={{ marginRight: "10px" }}>
              <SelectInput link={link} setLink={setLink} />
            </div>
            <div>
              <Input
                placeholder="링크를 입력하세요."
                onChange={(e: any) => {
                  setLink({
                    ...link,
                    url: e.target.value,
                  });
                }}
              />
            </div>
            <div className={styles.addButton} onClick={addSocial}></div>
          </div>
        </div>

        <div className={styles.textMargin}>
          <div className={styles.inputTagThree}>
            <div></div>
            <div style={{ marginRight: "10px" }}>
              {myBlogInfo.social ? (
                <>
                  {Object.entries(myBlogInfo.social).map(([key, value], index: number) => (
                    <div key={index}>
                      <div>{key}</div>
                    </div>
                  ))}
                </>
              ) : (
                <></>
              )}
            </div>
            <div>
              {myBlogInfo.social ? (
                <>
                  {Object.entries(myBlogInfo.social).map(([key, value], index: number) => (
                    <div key={index}>
                      <div>{value}</div>
                    </div>
                  ))}
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBlogInfoInput;
