import React from "react";
import styles from "../Setting.module.css";
import SwitchButton from "components/SwitchButton";
import Text from "components/Text";
import { useDispatch } from "react-redux";
import { selectCheckList, selectComponentLayoutList, setCheckList, setComponentLayoutList } from "slices/settingSlice";
import { useAppSelector } from "app/hooks";
import { Layout } from "react-grid-layout";
import DefaultLayoutStyles from "./DefaultLayoutStyles";

const ComponentSelector = () => {
  const checkList = useAppSelector(selectCheckList);
  const layoutList = useAppSelector(selectComponentLayoutList);
  const orginLayouts = DefaultLayoutStyles();
  const dispatch = useDispatch();

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
              dispatch(setCheckList({ ...checkList, logo: !checkList.logo }));
              layoutList.map((it: Layout) => {
                if (it.i === "블로그 로고") {
                  dispatch(setComponentLayoutList({ ...layoutList }));
                }
              });
            }}
          />
        </div>
        <div className={styles.checkListItem}>
          <SwitchButton
            label="프로필"
            name="profile"
            checked={checkList.profile}
            onChange={() => {
              dispatch(setCheckList({ ...checkList, profile: !checkList.profile }));
            }}
          />
        </div>
        <div className={styles.checkListItem}>
          <SwitchButton
            label="카테고리"
            name="category"
            checked={checkList.category}
            onChange={() => {
              dispatch(setCheckList({ ...checkList, category: !checkList.category }));
            }}
          />
        </div>
        <div className={styles.checkListItem}>
          <SwitchButton
            label="페이지"
            name="page"
            checked={checkList.page}
            onChange={() => {
              dispatch(setCheckList({ ...checkList, page: !checkList.page }));
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
              props.setCheckList({
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
