import React, { useState } from "react";
import styles from "../Setting.module.css";
import SwitchButton from "components/SwitchButton";
import Text from "components/Text";
import { useDispatch } from "react-redux";
import {
  selectUserCheckList,
  selectUserComponentLayoutList,
  setUserCheckList,
  setUserComponentLayoutList,
} from "slices/settingSlice";
import { useAppSelector } from "app/hooks";
import { Layout } from "react-grid-layout";

const ComponentSelector = () => {
  const dispatch = useDispatch();
  const [unCheckedList, setUncheckedList] = useState<Layout[]>([]);
  const userComponentLayoutList = useAppSelector(selectUserComponentLayoutList);
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
              if (checkList.logo) {
                userComponentLayoutList.map((it) => {
                  return it.i === "블로그 로고" ? unCheckedList.push(it) : null;
                });
              } else if (!checkList.logo) {
                const logo = unCheckedList.filter((it) => {
                  return it.i === "블로그 로고" ? true : false;
                });
                const tmpLayoutList: Layout[] = [];
                tmpLayoutList.push(...userComponentLayoutList, logo[0]);
                dispatch(setUserComponentLayoutList(tmpLayoutList));
                setUncheckedList(unCheckedList.filter((it) => it.i !== "블로그 로고"));
                console.log(unCheckedList);
              }
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
              if (checkList.profile) {
                userComponentLayoutList.map((it) => {
                  return it.i === "프로필" ? unCheckedList.push(it) : null;
                });
              } else if (!checkList.profile) {
                const profile = unCheckedList.filter((it) => {
                  return it.i === "프로필" ? true : false;
                });
                const tmpLayoutList: Layout[] = [];
                tmpLayoutList.push(...userComponentLayoutList, profile[0]);
                dispatch(setUserComponentLayoutList(tmpLayoutList));
                setUncheckedList(unCheckedList.filter((it) => it.i !== "프로필"));
                console.log(unCheckedList);
              }
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
              if (checkList.category) {
                userComponentLayoutList.map((it) => {
                  return it.i === "카테고리" ? unCheckedList.push(it) : null;
                });
              } else if (!checkList.category) {
                const category = unCheckedList.filter((it) => {
                  return it.i === "카테고리" ? true : false;
                });
                const tmpLayoutList: Layout[] = [];
                tmpLayoutList.push(...userComponentLayoutList, category[0]);
                dispatch(setUserComponentLayoutList(tmpLayoutList));
                setUncheckedList(unCheckedList.filter((it) => it.i !== "카테고리"));
                console.log(unCheckedList);
              }
            }}
          />
        </div>
        <div className={styles.checkListItem}>
          <SwitchButton
            label="페이지"
            name="page"
            checked={checkList.page}
            disabled
            onChange={() => {
              dispatch(setUserCheckList({ ...checkList, page: !checkList.page }));
              if (checkList.page) {
                userComponentLayoutList.map((it) => {
                  return it.i === "페이지" ? unCheckedList.push(it) : null;
                });
              } else if (!checkList.page) {
                const page = unCheckedList.filter((it) => {
                  return it.i === "페이지" ? true : false;
                });
                const tmpLayoutList: Layout[] = [];
                tmpLayoutList.push(...userComponentLayoutList, page[0]);
                dispatch(setUserComponentLayoutList(tmpLayoutList));
                setUncheckedList(unCheckedList.filter((it) => it.i !== "페이지"));
                console.log(unCheckedList);
              }
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
