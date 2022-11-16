import React from "react";
import styles from "../Setting.module.css";
import SwitchButton from "components/SwitchButton";
import Text from "components/Text";
import { useDispatch } from "react-redux";
import { selectUserCheckList, selectUserComponentLayoutList, setUserCheckList } from "slices/settingSlice";
import { useAppSelector } from "app/hooks";
import { Layout } from "react-grid-layout";

const ComponentSelector = () => {
  const dispatch = useDispatch();
  const checkList = useAppSelector(selectUserCheckList);

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
            checked={checkList.logo}
            onChange={() => {
              dispatch(setUserCheckList({ ...checkList, logo: !checkList.logo }));
            }}
          />
        </div>
        <div className={styles.checkListItem}>
          <SwitchButton
            label="프로필"
            name="profile"
            checked={checkList.profile}
            onChange={() => {
              dispatch(setUserCheckList({ ...checkList, profile: !checkList.profile }));
            }}
          />
        </div>
        <div className={styles.checkListItem}>
          <SwitchButton
            label="카테고리"
            name="category"
            checked={checkList.category}
            onChange={() => {
              dispatch(setUserCheckList({ ...checkList, category: !checkList.category }));
            }}
          />
        </div>
        <div className={styles.checkListItem}>
          <SwitchButton
            label="페이지"
            name="page"
            checked={checkList.page}
            onChange={() => {
              dispatch(setUserCheckList({ ...checkList, page: !checkList.page }));
            }}
          />
        </div>
      </div>

      {/* <div className={styles.checkListTitle}>
        <Text value="플러그인 사용 설정" type="text" bold />
      </div>
      <div className={styles.checkListContents}>
        <div className={styles.checkListItem}>
          <SwitchButton
            label="댓글 기능"
            name="naviCheck"
            checked={props.checkList.naviCheck}
            onChange={() => {
              props.setUserCheckList({
                ...props.checkList,
                naviCheck: !props.checkList.naviCheck,
              });
            }}
          />
        </div>
      </div> */}
    </div>
  );
};

export default ComponentSelector;
