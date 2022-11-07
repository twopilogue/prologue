import { useAppSelector } from "app/hooks";
import React from "react";
import { selectCheckList } from "slices/settingSlice";
import Logo from "./components/Logo";
import Profile from "./components/Profile";
import Title from "./components/Title";
import styles from "./Layout.module.css";

// 1. 위치 전부 세팅
// 2. checkList 필터 -> 생성할지 말지 정하기

// 3. grid 설정 어떻게 함? -> 기본 모양 만들고, 컴포넌트 얹기.
// 4. 순서 -> y값 순서대로, 변수에 저장한 컴포넌트를 list에 저장.
const LayoutBuildPage = () => {
  const checkList = useAppSelector(selectCheckList);
  const logo = <Logo />;
  const profile = <Profile />;
  const title = <Title />;
  return (
    <>
      {checkList.logo ? logo : <></>}
      {checkList.profile ? profile : <></>}
      {checkList.category ? <div className={styles.category}>Category</div> : <></>}
      {checkList.page ? <div className={styles.page}>Page</div> : <></>}
      <div className={styles.display_col}>
        {title}
        <div className={styles.contents}>Contents</div>
      </div>
    </>
  );
};

export default LayoutBuildPage;
