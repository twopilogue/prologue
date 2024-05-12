import { useState } from "react";
import styles from "styles/Setting.module.css";
import SwitchButton from "components/SwitchButton";
import Text from "components/Text";
import { Layout } from "react-grid-layout";
import { useSettingActions, useSettingStore } from "stores/settingStore";
import { useShallow } from "zustand/react/shallow";

const ComponentSelector = () => {
  const [unCheckedList, setUncheckedList] = useState<Layout[]>([]);
  const [userLayoutList, userCompList, userCompCheck] = useSettingStore(
    useShallow((state) => [state.userCompLayoutList, state.userCompList, state.userCompCheck]),
  );
  const { setUserCompLayoutListAction, setUserCompListAction, setUserCompCheckAction } = useSettingActions();

  // const isComponent = (ele: Layout, target: string) => {
  //   if (ele.i === target) return true;
  // };

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
            checked={userCompCheck.logo}
            onChange={() => {
              if (userCompCheck.logo) {
                userLayoutList.map((it) => {
                  if (it.i === "블로그 로고") unCheckedList.push(it);
                });
              } else if (!userCompCheck.logo) {
                unCheckedList.findIndex((it) => it.i === "블로그 로고") === 0
                  ? unCheckedList.map((it) => {
                      if (it.i === "블로그 로고") setUserCompLayoutListAction(userLayoutList.concat(it));
                    })
                  : (setUserCompLayoutListAction(userLayoutList.concat({ i: "블로그 로고", x: 0, y: 0, w: 1, h: 1 })),
                    setUserCompListAction(userCompList.concat({ key: "블로그 로고", id: "logo" }))),
                  setUncheckedList(unCheckedList.filter((it) => it.i !== "블로그 로고"));
              }
              setUserCompCheckAction({ ...userCompCheck, logo: !userCompCheck.logo });
            }}
          />
        </div>
        <div className={styles.checkListItem}>
          <SwitchButton
            label="프로필"
            name="profile"
            checked={userCompCheck.profile}
            onChange={() => {
              if (userCompCheck.profile) {
                userLayoutList.map((it) => {
                  if (it.i === "프로필") unCheckedList.push(it);
                });
              } else if (!userCompCheck.profile) {
                unCheckedList.findIndex((it) => it.i === "프로필") === 0
                  ? unCheckedList.map((it) => {
                      if (it.i === "프로필") setUserCompLayoutListAction(userLayoutList.concat(it));
                    })
                  : (setUserCompLayoutListAction(userLayoutList.concat({ i: "프로필", x: 0, y: 0, w: 1, h: 2 })),
                    setUserCompListAction(userCompList.concat({ key: "프로필", id: "profile" }))),
                  setUncheckedList(unCheckedList.filter((it) => it.i !== "프로필"));
              }
              setUserCompCheckAction({ ...userCompCheck, profile: !userCompCheck.profile });
            }}
          />
        </div>
        <div className={styles.checkListItem}>
          <SwitchButton
            label="카테고리"
            name="category"
            checked={userCompCheck.category}
            onChange={() => {
              if (userCompCheck.category) {
                userLayoutList.map((it) => {
                  if (it.i === "카테고리") unCheckedList.push(it);
                });
              } else if (!userCompCheck.category) {
                unCheckedList.findIndex((it) => it.i === "카테고리") === 0
                  ? unCheckedList.map((it) => {
                      if (it.i === "카테고리") setUserCompLayoutListAction(userLayoutList.concat(it));
                    })
                  : (setUserCompLayoutListAction(userLayoutList.concat({ i: "카테고리", x: 0, y: 0, w: 1, h: 4 })),
                    setUserCompListAction(userCompList.concat({ key: "카테고리", id: "category" }))),
                  setUncheckedList(unCheckedList.filter((it) => it.i !== "카테고리"));
              }
              setUserCompCheckAction({ ...userCompCheck, category: !userCompCheck.category });
            }}
          />
        </div>
        <div className={styles.checkListItem}>
          <SwitchButton
            label="페이지"
            name="page"
            checked={userCompCheck.page}
            onChange={() => {
              if (userCompCheck.page) {
                userLayoutList.map((it) => {
                  if (it.i === "페이지") unCheckedList.push(it);
                });
              } else if (!userCompCheck.page) {
                unCheckedList.findIndex((it) => it.i === "페이지") === 0
                  ? unCheckedList.map((it) => {
                      if (it.i === "페이지") setUserCompLayoutListAction(userLayoutList.concat(it));
                    })
                  : (setUserCompLayoutListAction(userLayoutList.concat({ i: "페이지", x: 1, y: 0, w: 4, h: 1 })),
                    setUserCompListAction(userCompList.concat({ key: "페이지", id: "page" }))),
                  setUncheckedList(unCheckedList.filter((it) => it.i !== "페이지"));
              }
              setUserCompCheckAction({ ...userCompCheck, page: !userCompCheck.page });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ComponentSelector;
