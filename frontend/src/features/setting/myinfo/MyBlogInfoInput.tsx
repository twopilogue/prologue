import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "../Setting.module.css";
import Text from "components/Text";
import Input from "components/Input";
import SelectInput from "features/setting/SelectInput";
import { selectMyBlogInfo, setMyBlogInfo } from "slices/settingSlice";
import ButtonStyled from "components/Button";
import { useDispatch } from "react-redux";
import { useAppSelector } from "app/hooks";

// interface Props {
//   // myBlogInfo: myBlogInfoProps;
//   // setMyBlogInfo: Dispatch<SetStateAction<myBlogInfoProps>>;
//   // setSocialList: Dispatch<SetStateAction<object>>;
// }

export interface linkConfig {
  site: string;
  url: string;
}

const MyBlogInfoInput = () => {
  const dispatch = useDispatch();
  const myBlogInfo = useAppSelector(selectMyBlogInfo);
  const [emailCheck, setEmailCheck] = useState<boolean>(false);
  const [emailMsg, setEmailMsg] = useState<string>("이메일을 입력하세요. Ex) ssafy@ssafy.com");
  const [link, setLink] = useState<linkConfig>({
    site: "",
    url: "",
  });

  const addSocial = () => {
    if (!link.site || !link.url || (link.site === "email" && !emailCheck)) {
      return;
    }
    dispatch(setMyBlogInfo({ ...myBlogInfo, social: { ...myBlogInfo.social, [link.site]: link.url } }));
    setLink({ ...link, url: "" });
  };

  const checkReg = (e: any, link: linkConfig) => {
    const reg = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (link.site === "email") {
      if (!reg.test(e.target.value) || !link.url) {
        setEmailCheck(false);
        setEmailMsg("잘못된 이메일 형식입니다.");
      } else {
        setEmailCheck(true);
        setEmailMsg("올바른 이메일 형식입니다.");
      }
    }
    setLink({
      ...link,
      url: e.target.value,
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
                  dispatch(
                    setMyBlogInfo({
                      ...myBlogInfo,
                      title: e.target.value,
                    }),
                  );
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
                  dispatch(
                    setMyBlogInfo({
                      ...myBlogInfo,
                      description: e.target.value,
                    }),
                  );
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
                helperText={!link.site ? `` : link.site === "email" ? emailMsg : `아이디를 입력하세요. Ex) ssafy7th`}
                textBool
                placeholder="링크를 입력하세요."
                value={link.url}
                onChange={(e: any) => {
                  checkReg(e, link);
                }}
              />
            </div>
            <div className={styles.addLinkBtn}>
              <ButtonStyled
                label="추가"
                color={!emailCheck && link.site === "email" ? `sky` : `blue`}
                onClick={addSocial}
              />
            </div>
          </div>
        </div>

        <div className={styles.textMargin}>
          <div className={styles.inputTag}>
            <div></div>
            <div style={{ marginRight: "10px" }}>
              {myBlogInfo.social ? (
                <>
                  {Object.entries(myBlogInfo.social).map(([key, value], index: number) =>
                    value ? (
                      <div className={styles.linkBox} key={index}>
                        <div className={styles.linkBoxSite}>
                          <img
                            className={styles.socialIcon}
                            src={require(`assets/setting/icons/${key}.png`)}
                            alt="이미지"
                          />
                          <div>{key}</div>
                        </div>
                        <div className={styles.linkBoxLink}>{value}</div>
                      </div>
                    ) : (
                      <div key={index}></div>
                    ),
                  )}
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
