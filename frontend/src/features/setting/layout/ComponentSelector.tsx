import React, { useEffect, useState } from "react";
import styles from "../Setting.module.css";
import SwitchButton from "components/SwitchButton";
import Text from "components/Text";
import { useDispatch } from "react-redux";
import {
  selectUserCheckList,
  selectUserComponentLayoutList,
  selectUserComponentList,
  setUserCheckList,
  setUserComponentLayoutList,
  setUserComponentList,
} from "slices/settingSlice";
import { useAppSelector } from "app/hooks";
import { Layout } from "react-grid-layout";

const ComponentSelector = () => {
  const dispatch = useDispatch();
  const [unCheckedList, setUncheckedList] = useState<Layout[]>([]);
  const userComponentLayoutList = useAppSelector(selectUserComponentLayoutList);
  const userComponentList = useAppSelector(selectUserComponentList);
  const checkList = useAppSelector(selectUserCheckList);

  const isComponent = (ele: Layout, target: string) => {
    if (ele.i === target) return true;
  };

  // 미사용 체크 시:
  // 1) unCheckedList(Layout)에 넣어주기.

  // 사용 체크 시:
  // 1) 카테고리 찾아서 userComponentLayoutList에 넣어주기.
  // 2) unCheckedList에서 제거하기.
  // 3) userCheckList 갱신하기.

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
              if (checkList.logo) {
                userComponentLayoutList.map((it) => {
                  if (it.i === "블로그 로고") unCheckedList.push(it);
                });
              } else if (!checkList.logo) {
                unCheckedList.findIndex((it) => it.i === "블로그 로고") === 0
                  ? unCheckedList.map((it) => {
                      if (it.i === "블로그 로고")
                        dispatch(setUserComponentLayoutList(userComponentLayoutList.concat(it)));
                    })
                  : (dispatch(
                      setUserComponentLayoutList(
                        userComponentLayoutList.concat({ i: "블로그 로고", x: 0, y: 0, w: 1, h: 1 }),
                      ),
                    ),
                    dispatch(setUserComponentList(userComponentList.concat({ key: "블로그 로고", id: "logo" })))),
                  setUncheckedList(unCheckedList.filter((it) => it.i !== "블로그 로고"));
              }
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
              if (checkList.profile) {
                userComponentLayoutList.map((it) => {
                  if (it.i === "프로필") unCheckedList.push(it);
                });
              } else if (!checkList.profile) {
                unCheckedList.findIndex((it) => it.i === "프로필") === 0
                  ? unCheckedList.map((it) => {
                      if (it.i === "프로필") dispatch(setUserComponentLayoutList(userComponentLayoutList.concat(it)));
                    })
                  : (dispatch(
                      setUserComponentLayoutList(
                        userComponentLayoutList.concat({ i: "프로필", x: 0, y: 0, w: 1, h: 2 }),
                      ),
                    ),
                    dispatch(setUserComponentList(userComponentList.concat({ key: "프로필", id: "profile" })))),
                  setUncheckedList(unCheckedList.filter((it) => it.i !== "프로필"));
              }
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
              if (checkList.category) {
                userComponentLayoutList.map((it) => {
                  if (it.i === "카테고리") unCheckedList.push(it);
                });
              } else if (!checkList.category) {
                unCheckedList.findIndex((it) => it.i === "카테고리") === 0
                  ? unCheckedList.map((it) => {
                      if (it.i === "카테고리") dispatch(setUserComponentLayoutList(userComponentLayoutList.concat(it)));
                    })
                  : (dispatch(
                      setUserComponentLayoutList(
                        userComponentLayoutList.concat({ i: "카테고리", x: 0, y: 0, w: 1, h: 4 }),
                      ),
                    ),
                    dispatch(setUserComponentList(userComponentList.concat({ key: "카테고리", id: "category" })))),
                  setUncheckedList(unCheckedList.filter((it) => it.i !== "카테고리"));
              }
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
              if (checkList.page) {
                userComponentLayoutList.map((it) => {
                  if (it.i === "페이지") unCheckedList.push(it);
                });
              } else if (!checkList.page) {
                unCheckedList.findIndex((it) => it.i === "페이지") === 0
                  ? unCheckedList.map((it) => {
                      if (it.i === "페이지") dispatch(setUserComponentLayoutList(userComponentLayoutList.concat(it)));
                    })
                  : (dispatch(
                      setUserComponentLayoutList(
                        userComponentLayoutList.concat({ i: "페이지", x: 1, y: 0, w: 4, h: 1 }),
                      ),
                    ),
                    dispatch(setUserComponentList(userComponentList.concat({ key: "페이지", id: "page" })))),
                  setUncheckedList(unCheckedList.filter((it) => it.i !== "페이지"));
              }
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
