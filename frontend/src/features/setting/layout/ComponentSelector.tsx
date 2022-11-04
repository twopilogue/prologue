import React, { useState } from "react";
import { ComponentCheckConfig } from "slices/settingSlice";
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
            name="logoCheck"
            checked={props.checkList.logoCheck}
            onChange={() => {
              props.setCheckList({
                ...props.checkList,
                logoCheck: !props.checkList.logoCheck,
              });
            }}
          />
        </div>
        <div className={styles.checkListItem}>
          <SwitchButton
            label="프로필"
            name="profileCheck"
            checked={props.checkList.profileCheck}
            onChange={() => {
              props.setCheckList({
                ...props.checkList,
                profileCheck: !props.checkList.profileCheck,
              });
            }}
          />
        </div>
        <div className={styles.checkListItem}>
          <SwitchButton
            label="카테고리"
            name="categoryCheck"
            checked={props.checkList.categoryCheck}
            onChange={() => {
              props.setCheckList({
                ...props.checkList,
                categoryCheck: !props.checkList.categoryCheck,
              });
            }}
          />
        </div>
        <div className={styles.checkListItem}>
          <SwitchButton
            label="페이지"
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
