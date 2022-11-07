import React from "react";
import styles from "../Setting.module.css";
import SwitchButton from "components/SwitchButton";
import Text from "components/Text";

const ComponentSelector = (props: any) => {
  return (
    <div className={styles.checkListContainer}>
      <div className={styles.checkListTitle}>
        <Text value="메뉴 사용 설정" type="text" bold />
      </div>
      <div className={styles.checkListContents}>
        <div className={styles.checkListItem}>
          <SwitchButton
            label="블로그 로고"
            name="logo"
            checked={props.checkList.logo}
            onChange={() => {
              props.setCheckList({
                ...props.checkList,
                logo: !props.checkList.logo,
              });
            }}
          />
        </div>
        <div className={styles.checkListItem}>
          <SwitchButton
            label="프로필"
            name="profile"
            checked={props.checkList.profile}
            onChange={() => {
              props.setCheckList({
                ...props.checkList,
                profile: !props.checkList.profile,
              });
            }}
          />
        </div>
        <div className={styles.checkListItem}>
          <SwitchButton
            label="카테고리"
            name="category"
            checked={props.checkList.category}
            onChange={() => {
              props.setCheckList({
                ...props.checkList,
                category: !props.checkList.category,
              });
            }}
          />
        </div>
        <div className={styles.checkListItem}>
          <SwitchButton
            label="페이지"
            name="page"
            checked={props.checkList.page}
            onChange={() => {
              props.setCheckList({
                ...props.checkList,
                page: !props.checkList.page,
              });
            }}
          />
        </div>
      </div>
      <div className={styles.checkListTitle}>
        <Text value="플러그인 사용 설정" type="text" bold />
      </div>
      <div className={styles.checkListContents}>
        <div className={styles.checkListItem}>
          <SwitchButton
            label="댓글 기능"
            name="naviCheck"
            checked={props.checkList.naviCheck}
            onChange={() => {
              props.setCheckList({
                ...props.checkList,
                naviCheck: !props.checkList.naviCheck,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ComponentSelector;
